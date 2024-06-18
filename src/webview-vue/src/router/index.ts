import { createRouter, createWebHashHistory } from 'vue-router'
const autoFormConfig = () => import('@/pages/autoFormConfig/index.vue')
const autoTableConfig = () => import('@/pages/autoTableConfig/index.vue')
import ChatGPTIndex from '@/pages/chatGPT/Index/index.vue'

// 1. 定义路由组件.
// 也可以从其他文件导入
const routes = [
  {
    path: '/autoFormConfig',
    component: autoFormConfig,
    meta: {
      title: '配置表单',
    },
  },
  {
    path: '/autoTableConfig',
    component: autoTableConfig,
    meta: {
      title: '配置表格',
    },
  },
  {
    path: '/chat-gpt-view',
    name: 'chatGPT',
    component: ChatGPTIndex,
  },
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

export default router
