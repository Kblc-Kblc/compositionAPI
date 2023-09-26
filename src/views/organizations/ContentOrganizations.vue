<template>
  <BaseTable :table-data="tableData" :total="total" :loading="loading" @fetch-data="fetchData" @sort="handleSortChange">
    <el-table-column prop="id" label="ID" sortable="custom"> </el-table-column>
    <el-table-column prop="name" label="Название" sortable="custom"> </el-table-column>
    <el-table-column prop="head_organization_id" label="ID головы" sortable="custom"> </el-table-column>
    <el-table-column prop="type.name" label="Тип" sortable="custom"> </el-table-column>
    <el-table-column prop="territory_id" label="Территория" sortable="custom"> </el-table-column>
  </BaseTable>
</template>

<script>
import { computed } from 'vue'
import useBaseTable from '@/use/useBaseTable'
import BaseTable from '@/components/BaseTable.vue'
import { useSearchFilterStore } from '@/stores/searchFilter'

import {
  organizationsFilter,
  organizationsHeadFilter,
  organizationsTypesFilter,
  territoriesFilter
} from '@/stores/filterStoreFactory'

export default {
  name: 'ContentOrganizations',
  components: {
    BaseTable
  },
  setup() {
    const searchFilterStore = useSearchFilterStore()

    const filtersConfig = {
      id: organizationsFilter(),
      head_id: organizationsHeadFilter(),
      type_id: organizationsTypesFilter(),
      territory_id: territoriesFilter(),
      search: computed(() => searchFilterStore.debouncedSearch)
    }

    const useBaseTableResult = useBaseTable(filtersConfig, 'getDataOrganizations')

    return {
      ...useBaseTableResult
    }
  }
}
</script>
