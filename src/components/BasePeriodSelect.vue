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
import { periodFilter } from '@/stores/filterStoreFactory'
import api from '@/api/index'
import { useFetchData } from '@/use/useFetchData'

export default {
  name: 'BasePeriodSelect',
  components: {
    BaseSelect
  },
  setup() {
    const periodFilterStore = periodFilter()
    const periodFilterValue = ref(periodFilterStore.value)
    const selectDataPeriods = ref([])

    const fetchDataPeriods = useFetchData({
      apiCall: api.dataSelect.getPeriods,
      selectData: selectDataPeriods
    }).fetchData

    const section = ref({
      title: 'Год',
      filter: periodFilterValue,
      selectData: selectDataPeriods,
      store: periodFilterStore,
      fetchDataFunc: fetchDataPeriods,
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
