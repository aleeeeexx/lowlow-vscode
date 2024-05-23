import { genCodeByBlock } from '../utils/generate'
const startServer = require('../utils/backServer')
export const genFormCodeByBlock = () => {
  console.log('test-genFormcode')
  // 测试数据
  const testData: {
    material: string
    model: object
    path: string
    createPath: string[]
    privateMaterials?: boolean
  } = {
    material: '表单',
    model: {
      modal: false,
      title: '',
      formItems: [
        {
          key: 'aone',
          type: 'string',
          defaultValue: '""',
          component: 'input',
          label: 'a-label',
          placeholder: 'a-placeholder',
          required: true,
          message: 'shibaila',
          showMore: true,
          maxlength: '20',
          showCount: true,
        },
        {
          key: 'alexTwo',
          type: 'number',
          optional: true,
          defaultValue: '0',
          component: 'textarea',
          label: '2',
          placeholder: '2',
          message: '2',
        },
      ],
      independentFormFile: false,
      excludeOriFile: false,
    },
    path: '/Users/aleeeeex/Desktop/alexslowcode/forlowcode-learn',
    createPath: ['alex-testbolck'],
    privateMaterials: undefined,
  }
  startServer()
  // genCodeByBlock(testData)
}
