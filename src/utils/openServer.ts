import { Context, Next } from 'koa';

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

interface FormItem {
  name?: string;
  type?: string;
  optional?: boolean;
  defaultValue?: string;
  component?: string;
  required?: boolean;
  showMore?: boolean;
  slots?: boolean;
  key?: string;
  placeholder?: string;
  label?: string;
  propType?: string;
  size?: string;
  border?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  colon?: boolean;
  center?: boolean;
  clearable?: boolean;
  clickable?: boolean;
  isLink?: boolean;
  autofocus?: boolean;
  showWordLimit?: boolean;
  arrowDirection?: string;
  labelAlign?: string;
  inputAlign?: string;
  maxlength?: string;
  labelSlot?: boolean;
  leftIcon?: boolean;
  rightIcon?: boolean;
  button?: boolean;
  extra?: boolean;
}

export interface FigmaDataType {
  type: string; // 表单or other...
  renderPath?: string; // 要把生成的代码放到哪个文件夹下
  defineProps?: boolean; // 是否需要defineProps
  defineEmits?: boolean; // 是否需要defineEmits
  formItems: FormItem[]; // 表单项数据
}

// 定义请求体和响应体的类型
interface RequestData {
  figmaData: FigmaDataType;
}

// bodyParser 中间件会将解析后的数据绑定到 ctx.request.body 上, 所以需要扩展下 Request 接口定义
declare module 'koa' {
  interface Request {
    body: RequestData;
  }
}

interface ResponseData {
  status: 'success' | 'error';
  data?: any;
  message?: string;
}

export const openServer = (
  PORT: number = 2023,
  callback: (reqData: RequestData['figmaData']) => void,
) => {
  const app = new Koa();
  const router = new Router();

  app.use(cors());
  app.use(bodyParser());

  // 错误处理中间件
  app.use(async (ctx: Context, next: Next) => {
    try {
      await next();
    } catch (err: any) {
      ctx.status = err.status || 500;
      ctx.body = {
        status: 'error',
        message: err.message || 'Internal Server Error',
      };
      ctx.app.emit('error', err, ctx); // 触发应用级错误事件
    }
  });

  // POST 路由：/submitFigmaData
  router.post('/submitFigmaData', async (ctx: Context) => {
    const requestBody: RequestData = ctx.request.body;

    if (!requestBody.figmaData) {
      throw new Error('figmaData is missing in the request body');
    }
    const responseData: ResponseData = {
      status: 'success',
      data: '发送figma数据成功',
    };
    ctx.body = responseData;
    // figma数据传给回调函数
    callback(requestBody.figmaData);
    // 接受完数据后关闭服务器
    server.close();
  });

  app.use(router.routes()).use(router.allowedMethods());

  const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  // 监听应用级错误
  app.on('error', (err: any) => {
    console.error('Server error', err);
  });
};
