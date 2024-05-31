import * as vscode from 'vscode'
// import { genFormCodeByBlock } from '../generatorCode/genByBlock'
import { showWebView } from '../webview/index'

export const registerGenerateFormCodeCommand = (context: vscode.ExtensionContext) => {
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand('lowlow-vs.generateFormCode', () => {
      console.log('lowlow-vs.registerGenerateFormCodeCommand')
      showWebView(context, {
        key: 'main',
        viewColumn: vscode.ViewColumn.Two,
        task: {
          task: 'route',
          data: {
            path: '/genFormData',
          },
        },
      })

      // genFormCodeByBlock()
    })
  )
}
