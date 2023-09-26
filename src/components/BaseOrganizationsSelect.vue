<template>
  <div class="section-wrapper">
    <el-text size="large" class="label">{{ title }}</el-text>
    <base-select
      v-model="section.filter"
      :options="section.selectData"
      :is-name="section.isName"
      :label="section.label"
      :store-id="section.store"
      :searchable="section.searchable"
      :tooltip="section.tooltip"
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
import { organizationsFilter } from '@/stores/filterStoreFactory'
import api from '@/api/index'
import { useFetchData } from '@/use/useFetchData'

export default {
  name: 'BaseOrganizationsSelect',
  components: {
    BaseSelect
  },
  props: {
    title: {
      type: String,
      default: 'Организация'
    }
  },
  setup() {
    const organizationsFilterStore = organizationsFilter()
    const organizationsFilterValue = ref(organizationsFilterStore.value)
    const selectDataOrganizations = ref([])
    const currentPageOrganizations = ref(1)
    const sizePageOrganizations = ref(25)
    const searchQueryOrganizations = ref('')

    const fetchDataOrganizations = useFetchData({
      apiCall: api.dataSelect.getOrganizations,
      selectData: selectDataOrganizations,
      currentPage: currentPageOrganizations,
      pageSize: sizePageOrganizations,
      searchQuery: searchQueryOrganizations
    }).fetchData

    const section = ref({
      filter: organizationsFilterValue,
      selectData: selectDataOrganizations,
      currentPage: currentPageOrganizations,
      store: organizationsFilterStore,
      searchQuery: searchQueryOrganizations,
      fetchDataFunc: fetchDataOrganizations,
      tooltip: true,
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
