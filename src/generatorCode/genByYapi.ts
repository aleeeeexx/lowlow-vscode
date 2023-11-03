import { window, workspace } from 'vscode'
import { getConfig, Config } from '../utils/config'
import { getLocalApiTemplate } from '../utils/materia'
import { getFuncNameAndTypeName, pasteToEditor } from '../utils/editor'
import { fetchApiDetailInfo } from '../utils/request'
const stripJsonComments = require('strip-json-comments')
import { compile } from 'json-schema-to-typescript'
import { compile as compileEjs, Model } from '../utils/ejs'
const GenerateSchema = require('generate-schema')
const strip = require('strip-comments')

export const genCodeByYapiId = async (yapiId: string, rawClipboardText: string) => {
  // 获取项目的配置
  const config = getConfig()
  const domain = config.yapi?.domain || ''
  if (!domain.trim()) {
    window.showErrorMessage('请配置yapi域名')
    return
  }

  const projectList = config.yapi?.projects || []
  if (projectList.length === 0) {
    window.showErrorMessage('请配置项目')
    return
  }

  // 获取生成代码的模板
  const template = getLocalApiTemplate()
  if (!template) {
    window.showErrorMessage('请配置模板')
    return
  }

  // 获取在文件中选中的函数名信息
  const selectInfo = getFuncNameAndTypeName()

  // 弹窗选择项目配置
  const projectSelectedName = await window.showQuickPick(
    projectList.map(s => s.name),
    { placeHolder: '请选择项目' }
  )
  if (!projectSelectedName) {
    return
  }
  const projectConfig = projectList.find(s => s.name === projectSelectedName)

  // 根据yapiId, 项目配置, 函数名信息, 生成代码模板, 获取yapi数据
  try {
    const model = await genTemplateModelByYapi(
      projectConfig?.domain || domain,
      projectConfig!.token,
      yapiId,
      selectInfo.typeName,
      selectInfo.funcName
    )
    model.inputValues = selectInfo.inputValues
    model.rawSelectedText = selectInfo.rawSelectedText
    model.rawClipboardText = rawClipboardText
    const code = compileEjs(template, model)
    console.log(code, 'code')
    pasteToEditor(code)
  } catch (error) {}
}

const genTemplateModelByYapi = async (
  domain: string,
  token: string,
  yapiId: string,
  typeName: string = 'IYapiRequestResult',
  funcName: string = 'fetch'
) => {
  console.log(domain, yapiId, token, typeName, funcName, 'genTemplateModelByYapi')
  const res = await fetchApiDetailInfo(domain, yapiId, token)
  console.log(res, 'res')
  const requestBodyTypeName = funcName.slice(0, 1).toUpperCase() + funcName.slice(1)

  if (res.data.data.res_body_type === 'json') {
    // 借助工具去除注释
    const schema = JSON.parse(stripJsonComments(res.data.data.res_body))
    fixSchema(schema)
    delete schema.title

    // 生成响应ts代码
    let ts = await compile(schema, typeName, {
      bannerComment: '',
    })
    ts = ts.replace(/(\[k: string\]: unknown;)|\?/g, '')
    let requestBodyType = ''
    if (res.data.data.req_body_other) {
      const reqBodyScheme = JSON.parse(stripJsonComments(res.data.data.req_body_other))
      delete reqBodyScheme.title
      requestBodyType = await compile(reqBodyScheme, `I${requestBodyTypeName}Data`, {
        bannerComment: '',
      })
    }
    const model: Model = {
      type: ts,
      requestBodyType: requestBodyType.replace(/\[k: string\]: unknown;/g, ''),
      funcName,
      typeName,
      api: res.data.data,
      inputValues: [],
      mockCode: '',
      mockData: '',
      jsonData: {},
      rawSelectedText: '',
      rawClipboardText: '',
    }
    return model
  }

  // 如果res.data.data.res_body_type不是json, 则再处理一下res.data.data.res_body
  const resBodyJson = JSON.parse(stripJsonComments(res.data.data.res_body))
  const schema = GenerateSchema.json(typeName || 'Schema', resBodyJson)
  let ts = await compile(schema, typeName, {
    bannerComment: '',
  })
  ts = strip(ts.replace(/(\[k: string\]: unknown;)|\?/g, ''))
  let requestBodyType = ''
  if (res.data.data.req_body_other) {
    const reqBodyScheme = JSON.parse(stripJsonComments(res.data.data.req_body_other))
    delete reqBodyScheme.title
    requestBodyType = await compile(reqBodyScheme, `I${requestBodyTypeName}Data`, {
      bannerComment: '',
    })
  }
  const model: Model = {
    type: ts,
    requestBodyType: requestBodyType.replace(/\[k: string\]: unknown;/g, ''),
    funcName,
    typeName,
    api: res.data.data,
    inputValues: [],
    mockCode: '',
    mockData: '',
    jsonData: resBodyJson,
    rawClipboardText: '',
    rawSelectedText: '',
  }
  return model
}

const fixSchema = (obj: object) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj) {
    // @ts-ignore
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      // @ts-ignore
      if (obj[key].type === 'object' && !obj[key].properties) {
        // @ts-ignore
        delete obj[key]
      }
      // @ts-ignore
      fixSchema(obj[key]) // 递归处理
    }
  }
}
