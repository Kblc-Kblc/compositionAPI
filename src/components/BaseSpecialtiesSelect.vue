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
import { specialtiesFilter } from '@/stores/filterStoreFactory'
import api from '@/api/index'
import { useFetchData } from '@/use/useFetchData'

export default {
  name: 'BaseSpecialtiesSelect',
  components: {
    BaseSelect
  },
  setup() {
    const specialtiesFilterStore = specialtiesFilter()
    const specialtiesFilterValue = ref(specialtiesFilterStore.value)
    const selectDataSpecialties = ref([])
    const currentPageSpecialties = ref(1)
    const sizePageSpecialties = ref(25)
    const searchQuerySpecialties = ref('')

    const fetchDataSpecialties = useFetchData({
      apiCall: api.dataSelect.getSpecialties,
      selectData: selectDataSpecialties,
      currentPage: currentPageSpecialties,
      pageSize: sizePageSpecialties,
      searchQuery: searchQuerySpecialties
    }).fetchData

    const section = ref({
      title: 'Специальность',
      filter: specialtiesFilterValue,
      selectData: selectDataSpecialties,
      currentPage: currentPageSpecialties,
      store: specialtiesFilterStore,
      searchQuery: searchQuerySpecialties,
      fetchDataFunc: fetchDataSpecialties,
      isName: false,
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
