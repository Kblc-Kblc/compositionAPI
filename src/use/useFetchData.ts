import { ref, Ref } from 'vue'

interface ApiCallParams {
  page: number;
  per_page: number;
  search: string;
}

interface ApiResponseData {
  description?: string;
  id: string;
  name: string;
  type_id?: string;
}

interface ApiCallFunction {
  (params: ApiCallParams): Promise<{ data: { data: ApiResponseData[] } }>;
}

interface UseFetchDataParams {
  apiCall: ApiCallFunction;
  selectData: Ref<ApiResponseData[]>;
  currentPage?: Ref<number>;
  pageSize?: Ref<number>;
  searchQuery?: Ref<string>;
}


export function useFetchData(params: UseFetchDataParams) {
  const { apiCall, selectData, currentPage = ref(1), pageSize = ref(25), searchQuery = ref('') } = params;

  const loading = ref(false)

  const prependAllOption = (data: ApiResponseData[]) => {
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
