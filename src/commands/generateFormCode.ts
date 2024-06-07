import * as vscode from 'vscode'
// import { genFormCodeByBlock } from '../generatorCode/genByBlock'
import { formatPath } from '../utils/platform'
import { showWebView } from '../webview/index'

export const registerGenerateFormCodeCommand = (context: vscode.ExtensionContext) => {
  context.subscriptions.push(
    vscode.commands.registerCommand('lowlow-vs.generateFormCode', args => {
      const path = formatPath(args?.path)
      console.log(path, 'myformpath')
      console.log('lowlow-vs.registerGenerateFormCodeCommand')
      showWebView(context, {
        key: 'main',
        viewColumn: vscode.ViewColumn.Two,
        task: {
          task: 'route',
          data: { path: '/autoFormConfig', selectedFolder: path ?? undefined },
        },
      })

      // genFormCodeByBlock()
    })
  )
}
