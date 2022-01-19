import { ref } from 'vue'
import searchModal from '@/components/search-modal/searchModal.vue'

export function usePageModal(
  createCb?: () => void,
  editCb?: (item?: any) => void
): any[] {
  const searchModalRef = ref<InstanceType<typeof searchModal>>()
  const defaultInfo = ref({})
  const handlerCreateBtn = () => {
    if (searchModalRef.value) {
      defaultInfo.value = {}
      searchModalRef.value.dialogVisible = true
    }
    createCb && createCb()
  }
  const handlerUpdateBtn = (item: any) => {
    if (searchModalRef.value) {
      defaultInfo.value = { ...item }
      searchModalRef.value.dialogVisible = true
    }
    editCb && editCb(item)
  }
  return [searchModalRef, defaultInfo, handlerCreateBtn, handlerUpdateBtn]
}
