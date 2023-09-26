<template>
  <div class="section-wrapper">
    <el-text size="large" class="label">{{ title }}</el-text>
    <base-select
      v-model="section.filter"
      :options="section.selectData"
      :is-name="section.isName"
      :label="section.label"
      :store-id="section.store"
      :searchable="section.searchable"
      :tooltip="section.tooltip"
      class="select-wrapper"
      @search-value="(e) => searchValue(e, section)"
      @load-more-data="() => loadMoreData(section)"
      @update-store="handleUpdateStore"
      @close-select="() => closeSelect(section)"
      @open-select="() => handleOpenSelect(section)"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import BaseSelect from '@/components/BaseSelect.vue'
import useFilterControls from '@/use/useFilterControls'
import { territoriesFilter } from '@/stores/filterStoreFactory'
import api from '@/api/index'
import { useFetchData } from '@/use/useFetchData'

export default {
  name: 'BaseTerritoriesSelect',
  components: {
    BaseSelect
  },
  props: {
    title: {
      type: String,
      default: 'Территория'
    }
  },
  setup() {
    const territoriesFilterStore = territoriesFilter()
    const territoriesFilterValue = ref(territoriesFilterStore.value)
    const selectDataTerritories = ref([])
    const currentPageTerritories = ref(1)
    const sizePageTerritories = ref(25)
    const searchQueryTerritories = ref('')

    const fetchDataTerritories = useFetchData({
      apiCall: api.dataSelect.getTerritories,
      selectData: selectDataTerritories,
      currentPage: currentPageTerritories,
      pageSize: sizePageTerritories,
      searchQuery: searchQueryTerritories
    }).fetchData

    const section = ref({
      filter: territoriesFilterValue,
      selectData: selectDataTerritories,
      currentPage: currentPageTerritories,
      store: territoriesFilterStore,
      searchQuery: searchQueryTerritories,
      fetchDataFunc: fetchDataTerritories,
      tooltip: true,
      searchable: true
    })

    const { closeSelect, searchValue, loadMoreData, handleUpdateStore, handleOpenSelect } = useFilterControls([section])

    return {
      section,
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
.label {
  display: block;
  padding: 0px 0px 0.5rem 0px;
}
</style>
