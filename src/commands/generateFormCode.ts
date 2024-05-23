import * as vscode from 'vscode'
import { genFormCodeByBlock } from '../generatorCode/genByBlock'
export const registerGenerateFormCodeCommand = (context: vscode.ExtensionContext) => {
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand('lowlow-vs.generateFormCode', () => {
      console.log('lowlow-vs.registerGenerateFormCodeCommand')
      genFormCodeByBlock()
    })
  )
}
