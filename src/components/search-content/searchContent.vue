<template>
  <div class="page-content">
    <ct-table
      :tableData="tableData"
      :propData="propData"
      :showIndexColumn="showIndexColumn"
      :showSelectColumn="showSelectColumn"
      :title="title"
      :totalCount="totalCount"
      :treeProps="treeProps"
      v-model:pageSetup="pageSetup"
    >
      <template #handlerHeader>
        <el-button
          type="text"
          icon="el-icon-plus"
          v-if="isCreate"
          @click="handlerCreateClick"
          >新建{{ pageTitle }}</el-button
        >
      </template>
      <template #state="scope">
        <el-button
          size="mini"
          :type="scope.row.enable || scope.row.status ? 'success' : 'danger'"
          >{{
            scope.row.enable || scope.row.status ? '启用' : '禁用'
          }}</el-button
        >
      </template>
      <template #createAt="scope">
        <span>{{ $filter.format(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filter.format(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div>
          <el-button
            type="text"
            size="mini"
            icon="el-icon-edit"
            v-if="isUpdate"
            @click="handlerUpdateClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="text"
            size="mini"
            icon="el-icon-delete"
            v-if="isDelete"
            @click="handlerDeleteClick(scope)"
            >删除</el-button
          >
        </div>
      </template>
      <template #[otherSlotName]="scope">
        <slot :name="otherSlotName" :row="scope.row"></slot>
      </template>
    </ct-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, watch } from 'vue'

import ctTable from '@/base-ui/table'

import { useStore } from '@/store'
import { IPropData } from '@/views/main/system/type'

import { usePermission } from '@/hooks/usePermission'
export default defineComponent({
  props: {
    propData: {
      type: Array as PropType<IPropData[]>,
      required: true
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    pageName: {
      type: String,
      required: true
    },
    pageTitle: {
      type: String,
      required: true
    },
    treeProps: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    ctTable
  },
  emits: ['hasBtnName', 'handlerCreateBtn', 'handlerUpdateBtn'],
  setup(props, { emit }) {
    const store = useStore()

    const isQuery = usePermission(props.pageName, 'query')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isCreate = usePermission(props.pageName, 'create')

    const pageSetup = ref({
      currentPage: 1,
      pageSize: 10
    })

    watch(pageSetup, () => getDataList())
    const getDataList = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('system/getDataList', {
        pageName: props.pageName,
        data: {
          offset: pageSetup.value.pageSize * (pageSetup.value.currentPage - 1),
          size: pageSetup.value.pageSize,
          ...queryInfo
        }
      })
    }
    getDataList()
    const tableData = computed(
      () => (store.state.system as any)[`${props.pageName}List`]
    )
    watch(tableData, (newValue) => {
      emit('hasBtnName', newValue)
    })
    const totalCount = computed(
      () => (store.state.system as any)[`${props.pageName}TotalCount`]
    )
    const otherOptions = () => {
      let otherSlotName = ''
      for (const item of props.propData) {
        if (item.slotName === 'state') continue
        if (item.slotName === 'createAt') continue
        if (item.slotName === 'updateAt') continue
        if (item.slotName === 'handler') continue
        if (item.slotName) {
          otherSlotName = item.slotName
        }
      }
      return otherSlotName
    }
    const otherSlotName = otherOptions()

    const handlerDeleteClick = (item: any) => {
      store.dispatch('system/deleteDataAction', {
        pageName: props.pageName,
        id: item.row.id
      })
      tableData.value.splice(item.index, 1)
    }
    const handlerCreateClick = () => {
      emit('handlerCreateBtn')
    }
    const handlerUpdateClick = (item: any) => {
      emit('handlerUpdateBtn', item)
    }
    return {
      tableData,
      totalCount,
      getDataList,
      pageSetup,
      otherSlotName,
      handlerDeleteClick,
      handlerCreateClick,
      handlerUpdateClick,
      isQuery,
      isDelete,
      isUpdate,
      isCreate
    }
  }
})
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
