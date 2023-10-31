import { ExtensionContext, window } from 'vscode'

const data: {
  extensionContext?: ExtensionContext
  rootPath: string
  extensionPath: string
  activeTextEditorId: string
} = {
  extensionContext: undefined, // 插件 context
  rootPath: '', // 工作空间根目录
  extensionPath: '', // 插件安装目录
  activeTextEditorId: '', // 激活的 tab id
}

export const setLastActiveTextEditorId = (activeTextEditorId: string) => {
  data.activeTextEditorId = activeTextEditorId
}

export const getLastAcitveTextEditor = () => {
  const { visibleTextEditors } = window
  const activeTextEditor = visibleTextEditors.find(
    (item: any) => item.id === data.activeTextEditorId
  )
  return window.activeTextEditor || activeTextEditor
}
