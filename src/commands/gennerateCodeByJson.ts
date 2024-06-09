import * as vscode from 'vscode'
import { getClipboardText } from '../utils/editor'
import { genCodeByJson } from '../generatorCode/genCodeByJson'
import { jsonIsValid, jsonParse } from '../utils/json'

export const registerGenerateSnippetCodeByJsonCommand = (context: vscode.ExtensionContext) => {
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand('lowlow-vs.generateSnippetCodeByJson', () => {
      const rawClipboardText = getClipboardText()
      let clipboardText = rawClipboardText.trim()
      clipboardText = JSON.stringify(jsonParse(clipboardText))
      const validJson = jsonIsValid(clipboardText)
      if (validJson) {
        genCodeByJson(clipboardText, rawClipboardText)
      } else {
        vscode.window.showErrorMessage('请复制JSON字符串')
      }
    })
  )
}
