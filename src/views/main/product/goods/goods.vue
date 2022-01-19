<template>
  <div class="goods">
    <search-info :formConfig="formConfig"></search-info>
    <search-content v-bind="tableConfig">
      <template #imgUrl="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        ></el-image>
      </template>
    </search-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import searchInfo from '@/components/search-info/searchInfo.vue'
import searchContent from '@/components/search-content/searchContent.vue'

import { tableConfig } from './config/table.config'
import { formConfig } from './config/form.config'
export default defineComponent({
  name: 'goods',
  components: {
    searchInfo,
    searchContent
  },
  setup() {
    return {
      tableConfig,
      formConfig
    }
  }
})
</script>

<style scoped></style>
