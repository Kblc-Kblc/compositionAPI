<template>
  <BaseTable :table-data="tableData" :total="total" :loading="loading" @fetch-data="fetchData" @sort="handleSortChange">
    <el-table-column prop="id" label="ID" sortable="custom"> </el-table-column>
    <el-table-column prop="name" label="Название" sortable="custom"> </el-table-column>
    <el-table-column prop="parent_id" label="ID родителя" sortable="custom"> </el-table-column>
    <el-table-column prop="type.name" label="Тип" sortable="custom"> </el-table-column>
    <el-table-column prop="territory.name" label="ID группы" sortable="custom"> </el-table-column>
  </BaseTable>
</template>

<script>
import { computed } from 'vue'
import useBaseTable from '@/use/useBaseTable'
import BaseTable from '@/components/BaseTable.vue'
import { useSearchFilterStore } from '@/stores/searchFilter'
import {
  territoriesFilter,
  territoriesParentFilter,
  territoriesTypesFilter,
  territoriesGroupFilter
} from '@/stores/filterStoreFactory'

export default {
  name: 'ContentTerritories',
  components: {
    BaseTable
  },
  setup() {
    const searchFilterStore = useSearchFilterStore()
    const filtersConfig = {
      group_id: territoriesGroupFilter(),
      type_id: territoriesTypesFilter(),
      parent_id: territoriesParentFilter(),
      id: territoriesFilter(),
      search: computed(() => searchFilterStore.debouncedSearch)
    }

    const useBaseTableResult = useBaseTable(filtersConfig, 'getDataTerritories')

    return {
      ...useBaseTableResult
    }
  }
}
</script>
