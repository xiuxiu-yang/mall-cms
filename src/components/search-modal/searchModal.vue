<template>
  <div class="search-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="`${modalConfig.title}列表`"
      width="30%"
      center
      destroy-on-close
    >
      <ct-form v-bind="modalConfig" v-model="formData" ref="formRef"></ct-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handlerCreateClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch } from 'vue'

import ctForm from '@/base-ui/form'

import { useStore } from '@/store'

import { IForm } from '@/base-ui/form/src/type'

export default defineComponent({
  components: {
    ctForm
  },
  props: {
    modalConfig: {
      type: Object as PropType<IForm>,
      required: true
    },
    defaultInfo: {
      type: Object,
      required: true
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const store = useStore()
    const dialogVisible = ref(false)

    const formData = ref<any>({})
    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItem) {
          formData.value[item.field] = newValue[item.field]
        }
      }
    )

    const formRef = ref<InstanceType<typeof ctForm>>()
    const handlerCreateClick = () => {
      if (!Object.keys(props.defaultInfo).length) {
        formRef.value?.handlerBlur()
        if (formRef.value?.isValidate) {
          if (formData.value['confirmPassword']) {
            delete formData.value['confirmPassword']
          }
          store.dispatch('system/createDataAction', {
            pageName: props.modalConfig.pageName,
            data: { ...formData.value, ...props.otherInfo }
          })
          dialogVisible.value = false
        }
      } else {
        store.dispatch('system/editDataAction', {
          pageName: props.modalConfig.pageName,
          id: props.defaultInfo.id,
          data: { ...formData.value, ...props.otherInfo }
        })
        dialogVisible.value = false
      }
    }
    return {
      dialogVisible,
      formData,
      handlerCreateClick,
      formRef
    }
  }
})
</script>

<style scoped></style>
