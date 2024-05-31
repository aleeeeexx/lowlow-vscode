<template>
  <div class="autoform">
    <a-card title="表单配置生成代码" style="width: 800px" key="ni">
      <template #extra>
        <a-button type="primary" @click="presenter.handleAddFormItem">新增表单项</a-button>
      </template>
      <a-form-item label="是否配置props">
        <a-switch v-model:checked="model.isDefineProps.value" />
      </a-form-item>
      <a-form-item label="是否配置emits">
        <a-switch v-model:checked="model.isDefineEmits.value" />
      </a-form-item>
    </a-card>

    <div class="main">
      <a-card
        v-for="(item, index) in model.formItems.value"
        :key="item"
        style="margin-top: 20px"
        :title="`表单项${index + 1}:${item.key ?? ''}`"
      >
        <template #extra>
          <CloseOutlined style="font-size: 18px" @click="presenter.handleDelFormItem(index)" />
        </template>
        <a-form labelAlign="left">
          <a-form-item label="字段名">
            <a-input v-model:value="item.key" />
          </a-form-item>
          <a-form-item label="字段类型">
            <a-input v-model:value="item.type" />
          </a-form-item>
          <a-form-item label="是否可选">
            <a-switch v-model:checked="item.optional" />
          </a-form-item>
          <a-form-item label="默认值">
            <a-input v-model:value="item.defaultValue" />
          </a-form-item>
          <a-form-item label="组件">
            <a-select ref="select" v-model:value="item.component">
              <a-select-option
                :value="compOption"
                v-for="(compOption, cIdx) in model.ANTD_COMPONENT_OPTIONS"
                :key="cIdx"
              >
                {{ compOption }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="label">
            <a-input v-model:value="item.label" />
          </a-form-item>
          <a-form-item label="placeholder">
            <a-input v-model:value="item.placeholder" />
          </a-form-item>
          <a-form-item label="是否必填">
            <a-switch v-model:checked="item.required" />
          </a-form-item>
          <a-form-item label="校验失败message">
            <a-input v-model:value="item.placeholder" />
          </a-form-item>
          <a-form-item label="maxlength">
            <a-input v-model:value="item.maxlength" />
          </a-form-item>
          <a-form-item label="是否展示字数">
            <a-switch v-model:checked="item.showCount" />
          </a-form-item>
        </a-form>
      </a-card>
    </div>

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
import { CloseOutlined, FileTextOutlined } from '@ant-design/icons-vue'
import { usePresenter } from './presenter'
const presenter = usePresenter()
const { model } = presenter
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
