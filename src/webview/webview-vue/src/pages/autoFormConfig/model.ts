import { ref } from 'vue'

export const useModel = () => {
  const isDefineProps = ref(false)
  const isDefineEmits = ref(false)
  interface IFormItem {
    type: string
    component: string
    key: string
    optional?: boolean
    defaultValue: string | boolean | number | undefined | []
    label: string
    placeholder?: string
    required?: boolean
    message?: string
    showMore?: boolean
    maxlength?: string
    showCount?: boolean
  }

  const formItems = ref<IFormItem[]>([
    {
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
    },
  ])
  const ANTD_COMPONENT_OPTIONS = [
    'input',
    'input-password',
    'input-number',
    'textarea',
    'select',
    'radio-group',
    'checkbox-group',
    'switch',
    'date-picker',
    'time-picker',
    'range-picker',
    'transfer',
  ]
  return { isDefineProps, isDefineEmits, formItems, ANTD_COMPONENT_OPTIONS }
}

export type Model = ReturnType<typeof useModel>
