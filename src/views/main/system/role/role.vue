<template>
  <div class="role">
    <searchInfo
      :formConfig="formConfig"
      @handlerClearClick="resetSearch"
      @handlerSearchClick="querySearch"
    ></searchInfo>
    <search-content
      v-bind="tableConfig"
      ref="searchContentRef"
      @handlerCreateBtn="handlerCreateBtn"
      @handlerUpdateBtn="handlerUpdateBtn"
    ></search-content>
    <search-modal
      :modalConfig="modalConfig"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
      ref="searchModalRef"
    >
      <template #default>
        <el-tree
          :data="menuList"
          show-checkbox
          node-key="id"
          ref="elTreeRef"
          :props="{ children: 'children', label: 'name' }"
          @check="handlerCheckChange"
        />
      </template>
    </search-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'

import { useStore } from '@/store'

import searchInfo from '@/components/search-info/searchInfo.vue'
import searchContent from '@/components/search-content/searchContent.vue'
import searchModal from '@/components/search-modal/searchModal.vue'

import { formConfig } from './config/form.config'
import { tableConfig } from './config/table.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'

import { menuMaptoId } from '@/utils/mapMenus'
import { ElTree } from 'element-plus'
export default defineComponent({
  name: 'role',
  components: {
    searchInfo,
    searchContent,
    searchModal
  },
  setup() {
    const store = useStore()
    const menuList = computed(() => store.state.login.userMenus)
    const [searchContentRef, querySearch, resetSearch] = usePageSearch()

    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCb = (item: any) => {
      const id = menuMaptoId(item.menuList)
      nextTick(() => {
        if (elTreeRef.value) {
          console.log(id)
          elTreeRef.value.setCheckedKeys(id, false)
        }
      })
    }
    const [searchModalRef, defaultInfo, handlerCreateBtn, handlerUpdateBtn] =
      usePageModal(undefined, editCb)

    const otherInfo = ref<any>()
    const handlerCheckChange = (check: any, checkItem: any) => {
      const checkKeys = checkItem.checkedKeys
      const halfCheckKeys = checkItem.halfCheckedKeys
      const menuList = [...checkKeys, ...halfCheckKeys]
      otherInfo.value = { menuList }
    }

    return {
      formConfig,
      tableConfig,
      modalConfig,
      defaultInfo,
      searchContentRef,
      searchModalRef,
      elTreeRef,
      querySearch,
      resetSearch,
      handlerCreateBtn,
      handlerUpdateBtn,
      menuList,
      otherInfo,
      handlerCheckChange
    }
  }
})
</script>

<style scoped lang="less">
.el-tree {
  margin-left: 100px;
}
</style>
