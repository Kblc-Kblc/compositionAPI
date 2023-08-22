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

<script lang="ts">
import { defineComponent, ref } from 'vue'
import BaseSelect from '@/components/BaseSelect.vue'
import useFilterControls from '@/use/useFilterControls'
import {
  territoriesParentFilter,
  territoriesTypesFilter,
  territoriesGroupFilter
} from '@/stores/filterStoreFactory'
import api from '@/api/index'
import { useFetchData } from '@/use/useFetchData'
import useFilterDataSources from '@/use/useFilterDataSources'
import { Section } from '@/types/types'


export default defineComponent({
  name: 'TerritoriesSelect',
  components: {
    BaseSelect
  },
  setup() {
    const {
      territoriesFilterStore,
      territoriesFilterValue,
      selectDataTerritories,
      currentPageTerritories,
      searchQueryTerritories,
      fetchDataTerritories
    } = useFilterDataSources()

    const territoriesParentFilterStore = territoriesParentFilter()
    const territoriesParentFilterValue = ref(territoriesParentFilterStore.value)
    const selectDataTerritoriesParent = ref<any[]>([])
    const currentPageTerritoriesParent = ref<number>(1)
    const sizePageTerritoriesParent = ref<number>(25)
    const searchQueryTerritoriesParent = ref<string>('')

    const territoriesTypesFilterStore = territoriesTypesFilter()
    const territoriesTypesFilterValue = ref(territoriesTypesFilterStore.value)
    const selectDataTerritoriesTypes = ref<any[]>([])

    const territoriesGroupFilterStore = territoriesGroupFilter()
    const territoriesGroupFilterValue = ref(territoriesGroupFilterStore.value)
    const selectDataTerritoriesGroup = ref<any[]>([])
    const currentPageTerritoriesGroup = ref<number>(1)
    const sizePageTerritoriesGroup = ref<number>(25)
    const searchQueryTerritoriesGroup = ref<string>('')

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

    const sections = ref<Section[]>([
      {
        title: 'ID',
        filter: territoriesFilterValue,
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
        filter: territoriesParentFilterValue,
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
        filter: territoriesTypesFilterValue,
        selectData: selectDataTerritoriesTypes,
        store: territoriesTypesFilterStore,
        fetchDataFunc: fetchDataTerritoriesTypes,
        label: 'name',
        isName: true
      },
      {
        title: 'ID группы',
        filter: territoriesGroupFilterValue,
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
})
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
