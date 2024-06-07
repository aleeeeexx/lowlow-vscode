import * as vscode from 'vscode'
import { formatPath } from '../utils/platform'
import { showWebView } from '../webview/index'

export const registerGenerateTableCodeCommand = (context: vscode.ExtensionContext) => {
  context.subscriptions.push(
    vscode.commands.registerCommand('lowlow-vs.generateTableCode', args => {
      const path = formatPath(args?.path)
      console.log('lowlow-vs.generateTableCode')
      showWebView(context, {
        key: 'main',
        viewColumn: vscode.ViewColumn.Two,
        task: {
          task: 'route',
          data: { path: '/autoTableConfig', selectedFolder: path ?? undefined },
        },
      })
    })
  )
}
