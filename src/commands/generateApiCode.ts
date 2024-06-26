import * as vscode from 'vscode'
import { getClipboardText } from '../utils/editor'
import { isYapiId } from '../utils/json'
import { genCodeByYapiId } from '../generatorCode/genByYapi'
export const registerGenerateApiCodeCommand = (context: vscode.ExtensionContext) => {
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand('lowlow-vs.generateApiCode', () => {
      const rawClipboardText = getClipboardText()
      const clipboardText = rawClipboardText.trim()
      const validYapiId = isYapiId(clipboardText)
      if (validYapiId) {
        genCodeByYapiId(clipboardText, rawClipboardText)
      } else {
        vscode.window.showErrorMessage(
          '请复制Yapi接口ID方可生成，一般是yapi地址的最后数字，如:https://yapi.com/xxx/304433,则复制304433'
        )
      }
    })
  )
}
