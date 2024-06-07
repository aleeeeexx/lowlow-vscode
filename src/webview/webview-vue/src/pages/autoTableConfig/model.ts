import { ref } from 'vue'

export const useModel = () => {
  // 查询条件
  const filterItems = ref<
    { title: string; formItem: IFormItem; key: string; closable?: boolean }[]
  >([
    {
      title: '查询条件1',
      formItem: {
        component: '',
        key: '',
        label: '',
        placeholder: '',
      },
      key: '1',
    },
  ])

  const filterActiveKey = ref(filterItems.value[0].key)
  const newTabIndex = ref(0)

  interface IFormItem {
    component: string
    key: string
    label: string
    placeholder?: string
  }

  interface tableItem {
    title: string
    dataIndex: string
    key: string
    width: string
    slot: boolean
  }

  const ANTD_COMPONENT_OPTIONS = ['input', 'select']

  // 表格配置
  const tableActiveKey = ref('1')
  const newTableTabIndex = ref(0)

  const tableItems = ref<
    { title: string; tableItem: tableItem; key: string; closable?: boolean }[]
  >([
    {
      title: '表格项1',
      tableItem: {
        title: '',
        dataIndex: '',
        key: '',
        width: '',
        slot: false,
      },
      key: '1',
    },
  ])

  const pagination = ref({
    show: false,
    page: 'page',
    size: 'size',
    total: 'result.total',
  })
  const apiInfo = ref({
    fetchName: 'fetchTableList',
    result: '["result"]["records"]',
    serviceName: 'getTableList',
  })

  return {
    filterItems,
    newTabIndex,
    filterActiveKey,
    ANTD_COMPONENT_OPTIONS,
    tableActiveKey,
    tableItems,
    newTableTabIndex,
    pagination,
    apiInfo,
  }
}

export type Model = ReturnType<typeof useModel>
