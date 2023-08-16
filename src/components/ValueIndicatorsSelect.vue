<template>
  <div>
    <div v-for="(section, index) in sections" :key="index" class="section-wrapper">
      <el-text size="large" class="label">{{ section.title }}</el-text>
      <base-select
        v-model="section.filter"
        :options="section.selectData"
        :is-name="section.isName"
        :label="section.label"
        :tooltip="section.tooltip"
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
import useFilterDataSources from '@/use/useFilterDataSources'

import { useStatusesFilterStore } from '@/stores/filterStoreFactory'
import api from '@/api/index'
import { useFetchData } from '@/use/useFetchData'

export default {
  name: 'ValueIndicatorsSelect',
  components: {
    BaseSelect
  },
  setup() {
    const {
      indicatorFilterStore,
      indicatorFilter,
      selectDataIndicators,
      currentPageIndicators,
      fetchDataIndicators,
      searchQueryIndicators,

      periodFilterStore,
      periodFilter,
      selectDataPeriods,
      fetchDataPeriods,

      specialtiesFilterStore,
      specialtiesFilter,
      selectDataSpecialties,
      currentPageSpecialties,
      searchQuerySpecialties,
      fetchDataSpecialties,

      organizationsFilterStore,
      organizationsFilter,
      selectDataOrganizations,
      currentPageOrganizations,
      searchQueryOrganizations,
      fetchDataOrganizations,

      territoriesFilterStore,
      territoriesFilter,
      selectDataTerritories,
      currentPageTerritories,
      searchQueryTerritories,
      fetchDataTerritories,

      stepsFilterStore,
      stepsFilter,
      selectDataSteps,
      fetchDataSteps,

      trainingFormsFilterStore,
      trainingFormsFilter,
      selectDataTrainingForms,
      fetchDataTrainingForms
    } = useFilterDataSources()

    const statusesFilterStore = useStatusesFilterStore()
    const statusesFilter = ref(statusesFilterStore.value)
    const selectDataStatuses = ref([])

    const fetchDataStatuses = useFetchData({
      apiCall: api.dataSelect.getStatuses,
      selectData: selectDataStatuses
    }).fetchData

    const sections = ref([
      {
        title: 'Показатель',
        filter: indicatorFilter,
        selectData: selectDataIndicators,
        currentPage: currentPageIndicators,
        store: indicatorFilterStore,
        searchQuery: searchQueryIndicators,
        fetchDataFunc: fetchDataIndicators,
        isName: false,
        searchable: true
      },
      {
        title: 'Год',
        filter: periodFilter,
        selectData: selectDataPeriods,
        store: periodFilterStore,
        fetchDataFunc: fetchDataPeriods,
        isName: false
      },
      {
        title: 'Специальность',
        filter: specialtiesFilter,
        selectData: selectDataSpecialties,
        currentPage: currentPageSpecialties,
        store: specialtiesFilterStore,
        searchQuery: searchQuerySpecialties,
        fetchDataFunc: fetchDataSpecialties,
        isName: false,
        searchable: true
      },
      {
        title: 'Организация',
        filter: organizationsFilter,
        selectData: selectDataOrganizations,
        currentPage: currentPageOrganizations,
        store: organizationsFilterStore,
        searchQuery: searchQueryOrganizations,
        fetchDataFunc: fetchDataOrganizations,
        tooltip: true,
        searchable: true
      },
      {
        title: 'Территория',
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
        title: 'Шаг расчета',
        filter: stepsFilter,
        selectData: selectDataSteps,
        store: stepsFilterStore,
        fetchDataFunc: fetchDataSteps,
        isName: false
      },
      {
        title: 'Статус',
        filter: statusesFilter,
        selectData: selectDataStatuses,
        store: statusesFilterStore,
        fetchDataFunc: fetchDataStatuses,
        isName: false
      },
      {
        title: 'Форма обучения',
        filter: trainingFormsFilter,
        selectData: selectDataTrainingForms,
        store: trainingFormsFilterStore,
        fetchDataFunc: fetchDataTrainingForms,
        isName: false
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
