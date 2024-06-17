import { commands, ExtensionContext } from 'vscode'

export const registerCreateSetting = (context: ExtensionContext) => {
  context.subscriptions.push(
    commands.registerCommand('lowlow-vs.openSetting', () => {
      // 打开插件设置
      commands.executeCommand('workbench.action.openSettings', 'lowlow-vs')
    })
  )
}
