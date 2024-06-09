import * as vscode from 'vscode'
import { formatPath } from '../utils/platform'
import { generateCodeByFigma } from '../generatorCode/genCodeByfigma'

export const registerGenerateFigmaToCode = (context: vscode.ExtensionContext) => {
  context.subscriptions.push(
    vscode.commands.registerCommand('lowlow-vs.figmaToCode', args => {
      const path = formatPath(args?.path)
      generateCodeByFigma(path)
    })
  )
}
