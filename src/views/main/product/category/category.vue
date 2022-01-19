<template>
  <div class="category">
    <search-content v-bind="tableConfig"></search-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// import searchModal from '@/components/search-modal/searchModal.vue'
import searchContent from '@/components/search-content/searchContent.vue'

import { tableConfig } from './config/table.config'
export default defineComponent({
  name: 'category',
  components: {
    searchContent
  },
  setup() {
    return {
      tableConfig
    }
  }
})
</script>

<style scoped></style>
