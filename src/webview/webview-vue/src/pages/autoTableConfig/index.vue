<template>
  <div class="autoTable">
    <a-typography-title :level="4">配置生成增删查改表格</a-typography-title>
    <a-card title="筛选项配置">
      <a-tabs
        v-model:activeKey="model.filterActiveKey"
        type="editable-card"
        @edit="presenter.onFilterEdit"
        style="width: 700px"
      >
        <a-tab-pane
          v-for="filterItem in model.filterItems.value"
          :key="filterItem.key"
          :tab="filterItem.title"
        >
          <div class="main">
            <a-card style="margin-top: 20px">
              <a-form labelAlign="right" :label-col="labelCol">
                <a-form-item label="字段名">
                  <a-input v-model:value="filterItem.formItem.key" />
                </a-form-item>

                <a-form-item label="label">
                  <a-input v-model:value="filterItem.formItem.label" />
                </a-form-item>

                <a-form-item label="组件">
                  <a-select ref="select" v-model:value="filterItem.formItem.component">
                    <a-select-option
                      :value="compOption"
                      v-for="(compOption, cIdx) in model.ANTD_COMPONENT_OPTIONS"
                      :key="cIdx"
                    >
                      {{ compOption }}
                    </a-select-option>
                  </a-select>
                </a-form-item>

                <a-form-item label="placeholder">
                  <a-input v-model:value="filterItem.formItem.placeholder" />
                </a-form-item>
              </a-form>
            </a-card>
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-card>

    <a-card title="表格配置" style="margin-top: 20px">
      <a-tabs
        v-model:activeKey="model.tableActiveKey"
        type="editable-card"
        @edit="presenter.onTableEdit"
        style="width: 700px"
      >
        <a-tab-pane
          v-for="tableItem in model.tableItems.value"
          :key="tableItem.key"
          :tab="tableItem.title"
        >
          <div class="main">
            <a-card style="margin-top: 20px">
              <a-form :label-col="labelCol">
                <a-form-item label="title">
                  <a-input v-model:value="tableItem.tableItem.title" />
                </a-form-item>
                <a-form-item label="dataIndex">
                  <a-input v-model:value="tableItem.tableItem.dataIndex" />
                </a-form-item>
                <a-form-item label="key">
                  <a-input v-model:value="tableItem.tableItem.key" />
                </a-form-item>
                <a-form-item label="width">
                  <a-input v-model:value="tableItem.tableItem.width" />
                </a-form-item>
                <a-form-item label="自定义插槽">
                  <a-switch v-model:checked="tableItem.tableItem.slot" />
                </a-form-item>
              </a-form>
            </a-card>
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-card>

    <a-card style="margin-top: 20px" title="分页配置">
      <a-form :label-col="labelCol">
        <a-form-item label="是否分页">
          <a-switch v-model:checked="model.pagination.value.show" />
        </a-form-item>
        <a-form-item label="page字段名">
          <a-input v-model:value="model.pagination.value.page" />
        </a-form-item>
        <a-form-item label="size字段名">
          <a-input v-model:value="model.pagination.value.size" />
        </a-form-item>
        <a-form-item label="total字段获取">
          <a-input v-model:value="model.pagination.value.total" />
        </a-form-item>
      </a-form>
    </a-card>

    <a-card style="margin-top: 20px" title="接口配置">
      <a-form :label-col="labelCol">
        <a-form-item label="api名称">
          <a-input v-model:value="model.apiInfo.value.fetchName" />
        </a-form-item>
        <a-form-item label="列表数据获取字段">
          <a-input v-model:value="model.apiInfo.value.result" />
        </a-form-item>
        <a-form-item label="service方法名">
          <a-input v-model:value="model.apiInfo.value.serviceName" />
        </a-form-item>
      </a-form>
    </a-card>

    <div class="footer">
      <a-button
        @click="presenter.handleConfirmGenerateCode"
        :icon="h(FileTextOutlined)"
        size="large"
        type="primary"
      >
        生成代码
      </a-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { h } from 'vue'
import { FileTextOutlined } from '@ant-design/icons-vue'
import { usePresenter } from './presenter'
const presenter = usePresenter()
const { model } = presenter
const labelCol = { span: 3 }
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
