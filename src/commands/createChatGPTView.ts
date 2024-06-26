import {
  commands,
  ExtensionContext,
  WebviewView,
  WebviewViewProvider,
  window,
  workspace,
} from 'vscode'
import { getVueHtmlForWebview } from '../webview/index'

// 创建一个 webview 视图
let webviewViewProvider: MyWebviewViewProvider | undefined

// 实现 Webview 视图提供者接口，以下内容都是 chatGPT 提供
class MyWebviewViewProvider implements WebviewViewProvider {
  public webview?: WebviewView['webview']

  constructor(private context: ExtensionContext) {
    this.context = context
  }
  resolveWebviewView(webviewView: WebviewView): void {
    this.webview = webviewView.webview
    // 设置 enableScripts 选项为 true
    webviewView.webview.options = {
      enableScripts: true,
    }
    // 设置 Webview 的内容
    webviewView.webview.html = getVueHtmlForWebview(this.context, webviewView.webview)

    webviewView.webview.onDidReceiveMessage(
      (message: { cmd: string; cbid: string; data: any; skipError?: boolean }) => {
        // 监听webview反馈回来加载完成，初始化主动推送消息
        if (message.cmd === 'webviewLoaded') {
          console.log('反馈消息:', message)
        }
      }
    )
  }

  // 销毁
  removeWebView() {
    this.webview = undefined
  }
}

const openChatGPTView = (selectedText?: string, gptType?: string) => {
  // 唤醒 chatGPT 视图
  commands.executeCommand('workbench.view.extension.lowlow-vs').then(() => {
    commands.executeCommand('setContext', 'lowlow-vs.chatGPTView', true).then(() => {
      const config = workspace.getConfiguration('lowlow-vs')
      const hostname = config.get('hostname')
      const apiKey = config.get('apiKey')
      const model = config.get('model')
      setTimeout(() => {
        // 发送任务,并传递参数
        if (!webviewViewProvider || !webviewViewProvider?.webview) {
          return
        }
        webviewViewProvider.webview.postMessage({
          cmd: 'vscodePushTask',
          task: 'route',
          data: {
            path: '/chat-gpt-view',
            query: {
              hostname,
              apiKey,
              selectedText,
              model,
              gptType,
            },
          },
        })
      }, 500)
    })
  })
}

export const registerCreateChatGPTView = (context: ExtensionContext) => {
  // 注册 webview 视图
  webviewViewProvider = new MyWebviewViewProvider(context)
  context.subscriptions.push(
    window.registerWebviewViewProvider('lowlow-vs.chatGPTView', webviewViewProvider, {
      webviewOptions: {
        retainContextWhenHidden: true,
      },
    })
  )

  context.subscriptions.push(
    // 添加打开视图
    commands.registerCommand('lowlow-vs.openChatGPTView', () => {
      console.log('openChatGPTView')
      openChatGPTView()
    }),

    // 添加关闭视图
    commands.registerCommand('lowlow-vs.hideChatGPTView', () => {
      commands.executeCommand('setContext', 'lowlow-vs.chatGPTView', false).then(() => {
        webviewViewProvider?.removeWebView()
      })
    }),

    // 添加解释这段文案
    commands.registerCommand('lowlow-vs.explainByChatGPT', () => {
      // 获取当前活动的文本编辑器
      const editor = window.activeTextEditor

      if (editor) {
        // 获取用户选中的文本
        const selectedText = editor.document.getText(editor.selection)
        if (!selectedText) {
          window.showInformationMessage('没有选中的文本')
          return
        }

        // 获取本插件的设置
        const config = workspace.getConfiguration('lowlow-vs')
        const hostname = config.get('hostname')
        const apiKey = config.get('apiKey')
        if (!hostname) {
          window.showInformationMessage(
            '请先设置插件 lowlow 的 hostname，点击左侧标签栏 lowlow 的图标进行设置'
          )
          return
        }
        if (!apiKey) {
          window.showInformationMessage(
            '请先设置插件 lowlow 的 apiKey，点击左侧标签栏 lowlow 的图标进行设置'
          )
          return
        }
        // 打开左侧的 chatGPT 对话框,并传入问题
        openChatGPTView(selectedText, 'explain')
      } else {
        window.showInformationMessage('没有活动的文本编辑器')
      }
    })
  )
}
