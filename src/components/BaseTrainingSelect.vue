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
import { trainingFormsFilter } from '@/stores/filterStoreFactory'
import api from '@/api/index'
import { useFetchData } from '@/use/useFetchData'

export default {
  name: 'BaseTrainingSelect',
  components: {
    BaseSelect
  },
  setup() {
    const trainingFormsFilterStore = trainingFormsFilter()
    const trainingFormsFilterValue = ref(trainingFormsFilterStore.value)
    const selectDataTrainingForms = ref([])

    const fetchDataTrainingForms = useFetchData({
      apiCall: api.dataSelect.getTrainingForms,
      selectData: selectDataTrainingForms
    }).fetchData

    const section = ref({
      title: 'Форма обучения',
      filter: trainingFormsFilterValue,
      selectData: selectDataTrainingForms,
      store: trainingFormsFilterStore,
      fetchDataFunc: fetchDataTrainingForms,
      isName: false
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
