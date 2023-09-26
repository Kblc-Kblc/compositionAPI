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
import { indicatorFilter } from '@/stores/filterStoreFactory'
import api from '@/api/index'
import { useFetchData } from '@/use/useFetchData'

export default {
  name: 'BaseIndicatorSelect',
  components: {
    BaseSelect
  },
  setup() {
    const indicatorFilterStore = indicatorFilter()
    const indicatorFilterValue = ref(indicatorFilterStore.value)
    const selectDataIndicators = ref([])
    const currentPageIndicators = ref(1)
    const sizePageIndicators = ref(25)
    const searchQueryIndicators = ref('')

    const fetchDataIndicators = useFetchData({
      apiCall: api.dataSelect.getIndicators,
      selectData: selectDataIndicators,
      currentPage: currentPageIndicators,
      pageSize: sizePageIndicators,
      searchQuery: searchQueryIndicators
    }).fetchData

    const section = ref({
      title: 'Показатель',
      filter: indicatorFilterValue,
      selectData: selectDataIndicators,
      currentPage: currentPageIndicators,
      store: indicatorFilterStore,
      searchQuery: searchQueryIndicators,
      fetchDataFunc: fetchDataIndicators,
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
