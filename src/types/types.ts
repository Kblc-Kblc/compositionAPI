import { Ref } from 'vue'
import { StoreType } from '@/stores/filterStoreFactory'

export interface Section {
  title: string
  filter: any
  selectData: any[] | Ref<any[]>
  currentPage?: number | Ref<number>
  store: StoreType
  searchQuery?: Ref<string> | string
  fetchDataFunc?: Function | null
  isName?: boolean
  tooltip?: boolean
  searchable?: boolean
  staticData?: boolean
  label?: string
}
