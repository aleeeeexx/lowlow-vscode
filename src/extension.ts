import * as vscode from 'vscode'
import { generateCode } from './commands/generateApiCode'
import { setLastActiveTextEditorId } from './context'
export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "lowlow-vscode" is now active!')
  vscode.window.onDidChangeActiveTextEditor(
    editor => {
      if (editor) {
        const { id } = editor as any
        setLastActiveTextEditorId(id)
      }
    },
    null,
    context.subscriptions
  )
  generateCode(context)
}

export function deactivate() {}
