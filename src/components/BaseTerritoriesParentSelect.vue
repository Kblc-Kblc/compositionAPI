<template>
  <div class="section-wrapper">
    <el-text size="large" class="label">{{ section.title }}</el-text>
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
import { territoriesParentFilter } from '@/stores/filterStoreFactory'
import api from '@/api/index'
import { useFetchData } from '@/use/useFetchData'

export default {
  name: 'BaseTerritoriesParentSelect',
  components: {
    BaseSelect
  },
  setup() {
    const territoriesParentFilterStore = territoriesParentFilter()
    const territoriesParentFilterValue = ref(territoriesParentFilterStore.value)
    const selectDataTerritoriesParent = ref([])
    const currentPageTerritoriesParent = ref(1)
    const sizePageTerritoriesParent = ref(25)
    const searchQueryTerritoriesParent = ref('')

    const fetchDataTerritoriesParent = useFetchData({
      apiCall: api.dataSelect.getTerritories,
      selectData: selectDataTerritoriesParent,
      currentPage: currentPageTerritoriesParent,
      pageSize: sizePageTerritoriesParent,
      searchQuery: searchQueryTerritoriesParent
    }).fetchData

    const section = ref({
      title: 'ID родителя',
      filter: territoriesParentFilterValue,
      selectData: selectDataTerritoriesParent,
      currentPage: currentPageTerritoriesParent,
      store: territoriesParentFilterStore,
      searchQuery: searchQueryTerritoriesParent,
      fetchDataFunc: fetchDataTerritoriesParent,
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
