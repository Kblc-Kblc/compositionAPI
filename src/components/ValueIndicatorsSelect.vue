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

<script lang="ts">
import { defineComponent, ref } from 'vue'
import BaseSelect from '@/components/BaseSelect.vue'
import useFilterControls from '@/use/useFilterControls'
import useFilterDataSources from '@/use/useFilterDataSources'
import { statusesFilter } from '@/stores/filterStoreFactory'
import api from '@/api/index'
import { useFetchData } from '@/use/useFetchData'
import { Section } from '@/types/types'


export default defineComponent({
  name: 'ValueIndicatorsSelect',
  components: {
    BaseSelect
  },
  setup() {
    const {
      indicatorFilterStore,
      indicatorFilterValue,
      selectDataIndicators,
      currentPageIndicators,
      fetchDataIndicators,
      searchQueryIndicators,

      periodFilterStore,
      periodFilterValue,
      selectDataPeriods,
      fetchDataPeriods,

      specialtiesFilterStore,
      specialtiesFilterValue,
      selectDataSpecialties,
      currentPageSpecialties,
      searchQuerySpecialties,
      fetchDataSpecialties,

      organizationsFilterStore,
      organizationsFilterValue,
      selectDataOrganizations,
      currentPageOrganizations,
      searchQueryOrganizations,
      fetchDataOrganizations,

      territoriesFilterStore,
      territoriesFilterValue,
      selectDataTerritories,
      currentPageTerritories,
      searchQueryTerritories,
      fetchDataTerritories,

      stepsFilterStore,
      stepsFilterValue,
      selectDataSteps,
      fetchDataSteps,

      trainingFormsFilterStore,
      trainingFormsFilterValue,
      selectDataTrainingForms,
      fetchDataTrainingForms
    } = useFilterDataSources()

    const statusesFilterStore = statusesFilter()
    const statusesFilterValue = ref(statusesFilterStore.value)
    const selectDataStatuses = ref<any[]>([])

    const fetchDataStatuses = useFetchData({
      apiCall: api.dataSelect.getStatuses,
      selectData: selectDataStatuses
    }).fetchData

    const sections = ref<Section[]>([
      {
        title: 'Показатель',
        filter: indicatorFilterValue,
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
        filter: periodFilterValue,
        selectData: selectDataPeriods,
        store: periodFilterStore,
        fetchDataFunc: fetchDataPeriods,
        isName: false
      },
      {
        title: 'Специальность',
        filter: specialtiesFilterValue,
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
        filter: organizationsFilterValue,
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
        title: 'Шаг расчета',
        filter: stepsFilterValue,
        selectData: selectDataSteps,
        store: stepsFilterStore,
        fetchDataFunc: fetchDataSteps,
        isName: false
      },
      {
        title: 'Статус',
        filter: statusesFilterValue,
        selectData: selectDataStatuses,
        store: statusesFilterStore,
        fetchDataFunc: fetchDataStatuses,
        isName: false
      },
      {
        title: 'Форма обучения',
        filter: trainingFormsFilterValue,
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
