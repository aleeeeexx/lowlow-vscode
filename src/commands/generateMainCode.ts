import * as vscode from 'vscode'
import { formatPath } from '../utils/platform'
import { getConfig } from '../utils/config'
import { genCodeByBlockWithDefaultModel } from '../generatorCode/genMainCodeByConfig'

export const registerGenerateMainCodeCommand = (context: vscode.ExtensionContext) => {
  context.subscriptions.push(
    vscode.commands.registerCommand('lowlow-vs.autoGenMainCode', async args => {
      const path = formatPath(args.path)
      //获取.lowlowrc中配置的默认要生成的主代码
      const mainCodeTypes = getConfig().commonlyUsedBlock || []
      if (mainCodeTypes.length < 1) {
        vscode.window.showWarningMessage('未在.lowlowrc中配置要生成的代码类型', {
          modal: true,
        })
        return
      }
      let mainCodeType: undefined | string = ''
      if (mainCodeTypes.length === 1) {
        mainCodeType = mainCodeTypes[0]
      } else {
        mainCodeType = await vscode.window.showQuickPick(mainCodeTypes, {
          placeHolder: '请选择代码类型',
        })
        if (!mainCodeType) {
          return
        }
      }
      try {
        await genCodeByBlockWithDefaultModel(path, mainCodeType)
      } catch (ex: any) {
        vscode.window.showErrorMessage(ex.toString())
      }
    })
  )
}
