import * as ejs from 'ejs'
// import * as fse from 'fs-extra'
// import * as path from 'path'
// import * as glob from 'glob'
// import * as prettier from 'prettier'

export type YapiInfo = {
  query_path: { path: string }
  method: string
  title: string
  project_id: number
  req_params: {
    name: string
    desc: string
  }[]
  _id: number
  req_query: { required: '0' | '1'; name: string }[]
  res_body_type: 'raw' | 'json'
  res_body: string
  username: string
}

export type Model = {
  type: string
  requestBodyType?: string
  funcName: string
  typeName: string
  inputValues: string[]
  api?: YapiInfo
  mockCode: string
  mockData: string
  jsonData: any
  jsonKeys?: string[]
  rawSelectedText: string // 编辑器中选中的原始文本
  rawClipboardText: string // 系统剪切板中的原始文本
  activeTextEditorFilePath?: string // 当前打开文件地址
  createBlockPath?: string // 创建区块的目录
}

export const compile = (templateString: string, model: Model) => ejs.render(templateString, model)
