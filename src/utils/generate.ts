/* eslint-disable no-eval */
import * as path from 'path'
import * as vscode from 'vscode'
import * as fs from 'fs-extra'
import {
  getEnv,
  blockMaterialsPath,
  getPrivateBlockMaterialsPath,
  // getPrivateSnippetMaterialsPath,
  rootPath,
  // snippetMaterialsPath,
  tempWorkPath as defaultTempWorkPath,
} from './vscodeEnv'
import { renderEjsTemplates, compile } from './ejs'
import { getInnerLibs } from './lib'
import { getOutputChannel } from './outputChannel'
// import { getLastAcitveTextEditor } from '../context'
import { getSyncFolder } from './config'
// import { createChatCompletionForScript } from './openai'

export const genCodeByBlock = async (data: {
  material: string
  model: object
  path: string
  createPath: string[]
  privateMaterials?: boolean
}) => {
  // 默认是.lowcode路径
  let tempWorkPath = defaultTempWorkPath
  // 如果有私有物料，就是同步目录下的.lowcode
  if (data.privateMaterials) {
    tempWorkPath = path.join(getSyncFolder(), '.lowcode')
  }
  console.log('tempWorkPath', tempWorkPath)

  try {
    //获取物料
    const block = path.join(
      data.privateMaterials ? getPrivateBlockMaterialsPath() : blockMaterialsPath,
      data.material
    )
    console.log('block', block)

    const schemaFile = path.join(block, 'config/schema.json')
    const schama = fs.readJSONSync(schemaFile)
    console.log('bloschemaFileck', schama, schemaFile)

    fs.copySync(block, tempWorkPath)
    let excludeCompile: string[] = []
    if (schama.excludeCompile) {
      excludeCompile = schama.excludeCompile
    }
    if (schama.conditionFiles) {
      Object.keys(data.model).map(key => {
        if (
          schama.conditionFiles[key] &&
          schama.conditionFiles[key].value === (data.model as any)[key] &&
          Array.isArray(schama.conditionFiles[key].exclude)
        ) {
          schama.conditionFiles[key].exclude.map((exclude: string) => {
            fs.removeSync(path.join(tempWorkPath, 'src', exclude))
            fs.removeSync(path.join(tempWorkPath, exclude))
          })
        }
      })
    }
    const scriptFile = path.join(block, 'script/index.js') // 不能使用临时目录里的文件，会导致 ts-node 报错
    const hook = {
      beforeCompile: (context: any) => <object | undefined>Promise.resolve(undefined),
      afterCompile: (context: any) => <object | undefined>Promise.resolve(undefined),
      complete: (context: any) => <object | undefined>Promise.resolve(undefined),
    }
    if (fs.existsSync(scriptFile)) {
      delete eval('require').cache[eval('require').resolve(scriptFile)]
      const script = eval('require')(scriptFile)
      if (script.beforeCompile) {
        hook.beforeCompile = script.beforeCompile
      }
      if (script.afterCompile) {
        hook.afterCompile = script.afterCompile
      }
      if (script.complete) {
        hook.complete = script.complete
      }
    }
    const context = {
      model: data.model,
      vscode,
      workspaceRootPath: rootPath,
      env: getEnv(),
      libs: getInnerLibs(),
      outputChannel: getOutputChannel(),
      log: getOutputChannel(),
      createBlockPath: path.join(data.path, ...data.createPath).replace(/\\/g, '/'),
      // createChatCompletion: createChatCompletionForScript,
      materialPath: block,
    }
    console.log('context', context)

    data.model = {
      ...data.model,
      createBlockPath: path.join(data.path, ...data.createPath).replace(/\\/g, '/'),
    }
    const extendModel = await hook.beforeCompile(context)
    if (extendModel) {
      data.model = {
        ...data.model,
        ...extendModel,
      }
    }
    const res = await renderEjsTemplates(data.model, path.join(tempWorkPath, 'src'), excludeCompile)
    console.log('res', res)

    await hook.afterCompile(context)
    fs.copySync(path.join(tempWorkPath, 'src'), path.join(data.path, ...data.createPath))
    await hook.complete(context)
    fs.removeSync(tempWorkPath)
    console.log('end-chengcheng')
  } catch (ex: any) {
    fs.remove(tempWorkPath)
    throw ex
  }
}
