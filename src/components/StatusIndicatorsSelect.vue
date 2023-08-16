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

import { useUploadedFilterStore } from '@/stores/filterStoreFactory'

import useFilterDataSources from '@/use/useFilterDataSources'

export default {
  name: 'StatusIndicatorsSelect',
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

      stepsFilterStore,
      stepsFilter,
      selectDataSteps,
      fetchDataSteps,

      trainingFormsFilterStore,
      trainingFormsFilter,
      selectDataTrainingForms,
      fetchDataTrainingForms
    } = useFilterDataSources()

    const uploadedFilterStore = useUploadedFilterStore()
    const uploadedFilter = ref(uploadedFilterStore.value)
    const selectDataUploaded = ref([
      { id: 'Все', name: 'Все' },
      { id: '1', name: 'True', icon: `Select` },
      { id: '0', name: 'False', icon: `CloseBold` }
    ])

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
        title: 'Шаг расчета',
        filter: stepsFilter,
        selectData: selectDataSteps,
        store: stepsFilterStore,
        fetchDataFunc: fetchDataSteps,
        isName: false
      },
      {
        title: 'Статус',
        filter: uploadedFilter,
        selectData: selectDataUploaded,
        store: uploadedFilterStore,
        fetchDataFunc: null,
        staticData: true,
        label: 'name'
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
