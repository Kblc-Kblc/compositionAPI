import { defineStore } from 'pinia'

export const useSearchFilterStore = defineStore({
  id: 'searchOrganizations',
  state: () => ({
    search: '',
    debouncedSearch: ''
  }),
  actions: {
    setSearch(value: string) {
      this.search = value
    },
    setDebouncedSearch(value: string) {
      this.debouncedSearch = value
    },
    resetState() {
      ;(this.debouncedSearch = ''), (this.search = '')
    }
  }
})
