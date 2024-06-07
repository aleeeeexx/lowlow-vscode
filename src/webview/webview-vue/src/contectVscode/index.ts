/* eslint-disable @typescript-eslint/no-explicit-any */
// 和vscode对接的桥梁
//vscode变量已在获取webvie html时提前注册好window.vscode = acquireVsCodeApi();

import { message as antdMessage } from 'ant-design-vue'
import router from '../router'

const callbacks: { [propName: string]: (data: any) => void } = {}
const errorCallbacks: { [propName: string]: (data: any) => void } = {}

// 监听vscode,接收来自vscode的信息
export const initListenVscode = () => {
  window.addEventListener('message', event => {
    console.log('messagefrom-vscdoe')
    const message = event.data
    switch (message.cmd) {
      // 来自vscode的回调
      case 'vscodeCallback':
        if (message.code === 200) {
          ;(callbacks[message.cbid] || function () {})(message.data)
        } else {
          ;(errorCallbacks[message.cbid] || function () {})(message.data)
        }
        delete callbacks[message.cbid]
        delete errorCallbacks[message.cbid]
        break
      // 来自 chatgpt chunck 的回调
      case 'vscodeChatGPTChunkCallback':
        if (taskHandler[message.task]) {
          taskHandler[message.task](message.data)
        } else {
          antdMessage.error(`未找到名为 ${message.task} 回调方法!`)
        }
        break
      // vscode 主动推送task
      case 'vscodePushTask': {
        if (taskHandler[message.task]) {
          taskHandler[message.task](message.data)
        } else {
          antdMessage.error(`未找到名为 ${message.task} 回调方法!`)
        }
      }
      default:
        break
    }
  })
}

// 封装向vscode传递信息的方法，供页面使用
export function request<T = unknown>(params: { cmd: string; data?: any; skipError?: boolean }) {
  return new Promise<T>((resolve, reject) => {
    callVscode(
      { cmd: params.cmd, data: params.data, skipError: params.skipError },
      res => {
        resolve(res)
      },
      error => {
        reject(error)
      }
    )
  })
}

export function callVscode(
  data: { cmd: string; data?: any; skipError?: boolean },
  cb?: (data: any) => void,
  errorCb?: (data: any) => void
) {
  if (cb) {
    const cbid = `${Date.now()}${Math.round(Math.random() * 100000)}`
    callbacks[cbid] = cb
    console.log(data, 'data')
    vscode.postMessage({
      ...data,
      cbid,
    })
    if (errorCb) {
      errorCallbacks[cbid] = errorCb
    }
  } else {
    vscode.postMessage(data)
  }
}

// 分发任务
export const taskHandler: {
  [propName: string]: (data: any) => void
} = {
  // 跳转路由
  route: (data: { path: string; selectedFolder: string }) => {
    if (data.selectedFolder) {
      localStorage.setItem('selectedFolder', data.selectedFolder)
    }
    router.push(data.path)
  },
  updateSelectedFolder: (data: { selectedFolder: string }) => {
    localStorage.setItem('selectedFolder', data.selectedFolder || '')
  },
}
