import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), cssInjectedByJsPlugin()],
  server: {
    port: 7979,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // 打包配置
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/main.ts'), // 设置入口文件
      name: 'main', // 起个名字，安装、引入用
      formats: ['es'], // 设置打包模式
      fileName: `main`, // 打包后的文件名【可以自定义】
    },
    sourcemap: false, // 输出.map文件
    outDir: '../../webview-dist', // 将打包文件拉出来，直接给插件项目使用
  },
})
