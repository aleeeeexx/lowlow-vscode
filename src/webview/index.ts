import * as path from 'path'
import * as vscode from 'vscode'
import { window } from 'vscode'
import { getExtensionPath, setLastActiveTextEditorId } from '../context'
import { routes } from './routes'
import { invokeCallback, invokeErrorCallback } from './callback'

type WebViewKeys = 'main' | 'createApp' | 'downloadMaterials' | 'getClipboardImage'

type Tasks = 'addSnippets' | 'openSnippet' | 'route' | 'updateSelectedFolder' | 'getClipboardImage'

let webviewPanels: {
  key: WebViewKeys
  panel: vscode.WebviewPanel
  disposables: vscode.Disposable[]
}[] = []

export const showWebView = (
  context: vscode.ExtensionContext,
  options: {
    key: WebViewKeys //webview的标识
    title?: string //webview的title
    viewColumn?: vscode.ViewColumn // 视图数量
    task?: { task: Tasks; data?: any } // webview 打开后执行命令，比如转到指定路由
  }
) => {
  // 先判断，webview是否存在了，存在了则不新增，传递消息给webview处理后续
  const webview = webviewPanels.find(s => s.key === options.key)
  if (webview) {
    webview.panel.reveal() //显示

    if (options.task) {
      //有任务则执行任务
      webview.panel.webview.postMessage({
        cmd: 'vscodePushTask',
        task: options.task.task,
        data: options.task.data,
      })
    }
  } else {
    // 创建 webview 的时候，设置之前 focus 的 activeTextEditor
    if (vscode.window.activeTextEditor) {
      setLastActiveTextEditorId((vscode.window.activeTextEditor as any).id)
    }
    const panel = vscode.window.createWebviewPanel(
      'lowlow',
      options.title || 'lowlow可视化配置',
      {
        viewColumn: options.viewColumn || vscode.ViewColumn.Two,
        preserveFocus: options.key === 'getClipboardImage' ? undefined : true,
      },
      {
        enableScripts: true,
        localResourceRoots: [vscode.Uri.file(path.join(getExtensionPath(), 'webview-dist'))],
        retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
      }
    )
    panel.iconPath = vscode.Uri.file(path.join(getExtensionPath(), 'asset', 'icon.png')) //设置icon
    panel.webview.html = getVueHtmlForWebview(context, panel.webview) //获取webview html内容并赋值
    console.log(panel.webview.html, 'panel.webview.html')
    const disposables: vscode.Disposable[] = []

    //   注册webview事件

    // 在vscode中监听webview传递过来的消息，在webview中会通过 vscode.postMessage{command: 'someCommand',data: { /* 你的数据 */ },} 发送信息
    panel.webview.onDidReceiveMessage(
      async (message: { cmd: string; cbid: string; data: any; skipError?: boolean }) => {
        console.log(message, 'message')
        if (routes[message.cmd]) {
          try {
            const res = await routes[message.cmd](message, {
              webview: panel.webview,
              webviewKey: options.key,
              task: options.task,
            })
            invokeCallback(panel.webview, message.cbid, res)
          } catch (ex: any) {
            if (!message.skipError) {
              window.showErrorMessage(ex.toString())
            }
            invokeErrorCallback(panel.webview, message.cbid, ex)
          }
        } else {
          invokeErrorCallback(panel.webview, message.cbid, `未找到名为 ${message.cmd} 回调方法!`)
          vscode.window.showWarningMessage(`未找到名为 ${message.cmd} 回调方法!`)
        }
      },
      null,
      disposables
    )
    panel.onDidDispose(
      () => {
        panel.dispose()
        while (disposables.length) {
          const x = disposables.pop()
          if (x) {
            x.dispose()
          }
        }
        webviewPanels = webviewPanels.filter(s => s.key !== options.key)
      },
      null,
      disposables
    )

    webviewPanels.push({
      key: options.key,
      panel,
      disposables,
    })

    if (options.task) {
      panel.webview.postMessage({
        cmd: 'vscodePushTask',
        task: options.task.task,
        data: options.task.data,
      })
    }
  }
}

// 获取web-view的vue项目
const getVueHtmlForWebview = (context: vscode.ExtensionContext, webview: vscode.Webview) => {
  const isProduction = context.extensionMode === vscode.ExtensionMode.Production
  let srcUrl: string | vscode.Uri = ''

  if (isProduction) {
    const mainScriptPathOnDisk = vscode.Uri.file(
      path.join(context.extensionPath, 'webview-dist', 'main.mjs')
    )
    srcUrl = webview.asWebviewUri(mainScriptPathOnDisk)
  } else {
    srcUrl = 'http://localhost:7979/src/main.ts'
  }
  return getWebviewContent(srcUrl)
}

const getWebviewContent = (srcUri: string | vscode.Uri) => {
  return `<!doctype html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>webview-react</title>
      <script>
         window.vscode = acquireVsCodeApi();
         window.process = {
           env: {
             NODE_ENV: "production",
           },
         }
      </script>
    </head>
    <body>
      <div id="app"></div>
      <script  type="module" src="${srcUri}"></script>
    </body>
    </html>`
}
