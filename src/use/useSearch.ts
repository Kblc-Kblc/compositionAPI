import { useSearchFilterStore } from '@/stores/searchFilter'
import { onBeforeRouteLeave } from 'vue-router'
import _ from 'lodash'

export default function useSearch() {
  const search = useSearchFilterStore()

  const updateSearch = _.debounce((newSearch) => {
    search.setDebouncedSearch(newSearch)
  }, 1500)

  const resetSearch = () => {
    search.setSearch('')
  }

  onBeforeRouteLeave(() => {
    resetSearch()
    search.resetState()
  })

  return {
    search,
    updateSearch,
    resetSearch
  }
}
