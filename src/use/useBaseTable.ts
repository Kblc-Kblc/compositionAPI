import { ref, computed, watchEffect } from 'vue'
import api from '@/api/index'

export default function useBaseTable(filtersConfig, apiMethod) {
  const tableData = ref([])
  const total = ref(0)
  const loading = ref(false)
  const filters = Object.entries(filtersConfig).map(([key, filter]) => {
    if (key === 'search') {
      return computed(() => filter.value || '')
    }
    return computed(() => filter.value?.id || '')
  })

  const handleSortChange = ({ prop, order }) => {
    const sortDesc = order === 'ascending' ? 0 : 1
    fetchData({
      currentPage: 1,
      pageSize: 25,
      sort: { sort_by: prop, sort_desc: sortDesc }
    })
  }

  const fetchData = ({ currentPage, pageSize, sort = {} }) => {
    loading.value = true
    const allFiltersAreAll = filters.every((filter) => filter?.value === 'Все')

    let combinedFilters
    if (allFiltersAreAll) {
      combinedFilters = {}
    } else {
      combinedFilters = Object.keys(filtersConfig).reduce((obj, key, index) => {
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
      .then((response) => {
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
