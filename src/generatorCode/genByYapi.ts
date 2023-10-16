import { window, workspace } from 'vscode'
import { getConfig, Config } from '../utils/config'
import { getLocalApiTemplate } from '../utils/materia'
export const genCodeByYapiId = (yapiId: string, rawClipboardText: string) => {
  // 获取项目的配置
  const config = getConfig()
  checkConfig(config)

  // 获取生成代码的模板
  getLocalApiTemplate()
}

const checkConfig = (config: Config) => {
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
}
