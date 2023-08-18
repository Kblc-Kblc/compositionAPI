<template>
  <BaseTable :table-data="tableData" :total="total" :loading="loading" @fetch-data="fetchData" @sort="handleSortChange">
    <el-table-column prop="id" label="ID" sortable="custom"> </el-table-column>
    <el-table-column prop="name" label="Название" sortable="custom"> </el-table-column>
    <el-table-column prop="head_organization_id" label="ID головы" sortable="custom"> </el-table-column>
    <el-table-column prop="type.name" label="Тип" sortable="custom"> </el-table-column>
    <el-table-column prop="territory_id" label="Территория" sortable="custom"> </el-table-column>
  </BaseTable>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import useBaseTable from '@/use/useBaseTable'
import BaseTable from '@/components/BaseTable.vue'
import { useSearchFilterStore } from '@/stores/searchFilter'

import {
  useOrganizationsFilterStore,
  useOrganizationsHeadFilterStore,
  useOrganizationsTypesFilterStore,
  useTerritoriesFilterStore
} from '@/stores/filterStoreFactory'

export default defineComponent({
  name: 'ContentOrganizations',
  components: {
    BaseTable
  },
  setup() {
    const searchFilterStore = useSearchFilterStore()

    const filtersConfig = {
      id: useOrganizationsFilterStore(),
      head_id: useOrganizationsHeadFilterStore(),
      type_id: useOrganizationsTypesFilterStore(),
      territory_id: useTerritoriesFilterStore(),
      search: computed(() => searchFilterStore.debouncedSearch)
    }

    const useBaseTableResult = useBaseTable(filtersConfig, 'getDataOrganizations')

    return {
      ...useBaseTableResult
    }
  }
})
</script>
