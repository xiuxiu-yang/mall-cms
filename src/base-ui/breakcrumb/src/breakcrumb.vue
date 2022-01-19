<template>
  <el-breadcrumb separator="/">
    <template v-for="item in breakCrumb" :key="item.name">
      <el-breadcrumb-item>{{ item.name }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IBreakCrumb } from '..'

export default defineComponent({
  props: {
    breakCrumb: {
      type: Array as PropType<IBreakCrumb[]>,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
