<template>
  <div>
    <div v-for="(section, index) in sections" :key="index" class="section-wrapper">
      <el-text size="large" class="label">{{ section.title }}</el-text>
      <base-select
        v-model="section.filter"
        :options="section.selectData"
        :is-name="section.isName"
        :label="section.label"
        :store-id="section.store"
        :searchable="section.searchable"
        class="select-wrapper"
        @search-value="(e) => searchValue(e, section)"
        @load-more-data="() => loadMoreData(section)"
        @update-store="handleUpdateStore"
        @close-select="() => closeSelect(section)"
        @open-select="() => handleOpenSelect(section)"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import BaseSelect from '@/components/BaseSelect.vue'
import useFilterControls from '@/use/useFilterControls'

import {
  useTerritoriesParentFilterStore,
  useTerritoriesTypesFilterStore,
  useTerritoriesGroupFilterStore
} from '@/stores/filterStoreFactory'
import api from '@/api/index'
import { useFetchData } from '@/use/useFetchData'
import useFilterDataSources from '@/use/useFilterDataSources'

export default {
  name: 'TerritoriesSelect',
  components: {
    BaseSelect
  },
  setup() {
    const {
      territoriesFilterStore,
      territoriesFilter,
      selectDataTerritories,
      currentPageTerritories,
      searchQueryTerritories,
      fetchDataTerritories
    } = useFilterDataSources()

    const territoriesParentFilterStore = useTerritoriesParentFilterStore()
    const territoriesParentFilter = ref(territoriesParentFilterStore.value)
    const selectDataTerritoriesParent = ref([])
    const currentPageTerritoriesParent = ref(1)
    const sizePageTerritoriesParent = ref(25)
    const searchQueryTerritoriesParent = ref('')

    const territoriesTypesFilterStore = useTerritoriesTypesFilterStore()
    const territoriesTypesFilter = ref(territoriesTypesFilterStore.value)
    const selectDataTerritoriesTypes = ref([])

    const territoriesGroupFilterStore = useTerritoriesGroupFilterStore()
    const territoriesGroupFilter = ref(territoriesGroupFilterStore.value)
    const selectDataTerritoriesGroup = ref([])
    const currentPageTerritoriesGroup = ref(1)
    const sizePageTerritoriesGroup = ref(25)
    const searchQueryTerritoriesGroup = ref('')

    const fetchDataTerritoriesParent = useFetchData({
      apiCall: api.dataSelect.getTerritories,
      selectData: selectDataTerritoriesParent,
      currentPage: currentPageTerritoriesParent,
      pageSize: sizePageTerritoriesParent,
      searchQuery: searchQueryTerritoriesParent
    }).fetchData

    const fetchDataTerritoriesTypes = useFetchData({
      apiCall: api.dataSelect.getTerritoriesTypes,
      selectData: selectDataTerritoriesTypes
    }).fetchData

    const fetchDataTerritoriesGroup = useFetchData({
      apiCall: api.dataSelect.getTerritoriesGroup,
      selectData: selectDataTerritoriesGroup,
      currentPage: currentPageTerritoriesGroup,
      pageSize: sizePageTerritoriesGroup,
      searchQuery: searchQueryTerritoriesGroup
    }).fetchData

    const sections = ref([
      {
        title: 'ID',
        filter: territoriesFilter,
        selectData: selectDataTerritories,
        currentPage: currentPageTerritories,
        store: territoriesFilterStore,
        searchQuery: searchQueryTerritories,
        fetchDataFunc: fetchDataTerritories,
        tooltip: true,
        searchable: true
      },
      {
        title: 'ID родителя',
        filter: territoriesParentFilter,
        selectData: selectDataTerritoriesParent,
        currentPage: currentPageTerritoriesParent,
        store: territoriesParentFilterStore,
        searchQuery: searchQueryTerritoriesParent,
        fetchDataFunc: fetchDataTerritoriesParent,
        tooltip: true,
        searchable: true
      },
      {
        title: 'Тип',
        filter: territoriesTypesFilter,
        selectData: selectDataTerritoriesTypes,
        store: territoriesTypesFilterStore,
        fetchDataFunc: fetchDataTerritoriesTypes,
        label: 'name',
        isName: true
      },
      {
        title: 'ID группы',
        filter: territoriesGroupFilter,
        selectData: selectDataTerritoriesGroup,
        currentPage: currentPageTerritoriesGroup,
        store: territoriesGroupFilterStore,
        searchQuery: searchQueryTerritoriesGroup,
        fetchDataFunc: fetchDataTerritoriesGroup,
        label: 'name',
        isName: true,
        searchable: true
      }
    ])

    const { loading, closeSelect, searchValue, loadMoreData, handleUpdateStore, handleOpenSelect } =
      useFilterControls(sections)

    return {
      loading,
      sections,
      searchValue,
      loadMoreData,
      closeSelect,
      handleUpdateStore,
      handleOpenSelect
    }
  }
}
</script>

<style scoped>
.select-wrapper {
  padding-bottom: 1.5rem;
}

.label {
  display: block;
  padding: 0px 0px 0.5rem 0px;
}
</style>
