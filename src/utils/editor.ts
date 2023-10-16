import * as copyPaste from 'copy-paste'
import { window } from 'vscode'

export const getClipboardText = () => copyPaste.paste()

export const getSelectedText = () => {
  const { selection, document } = window.activeTextEditor!
  return document.getText(selection).trim()
}

export const getFuncNameAndTypeName = () => {
  const selectedText = getSelectedText() || ''
  let funcName = 'fetch'
  let typeName = 'IFetchResult'
  if (selectedText) {
    const splitValue = selectedText.split(' ')
    console.log(splitValue, 'splitValue')
    funcName = splitValue[0] || funcName
    if (splitValue.length > 1 && splitValue[1]) {
      typeName = splitValue[1]
    } else {
      typeName = `I${funcName.charAt(0).toUpperCase() + funcName.slice(1)}Result`
    }
  }
  return {
    funcName,
    typeName,
    inputValues: selectedText.split(' '),
    rawSelectedText: selectedText,
  }
}
