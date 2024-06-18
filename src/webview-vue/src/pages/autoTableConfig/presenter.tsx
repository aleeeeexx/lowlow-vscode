import Service from './service'
import { useModel } from './model'
import { genCodeByBlockMaterial } from '../../contectVscode/service'
import { message } from 'ant-design-vue'

export const usePresenter = () => {
  const model = useModel()
  const service = new Service(model)

  const filterAdd = () => {
    model.filterActiveKey.value = `newTab${++model.newTabIndex.value}`
    model.filterItems.value.push({
      title: `查询条件${model.filterItems.value.length + 1}`,
      formItem: {
        component: '',
        key: '',
        label: '',
        placeholder: '',
      },
      key: model.filterActiveKey.value,
    })
  }
  const filterRemove = (targetKey: string) => {
    let lastIndex = 0
    model.filterItems.value.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1
      }
    })
    model.filterItems.value = model.filterItems.value.filter(pane => pane.key !== targetKey)
    if (model.filterItems.value.length && model.filterActiveKey.value === targetKey) {
      if (lastIndex >= 0) {
        model.filterActiveKey.value = model.filterItems.value[lastIndex].key
      } else {
        model.filterActiveKey.value = model.filterItems.value[0].key
      }
    }
  }
  const onFilterEdit = (targetKey: string, action: string) => {
    if (action === 'add') {
      filterAdd()
    } else {
      filterRemove(targetKey as string)
    }
  }

  const tableAdd = () => {
    model.tableActiveKey.value = `newTab${++model.newTableTabIndex.value}`
    model.tableItems.value.push({
      title: `表格项${model.tableItems.value.length + 1}`,
      tableItem: {
        title: '',
        dataIndex: '',
        key: '',
        width: '',
        slot: false,
      },
      key: model.tableActiveKey.value,
    })
  }

  const tableRemove = (targetKey: string) => {
    let lastIndex = 0
    model.tableItems.value.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1
      }
    })
    model.tableItems.value = model.tableItems.value.filter(pane => pane.key !== targetKey)
    if (model.tableItems.value.length && model.tableActiveKey.value === targetKey) {
      if (lastIndex >= 0) {
        model.tableActiveKey.value = model.tableItems.value[lastIndex].key
      } else {
        model.tableActiveKey.value = model.tableItems.value[0].key
      }
    }
  }
  const onTableEdit = (targetKey: string, action: string) => {
    if (action === 'add') {
      tableAdd()
    } else {
      tableRemove(targetKey as string)
    }
  }
  const handleConfirmGenerateCode = () => {
    const data = {
      filters: model.filterItems.value.map(item => JSON.parse(JSON.stringify(item.formItem))),
      columns: model.tableItems.value.map(tItem => JSON.parse(JSON.stringify(tItem.tableItem))),
      pagination: JSON.parse(JSON.stringify(model.pagination.value)),
      ...model.apiInfo.value,
      includeModifyModal: false,
      modifyMOdal: {},
    }
    //@ts-ignore
    const selectedFolder = localStorage.getItem('selectedFolder')
    genCodeByBlockMaterial({
      material: '增删改查列表页',
      model: data,
      path: '',
      createPath: selectedFolder ? [selectedFolder] : [],
      privateMaterials: undefined,
    }).then(() => {
      message.success('生成成功')
    })
    console.log(data, 'handleConfirmGenerateCode-data')
  }

  return {
    model,
    service,
    onFilterEdit,
    onTableEdit,
    handleConfirmGenerateCode,
  }
}
