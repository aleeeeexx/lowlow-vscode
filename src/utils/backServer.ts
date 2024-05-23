const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
import { genCodeByBlock } from './generate'

function startServer() {
  const app = new Koa()
  const router = new Router()
  app.use(cors())
  // 使用 bodyParser 中间件
  app.use(bodyParser())

  // 定义路由
  router.post('/submitFigmaData', async (ctx: any) => {
    console.log('submitFigmaData:', ctx.request.body)
    const model = {
      formItems: ctx.request.body.formITems,
      defineProps: false,
      defineEmits: false,
    }
    const testData: {
      material: string
      model: object
      path: string
      createPath: string[]
      privateMaterials?: boolean
    } = {
      material: '表单',
      model,
      path: '/Users/aleeeeex/Desktop/work/code/hasaki',
      createPath: ['alex-testdddbolckx'],
      privateMaterials: undefined,
    }
    genCodeByBlock(testData)
    ctx.body = { status: 'success', data: ctx.request.body }
  })

  app.use(router.routes()).use(router.allowedMethods())

  const PORT = 3000
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}

module.exports = startServer
