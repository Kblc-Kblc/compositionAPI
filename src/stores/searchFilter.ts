import { defineStore } from 'pinia'

export const useSearchFilterStore = defineStore({
  id: 'searchOrganizations',
  state: () => ({
    debouncedSearch: ''
  }),
  actions: {
    setSearch(value) {
      this.search = value
    },
    setDebouncedSearch(value) {
      this.debouncedSearch = value
    },
    resetState() {
      ;(this.debouncedSearch = ''), (this.search = '')
    }
  }
})
