import { ref, computed, watchEffect, Ref } from 'vue'
import api from '@/api/index'

interface FilterConfigValue {
  value: string | { id: string }
}

interface FiltersConfig {
  [key: string]: FilterConfigValue
}

interface Sort {
  sort_by: string
  sort_desc: number
}

interface FetchDataArgs {
  currentPage: number
  pageSize: number
  sort?: Sort
}

interface UseBaseTableReturns {
  tableData: Ref<any[]>
  total: Ref<number>
  loading: Ref<boolean>
  fetchData: (args: FetchDataArgs) => void
  handleSortChange: (sort: SortChangeEvent) => void
}

interface APIResponse {
  data: {
    data: any[]
    meta: {
      total: number
    }
  }
}

interface SortChangeEvent {
  prop: string
  order: 'ascending' | 'descending' | null
}

type ApiMethod = keyof typeof api.dataTable

export default function useBaseTable(filtersConfig: FiltersConfig, apiMethod: ApiMethod): UseBaseTableReturns {
  const tableData: Ref<any[]> = ref([])
  const total = ref(0)
  const loading = ref(false)
  const filters = Object.entries(filtersConfig).map(([key, filter]) => {
    if (key === 'search') {
      return computed(() => (typeof filter.value === 'string' ? filter.value : ''))
    }
    return computed(() => {
      let actualValue = (filter as any).value ? (filter as any).value : filter
      if (typeof actualValue === 'object' && 'id' in actualValue) {
        return actualValue.id
      }
      return ''
    })
  })

  const handleSortChange = ({ prop, order }: SortChangeEvent) => {
    const sortDesc = order === 'ascending' ? 0 : 1
    fetchData({
      currentPage: 1,
      pageSize: 25,
      sort: { sort_by: prop, sort_desc: sortDesc }
    })
  }

  const fetchData = ({ currentPage, pageSize, sort = { sort_by: '', sort_desc: 0 } }: FetchDataArgs) => {
    loading.value = true
    const allFiltersAreAll = filters.every((filter) => filter?.value === 'Все')

    let combinedFilters
    if (allFiltersAreAll) {
      combinedFilters = {}
    } else {
      combinedFilters = Object.keys(filtersConfig).reduce<Record<string, any>>((obj, key, index) => {
        if (filters[index]?.value && filters[index]?.value !== 'Все') {
          obj[key] = filters[index]?.value
        }
        return obj
      }, {})
    }

    const params = {
      per_page: pageSize,
      page: currentPage,
      sort_by: sort.sort_by,
      sort_desc: sort.sort_desc,
      ...combinedFilters
    }

    api.dataTable[apiMethod](params)
      .then((response: APIResponse) => {
        tableData.value = response.data.data
        total.value = response.data.meta.total
        loading.value = false
      })
      .catch((error) => {
        console.log(error)
        loading.value = false
      })
  }

  watchEffect(() => {
    fetchData({ currentPage: 1, pageSize: 25 })
  })

  return {
    tableData,
    total,
    loading,
    fetchData,
    handleSortChange
  }
}
