import { openServer } from '../utils/openServer'
import { genCodeByFigma } from '../utils/generate'
import type { FigmaDataType } from '../utils/openServer'
import * as vscode from 'vscode'

export const generateCodeByFigma = (path: string, port: number = 2023) => {
  openServer(port, (reqFigmaData: FigmaDataType) => {
    if (!reqFigmaData) return
    if (reqFigmaData.renderPath) path = reqFigmaData.renderPath // 如果figma数据中有renderPath，就用这个路径，否则就用在vscode中右键打开服务器时的路径
    genCodeByFigma(reqFigmaData, path) // 根据figma数据和当前鼠标右键的路径生成代码文件
    vscode.window.showInformationMessage('接收figma数据服务已关闭！')
  })
  vscode.window.showInformationMessage(
    '接收figma数据服务已开启：http://localhost:2023/submitFigmaData'
  )
}
