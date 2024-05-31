import * as vscode from 'vscode'
import { registerGenerateApiCodeCommand } from './commands/generateApiCode'
import { registerGenerateFormCodeCommand } from './commands/generateFormCode'
import { registerGenerateMainCodeCommand } from './commands/generateMainCode'
import { init, setLastActiveTextEditorId } from './context'
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

  init({ extensionContext: context, extensionPath: context.extensionPath })

  // 注册生成api代码的命令
  registerGenerateApiCodeCommand(context)
  //注册自动生成框架代码(vue/react/...)的命令
  registerGenerateMainCodeCommand(context)
  // 注册生成form代码的命令
  registerGenerateFormCodeCommand(context)
}

export function deactivate() {}
