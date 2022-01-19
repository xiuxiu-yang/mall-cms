<template>
  <div class="page-search">
    <ct-form v-bind="formConfig" v-model="formData">
      <template #header>
        <h3>高级检索</h3>
      </template>
      <template #footer>
        <el-button icon="el-icon-refresh" @click="handlerClearClick"
          >重置</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="handlerSearchClick"
          >搜索</el-button
        >
      </template>
    </ct-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'

import { IForm } from '@/base-ui/form/src/type'

import CtForm from '@/base-ui/form'

export default defineComponent({
  props: {
    formConfig: {
      type: Object as PropType<IForm>,
      required: true
    }
  },
  components: {
    CtForm
  },
  emits: ['handlerSearchClick', 'handlerClearClick'],
  setup(props, { emit }) {
    const dataList = {}
    for (const data of props.formConfig.formItem) {
      ;(dataList as any)[data.field] = ''
    }
    const formData = ref(dataList)
    const handlerClearClick = () => {
      formData.value = dataList
      emit('handlerClearClick')
    }
    const handlerSearchClick = () => {
      emit('handlerSearchClick', formData.value)
    }
    return {
      formData,
      handlerClearClick,
      handlerSearchClick
    }
  }
})
</script>

<style scoped></style>
