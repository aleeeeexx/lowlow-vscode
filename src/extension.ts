import * as vscode from 'vscode'
import { generateCode } from './commands/generateApiCode'

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "lowlow-vs" is now active!')
  generateCode(context)
}

export function deactivate() {}
