import { window, workspace } from 'vscode'
import { getConfig, Config } from '../utils/config'
import { getLocalApiTemplate } from '../utils/materia'
import { getFuncNameAndTypeName } from '../utils/editor'
import { fetchApiDetailInfo } from '../utils/request'

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
}
