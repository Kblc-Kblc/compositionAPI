<template>
  <div>
    <div v-for="(section, index) in sections" :key="index">
      <el-text size="large" class="label">{{ section.title }}</el-text>
      <base-select
        v-model="section.filter"
        :options="section.selectData"
        :is-name="section.isName"
        :label="section.label"
        :tooltip="section.tooltip"
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
import { defineComponent, ref } from 'vue';
import BaseSelect from '@/components/BaseSelect.vue';
import useFilterControls from '@/use/useFilterControls';

import { organizationsHeadFilter, organizationsTypesFilter } from '@/stores/filterStoreFactory';
import api from '@/api/index';
import { useFetchData } from '@/use/useFetchData';
import useFilterDataSources from '@/use/useFilterDataSources';
import { Section } from '@/types/types'


export default defineComponent({
  name: 'OrganizationsSelect',
  components: {
    BaseSelect
  },

  setup() {
    const {
      organizationsFilterStore,
      organizationsFilterValue,
      selectDataOrganizations,
      currentPageOrganizations,
      searchQueryOrganizations,
      fetchDataOrganizations,

      territoriesFilterStore,
      territoriesFilterValue,
      selectDataTerritories,
      currentPageTerritories,
      searchQueryTerritories,
      fetchDataTerritories
    } = useFilterDataSources()

    const organizationsHeadFilterStore = organizationsHeadFilter();
    const organizationsHeadFilterValue = ref(organizationsHeadFilterStore.value);
    const selectDataOrganizationsHead = ref<any[]>([]);
    const currentPageOrganizationsHead = ref<number>(1);
    const sizePageOrganizationsHead = ref<number>(25);
    const searchQueryOrganizationsHead = ref<string>('');

    const organizationsTypesFilterStore = organizationsTypesFilter();
    const organizationsTypesFilterValue = ref(organizationsTypesFilterStore.value);
    const selectDataOrganizationsTypes = ref<any[]>([]);

    const fetchDataOrganizationsHead = useFetchData({
      apiCall: api.dataSelect.getOrganizationsHead,
      selectData: selectDataOrganizationsHead,
      currentPage: currentPageOrganizationsHead,
      pageSize: sizePageOrganizationsHead,
      searchQuery: searchQueryOrganizationsHead
    }).fetchData

    const fetchDataOrganizationsTypes = useFetchData({
      apiCall: api.dataSelect.getOrganizationsTypes,
      selectData: selectDataOrganizationsTypes
    }).fetchData

    const sections = ref<Section[]>([
      {
        title: 'ID',
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
        title: 'ID головы',
        filter: organizationsHeadFilterValue,
        selectData: selectDataOrganizationsHead,
        currentPage: currentPageOrganizationsHead,
        store: organizationsHeadFilterStore,
        searchQuery: searchQueryOrganizationsHead,
        fetchDataFunc: fetchDataOrganizationsHead,
        tooltip: true,
        searchable: true
      },
      {
        title: 'Тип',
        filter: organizationsTypesFilterValue,
        selectData: selectDataOrganizationsTypes,
        store: organizationsTypesFilterStore,
        fetchDataFunc: fetchDataOrganizationsTypes,
        label: 'name',
        isName: true
      },
      {
        title: 'Территория',
        filter: territoriesFilterValue,
        selectData: selectDataTerritories,
        currentPage: currentPageTerritories,
        store: territoriesFilterStore,
        searchQuery: searchQueryTerritories,
        fetchDataFunc: fetchDataTerritories,
        tooltip: true,
        searchable: true
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
