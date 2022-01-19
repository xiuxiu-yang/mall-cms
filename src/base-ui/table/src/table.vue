<template>
  <div class="ct-table">
    <div class="table-header">
      <div class="title">{{ title }}</div>
      <div class="handler">
        <slot name="handlerHeader"></slot>
      </div>
    </div>
    <el-table :data="tableData" border row-key="id">
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80px"
      ></el-table-column>
      <template v-for="propItem in propData" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot
              :name="propItem.slotName"
              :row="scope.row"
              :index="scope.$index"
            >
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="table-footer">
      <el-pagination
        :currentPage="pageSetup.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSetup.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IPropData } from '@/views/main/system/type'
import { IpageSetup } from './type'
export default defineComponent({
  props: {
    tableData: {
      type: Array,
      required: true
    },
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
    totalCount: {
      type: Number,
      default: 0
    },
    pageSetup: {
      type: Object as PropType<IpageSetup>,
      required: true
    },
    treeProps: {
      type: Object,
      required: true
    }
  },
  emits: ['update:pageSetup'],
  setup(props, { emit }) {
    const handleSizeChange = (pageSize: number) => {
      emit('update:pageSetup', { ...props.pageSetup, pageSize })
    }
    const handleCurrentChange = (currentPage: number) => {
      emit('update:pageSetup', { ...props.pageSetup, currentPage })
    }

    return {
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped lang="less">
.ct-table {
  .table-header {
    display: flex;
    height: 45px;
    padding: 0 5px;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 20px;
      font-weight: 700;
    }
    .handler {
      align-items: center;
    }
  }
  .table-footer {
    padding-top: 20px;
    .el-pagination {
      text-align: right;
    }
  }
}
</style>
