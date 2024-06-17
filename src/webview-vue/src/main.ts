import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/reset.css'
import Antd from 'ant-design-vue'
import { initListenVscode } from './contectVscode/index'
createApp(App).use(router).use(Antd).mount('#app')

initListenVscode()
// 初始化完毕，通知 vscode 已加载完毕
// vscode.postMessage({ cmd: 'webviewLoaded' })
