<template>
  <BaseTable :table-data="tableData" :total="total" :loading="loading" @fetch-data="fetchData" @sort="handleSortChange">
    <el-table-column prop="id" label="Код" sortable="custom"> </el-table-column>
    <el-table-column prop="level_id" label="Уровень образования" sortable="custom"> </el-table-column>
    <el-table-column prop="classifier_id" label="Классификатор" sortable="custom"> </el-table-column>
    <el-table-column prop="name" label="Название" sortable="custom"> </el-table-column>
  </BaseTable>
</template>

<script>
import { computed } from 'vue'
import useBaseTable from '@/use/useBaseTable'
import BaseTable from '@/components/BaseTable.vue'
import { useSearchFilterStore } from '@/stores/searchFilter'
import { educationLevelsFilter, specialtiesClassifiersFilter } from '@/stores/filterStoreFactory'

export default {
  name: 'ContentSpecialties',
  components: {
    BaseTable
  },
  setup() {
    const searchFilterStore = useSearchFilterStore()

    const filtersConfig = {
      level_id: educationLevelsFilter(),
      classifier_id: specialtiesClassifiersFilter(),
      search: computed(() => searchFilterStore.debouncedSearch)
    }

    const useBaseTableResult = useBaseTable(filtersConfig, 'getDataSpecialties')

    return {
      ...useBaseTableResult
    }
  }
}
</script>
