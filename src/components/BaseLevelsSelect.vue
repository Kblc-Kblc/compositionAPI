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
import { educationLevelsFilter } from '@/stores/filterStoreFactory'
import api from '@/api/index'
import { useFetchData } from '@/use/useFetchData'

export default {
  name: 'BaseLevelsSelect',
  components: {
    BaseSelect
  },
  setup() {
    const educationLevelsFilterStore = educationLevelsFilter()
    const educationLevelsFilterValue = ref(educationLevelsFilterStore.value)
    const selectDataEducationLevels = ref([])

    const fetchDataEducationLevels = useFetchData({
      apiCall: api.dataSelect.getEducationLevels,
      selectData: selectDataEducationLevels
    }).fetchData

    const section = ref({
      title: 'Уровень образования',
      filter: educationLevelsFilterValue,
      selectData: selectDataEducationLevels,
      store: educationLevelsFilterStore,
      fetchDataFunc: fetchDataEducationLevels,
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
