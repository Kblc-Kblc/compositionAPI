import { ref } from 'vue'
import * as filterStores from '@/stores/filterStoreFactory'

export default function useFilterControls(sections) {
  const loading = ref(false)

  const closeSelect = (section) => {
    if (!section.staticData) {
      section.selectData = []
      section.currentPage = 1
      section.searchQuery = ''
    }
  }

  const searchValue = (e, section) => {
    section.selectData = []
    if (e != '') {
      section.currentPage = 1
      section.searchQuery = e
      section.fetchDataFunc()
    }
  }

  const loadMoreData = (section) => {
    if (section.currentPage != '') {
      section.currentPage += 1
      section.fetchDataFunc()
    }
  }

  const handleUpdateStore = ({ e, storeId }) => {
    let valueToUpdate = e

    if (storeId.$id === 'periodFilter' && typeof e === 'number') {
      valueToUpdate = { id: e }
    }

    const store = filterStores[storeId.$id]()
    store.set(valueToUpdate)
  }

  const handleOpenSelect = (section) => {
    if (!section.staticData) {
      section.fetchDataFunc()
    }
  }

  return {
    loading,
    closeSelect,
    searchValue,
    loadMoreData,
    handleUpdateStore,
    sections,
    handleOpenSelect
  }
}
