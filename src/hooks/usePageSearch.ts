import { ref } from 'vue'
import searchContent from '@/components/search-content/searchContent.vue'

export function usePageSearch(): any[] {
  const searchContentRef = ref<InstanceType<typeof searchContent>>()
  const querySearch = (queryInfo: any) => {
    console.log(queryInfo)
    searchContentRef.value?.getDataList(queryInfo)
  }
  const resetSearch = () => {
    searchContentRef.value?.getDataList()
  }

  return [searchContentRef, querySearch, resetSearch]
}
