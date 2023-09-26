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
import { territoriesGroupFilter } from '@/stores/filterStoreFactory'
import api from '@/api/index'
import { useFetchData } from '@/use/useFetchData'

export default {
  name: 'BaseTerritoriesGroupSelect',
  components: {
    BaseSelect
  },
  setup() {
    const territoriesGroupFilterStore = territoriesGroupFilter()
    const territoriesGroupFilterValue = ref(territoriesGroupFilterStore.value)
    const selectDataTerritoriesGroup = ref([])
    const currentPageTerritoriesGroup = ref(1)
    const sizePageTerritoriesGroup = ref(25)
    const searchQueryTerritoriesGroup = ref('')

    const fetchDataTerritoriesGroup = useFetchData({
      apiCall: api.dataSelect.getTerritoriesGroup,
      selectData: selectDataTerritoriesGroup,
      currentPage: currentPageTerritoriesGroup,
      pageSize: sizePageTerritoriesGroup,
      searchQuery: searchQueryTerritoriesGroup
    }).fetchData

    const section = ref({
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
