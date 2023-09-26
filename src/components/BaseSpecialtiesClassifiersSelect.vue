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
import { specialtiesClassifiersFilter } from '@/stores/filterStoreFactory'
import api from '@/api/index'
import { useFetchData } from '@/use/useFetchData'

export default {
  name: 'BaseSpecialtiesClassifiersSelect',
  components: {
    BaseSelect
  },
  setup() {
    const specialtiesClassifiersFilterStore = specialtiesClassifiersFilter()
    const specialtiesClassifiersFilterValue = ref(specialtiesClassifiersFilterStore.value)
    const selectDataSpecialtiesClassifiers = ref([])

    const fetchDataSpecialtiesClassifiers = useFetchData({
      apiCall: api.dataSelect.getSpecialtiesClassifiers,
      selectData: selectDataSpecialtiesClassifiers
    }).fetchData

    const section = ref({
      title: 'Классификатор',
      filter: specialtiesClassifiersFilterValue,
      selectData: selectDataSpecialtiesClassifiers,
      store: specialtiesClassifiersFilterStore,
      fetchDataFunc: fetchDataSpecialtiesClassifiers,
      label: 'name',
      isName: true
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
