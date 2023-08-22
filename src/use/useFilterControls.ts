import { ref } from 'vue'
import * as allFilterStores from '@/stores/filterStoreFactory'
const filterStores: Record<FilterStoreKeys, () => StoreType> = allFilterStores;
import { Section } from '@/types/types'
import { StoreType, FilterStoreKeys } from '@/stores/filterStoreFactory';

type EType = {
  [key: string]: string | number;
};

type HandleUpdateStoreParams = {
  e: EType;
  storeId: StoreType & { $id: FilterStoreKeys };
};


export default function useFilterControls(sections: Section[]) {
  const loading = ref(false)

  const closeSelect = (section: Section) => {
    if (!section.staticData) {
      section.selectData = []
      section.currentPage = 1
      section.searchQuery = ''
    }
  }

  const searchValue = (e: string, section: Section) => {
    section.selectData = []    
    if (e != '') {
      section.currentPage = 1
      section.searchQuery = e
      section.fetchDataFunc?.();
    }
  }

  const loadMoreData = (section: Section) => {
    if (typeof section.currentPage === "object" && 'value' in section.currentPage) {
        section.currentPage.value += 1;
    } else if (typeof section.currentPage === "number") {
        section.currentPage += 1;
    }
    section.fetchDataFunc?.();
}


const handleUpdateStore = ({ e, storeId }: HandleUpdateStoreParams) => {
  let valueToUpdate = e

  if (storeId.$id === 'periodFilter' && typeof e === 'number') {
    valueToUpdate = { id: e }
  }

  const store = filterStores[storeId.$id]()

  store.set(valueToUpdate)
}

  const handleOpenSelect = (section: Section) => {
    if (!section.staticData) {
      section.fetchDataFunc?.();
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
