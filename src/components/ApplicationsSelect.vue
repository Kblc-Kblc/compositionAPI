<template>
  <div>
    <div v-for="(section, index) in sections" :key="index">
      <el-text size="large" class="label">{{ section.title }}</el-text>
      <base-select
        v-model="section.filter"
        :options="section.selectData"
        :is-name="section.isName"
        :label="section.label"
        :store-id="section.store"
        :tooltip="section.tooltip"
        :searchable="section.searchable"
        class="select-wrapper"
        @search-value="(e: string) => searchValue(e, section)"
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
import { realFilter } from '@/stores/filterStoreFactory'
import useFilterDataSources from '@/use/useFilterDataSources'
import { Section } from '@/types/types'

export default defineComponent({
  name: 'ApplicationsSelect',
  components: {
    BaseSelect
  },
  setup() {
    const {
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

      trainingFormsFilterStore,
      trainingFormsFilterValue,
      selectDataTrainingForms,
      fetchDataTrainingForms
    } = useFilterDataSources()

    const realFilterStore = realFilter()
    const realFilterValue = ref<any>(realFilterStore.value)
    const selectDataReal = ref<any[]>([
      { id: 'Все', name: 'Все' },
      { id: '1', name: 'True', icon: `Select` },
      { id: '0', name: 'False', icon: `CloseBold` }
    ])

    const sections = ref<Section[]>([
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
        title: 'Год',
        filter: periodFilterValue,
        selectData: selectDataPeriods,
        store: periodFilterStore,
        fetchDataFunc: fetchDataPeriods,
        isName: false
      },
      {
        title: 'Форма обучения',
        filter: trainingFormsFilterValue,
        selectData: selectDataTrainingForms,
        store: trainingFormsFilterStore,
        fetchDataFunc: fetchDataTrainingForms,
        isName: false
      },
      {
        title: 'Настоящая',
        filter: realFilterValue,
        selectData: selectDataReal,
        store: realFilterStore,
        fetchDataFunc: null,
        staticData: true,
        label: 'name'
      }
    ])

    const { loading, closeSelect, searchValue, loadMoreData, handleUpdateStore, handleOpenSelect } =
      useFilterControls(sections.value)

    return {
      loading,
      searchValue,
      loadMoreData,
      closeSelect,
      handleUpdateStore,
      sections,
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
