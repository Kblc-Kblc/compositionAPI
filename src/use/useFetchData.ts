import { ref } from 'vue'

export function useFetchData({ apiCall, selectData, currentPage = ref(1), pageSize = ref(25), searchQuery = ref('') }) {
  const loading = ref(false)

  const prependAllOption = (data) => {
    const allItem = data.find((item) => item.id === 'Все')
    if (!allItem) {
      data.unshift({
        description: 'Все',
        id: 'Все',
        name: 'Все',
        type_id: '1'
      })
    }
  }

  const fetchData = () => {
    loading.value = true
    apiCall({ page: currentPage.value, per_page: pageSize.value, search: searchQuery.value })
      .then((response) => {
        selectData.value = [...selectData.value, ...response.data.data]
        prependAllOption(selectData.value)
        loading.value = false
      })
      .catch((error) => {
        console.log(error)
        loading.value = false
      })
  }

  return { fetchData, loading }
}
