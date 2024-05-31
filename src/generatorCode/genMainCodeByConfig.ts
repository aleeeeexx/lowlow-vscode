import { materialsPath } from './../utils/vscodeEnv'
import * as path from 'path'
import * as vscode from 'vscode'
import * as fs from 'fs-extra'
import {
  blockMaterialsPath,
  tempWorkPath as defaultTempWorkPath,
  getPrivateBlockMaterialsPath,
  getEnv,
  rootPath,
} from '../utils/vscodeEnv'
import { getInnerLibs } from '../utils/lib'
import { getOutputChannel } from '../utils/outputChannel'
import { getFileContent } from '../utils/file'
import { getSyncFolder } from '../utils/config'
import { renderEjsTemplates } from '../utils/ejs'

export const genCodeByBlockWithDefaultModel = async (genPath: string, blockName: string) => {
  if (!fs.existsSync(path.join(blockMaterialsPath, blockName))) {
    throw new Error('区块不存在')
  }
  let model = {} as any
  try {
    model = JSON.parse(
      getFileContent(path.join(blockMaterialsPath, blockName, 'config', 'model.json'), true)
    )
    console.log(model, 'modeeeeeeeeeeeeeeeeeeeee')
  } catch {}
  await genCodeByBlock({
    material: blockName,
    model,
    path: genPath,
    createPath: [],
  })
}

export const genCodeByBlock = async (data: {
  material: string
  model: object
  path: string
  createPath: string[]
  privateMaterials?: boolean
}) => {
  let tempWorkPath = defaultTempWorkPath
  if (data.privateMaterials) {
    tempWorkPath = path.join(getSyncFolder(), '.lowcode')
  }
  try {
    const block = path.join(
      data.privateMaterials ? getPrivateBlockMaterialsPath() : blockMaterialsPath,
      data.material
    )

    const schemaFile = path.join(block, 'config/schema.json')
    const schama = fs.readJSONSync(schemaFile)
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

    const context = {
      model: data.model,
      vscode,
      workspaceRootPath: rootPath,
      env: getEnv(),
      libs: getInnerLibs(),
      outputChannel: getOutputChannel(),
      log: getOutputChannel(),
      createBlockPath: path.join(data.path, ...data.createPath).replace(/\\/g, '/'),
      materialPath: block,
    }
    data.model = {
      ...data.model,
      createBlockPath: path.join(data.path, ...data.createPath).replace(/\\/g, '/'),
    }

    await renderEjsTemplates(data.model, path.join(tempWorkPath, 'src'), excludeCompile)
    fs.copySync(path.join(tempWorkPath, 'src'), path.join(data.path, ...data.createPath))
    fs.removeSync(tempWorkPath)
  } catch (ex: any) {
    fs.remove(tempWorkPath)
    throw ex
  }
}
