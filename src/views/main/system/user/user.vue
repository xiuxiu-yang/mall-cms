<template>
  <div class="user">
    <search-info
      :formConfig="formConfig"
      @handlerSearchClick="querySearch"
      @handlerClearClick="resetSearch"
    ></search-info>
    <search-content
      v-bind="tableConfig"
      ref="searchContentRef"
      @handlerCreateBtn="handlerCreateBtn"
      @handlerUpdateBtn="handlerUpdateBtn"
    ></search-content>
    <search-modal
      :modalConfig="searchModelConfig"
      :defaultInfo="defaultInfo"
      ref="searchModalRef"
    ></search-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import searchContent from '@/components/search-content/searchContent.vue'
import searchInfo from '@/components/search-info/searchInfo.vue'
import searchModal from '@/components/search-modal/searchModal.vue'

import { formConfig } from './config/form.config'
import { tableConfig } from './config/table.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'

import { useStore } from '@/store'
export default defineComponent({
  name: 'user',
  components: {
    searchInfo,
    searchContent,
    searchModal
  },
  emits: ['handlerEmit'],
  setup(psops, { emit }) {
    const createCb = () => {
      for (const item of modalConfig.formItem.filter(
        (item) => item.isShow !== undefined
      )) {
        item.isShow = true
      }
    }
    emit('handlerEmit', 'true')
    const editCb = () => {
      for (const item of modalConfig.formItem.filter(
        (item) => item.isShow !== undefined
      )) {
        item.isShow = false
      }
    }
    const store = useStore()
    const [searchContentRef, querySearch, resetSearch] = usePageSearch()
    const [searchModalRef, defaultInfo, handlerCreateBtn, handlerUpdateBtn] =
      usePageModal(createCb, editCb)

    const searchModelConfig = computed(() => {
      const departmentList = store.state.system.departmentList
      const roleList = store.state.system.roleList
      const departmentItem = modalConfig.formItem.find(
        (item) => item.field === 'departmentId'
      )
      const roleItem = modalConfig.formItem.find(
        (item) => item.field === 'roleId'
      )
      if (departmentItem?.option) {
        departmentItem.option = departmentList.map((item) => {
          return { id: item.id, name: item.name }
        })
      }
      if (roleItem?.option) {
        roleItem.option = roleList.map((item) => {
          return { id: item.id, name: item.name }
        })
      }
      return modalConfig
    })

    return {
      formConfig,
      searchModelConfig,
      tableConfig,
      querySearch,
      resetSearch,
      handlerCreateBtn,
      handlerUpdateBtn,
      searchContentRef,
      searchModalRef,
      defaultInfo
    }
  }
})
</script>

<style scoped></style>
