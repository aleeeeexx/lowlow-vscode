import * as copyPaste from 'copy-paste'
import { window, SnippetString } from 'vscode'
import { getLastAcitveTextEditor } from '../context'

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

export const pasteToEditor = (content: string, isInsertSnippet = true) => {
  // vscode 本身代码片段语法
  if (isInsertSnippet) {
    return insertSnippet(content)
  }
}

export const insertSnippet = (content: string) => {
  console.log(window.activeTextEditor, 'window.activeTextEditor')
  const activeTextEditor = window.activeTextEditor || getLastAcitveTextEditor()
  if (activeTextEditor === undefined) {
    throw new Error('无打开文件')
  }
  return activeTextEditor.insertSnippet(new SnippetString(content))
}

// export const selectDirectory = async () => {
//   const options: OpenDialogOptions = {
//     canSelectFolders: true,
//     canSelectFiles: false,
//     canSelectMany: false,
//     openLabel: 'Open',
//   }
//   const selectFolderUri = await window.showOpenDialog(options)
//   if (selectFolderUri && selectFolderUri.length > 0) {
//     return selectFolderUri[0].fsPath
//   }
// }
