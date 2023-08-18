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
import { useEducationLevelsFilterStore, useSpecialtiesClassifiersFilterStore } from '@/stores/filterStoreFactory'
import api from '@/api/index'
import { useFetchData } from '@/use/useFetchData'
import { Section } from '@/types/types'


export default defineComponent({
  name: 'SpecialtiesSelect',
  components: {
    BaseSelect
  },
  setup() {
    const educationLevelsFilterStore = useEducationLevelsFilterStore()
    const educationLevelsFilter = ref(educationLevelsFilterStore.value)
    const selectDataEducationLevels = ref<any[]>([])

    const specialtiesClassifiersFilterStore = useSpecialtiesClassifiersFilterStore()
    const specialtiesClassifiersFilter = ref(specialtiesClassifiersFilterStore.value)
    const selectDataSpecialtiesClassifiers = ref<any[]>([])

    const fetchDataEducationLevels = useFetchData({
      apiCall: api.dataSelect.getEducationLevels,
      selectData: selectDataEducationLevels
    }).fetchData
    const fetchDataSpecialtiesClassifiers = useFetchData({
      apiCall: api.dataSelect.getSpecialtiesClassifiers,
      selectData: selectDataSpecialtiesClassifiers
    }).fetchData

    const sections = ref<Section[]>([
      {
        title: 'Уровень образования',
        filter: educationLevelsFilter,
        selectData: selectDataEducationLevels,
        store: educationLevelsFilterStore,
        fetchDataFunc: fetchDataEducationLevels,
        isName: false
      },
      {
        title: 'Классификатор',
        filter: specialtiesClassifiersFilter,
        selectData: selectDataSpecialtiesClassifiers,
        store: specialtiesClassifiersFilterStore,
        fetchDataFunc: fetchDataSpecialtiesClassifiers,
        label: 'name',
        isName: true
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
