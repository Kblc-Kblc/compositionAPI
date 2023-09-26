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
import { organizationsHeadFilter } from '@/stores/filterStoreFactory'
import api from '@/api/index'
import { useFetchData } from '@/use/useFetchData'

export default {
  name: 'BaseOrganizationsHeadSelect',
  components: {
    BaseSelect
  },
  setup() {
    const organizationsHeadFilterStore = organizationsHeadFilter()
    const organizationsHeadFilterValue = ref(organizationsHeadFilterStore.value)
    const selectDataOrganizationsHead = ref([])
    const currentPageOrganizationsHead = ref(1)
    const sizePageOrganizationsHead = ref(25)
    const searchQueryOrganizationsHead = ref('')

    const fetchDataOrganizationsHead = useFetchData({
      apiCall: api.dataSelect.getOrganizationsHead,
      selectData: selectDataOrganizationsHead,
      currentPage: currentPageOrganizationsHead,
      pageSize: sizePageOrganizationsHead,
      searchQuery: searchQueryOrganizationsHead
    }).fetchData

    const section = ref({
      title: 'ID головы',
      filter: organizationsHeadFilterValue,
      selectData: selectDataOrganizationsHead,
      currentPage: currentPageOrganizationsHead,
      store: organizationsHeadFilterStore,
      searchQuery: searchQueryOrganizationsHead,
      fetchDataFunc: fetchDataOrganizationsHead,
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
