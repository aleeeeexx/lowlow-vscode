import Service from './service'
import { useModel } from './model'
import { genCodeByBlockMaterial } from '../../contectVscode/service'
import { message } from 'ant-design-vue'
export const usePresenter = () => {
  const model = useModel()
  const service = new Service(model)

  const handleAddFormItem = () => {
    const tempFormItem = {
      type: '',
      component: '',
      key: '',
      optional: false,
      defaultValue: '',
      label: '',
      placeholder: '',
      required: false,
      message: '',
      showMore: false,
      maxlength: '',
      showCount: false,
    }
    model.formItems.value.push({
      ...tempFormItem,
    })
  }

  const handleDelFormItem = (idx: number) => {
    if (model.formItems.value.length === 1) return
    model.formItems.value.splice(idx, 1)
  }

  // const testData: {
  //   material: string
  //   model: object
  //   path: string
  //   createPath: string[]
  //   privateMaterials?: boolean
  // } = {
  //   material: '表单',
  //   model: {
  //     modal: false,
  //     title: '',
  //     formItems: [
  //       {
  //         key: 'aone',
  //         type: 'string',
  //         defaultValue: '""',
  //         component: 'input',
  //         label: 'a-label',
  //         placeholder: 'a-placeholder',
  //         required: true,
  //         message: 'shibaila',
  //         showMore: true,
  //         maxlength: '20',
  //         showCount: true,
  //       },
  //       {
  //         key: 'alexTwo',
  //         type: 'number',
  //         optional: true,
  //         defaultValue: '0',
  //         component: 'textarea',
  //         label: '2',
  //         placeholder: '2',
  //         message: '2',
  //       },
  //     ],
  //     independentFormFile: false,
  //     excludeOriFile: false,
  //   },
  //   path: '/Users/aleeeeex/Desktop/alexslowcode/forlowcode-learn',
  //   createPath: ['alex-testbolck'],
  //   privateMaterials: undefined,
  // }

  const handleConfirmGenerateCode = () => {
    // 把数据传输到vscode
    genCodeByBlockMaterial({
      material: '表单',
      model: {
        modal: false,
        title: '',
        formItems: model.formItems.value,
        independentFormFile: false,
        excludeOriFile: false,
      },
      path: '',
      createPath: [],
      privateMaterials: undefined,
    }).then(() => {
      message.success('生成成功')
    })
  }

  return {
    model,
    service,
    handleAddFormItem,
    handleDelFormItem,
    handleConfirmGenerateCode,
  }
}
