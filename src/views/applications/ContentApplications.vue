<template>
  <BaseTable :table-data="tableData" :total="total" :loading="loading" @fetch-data="fetchData" @sort="handleSortChange">
    <el-table-column prop="specialty_id" label="Специальность" sortable="custom"></el-table-column>
    <el-table-column prop="organization_id" label="Организация" sortable="custom"> </el-table-column>
    <el-table-column prop="training_form_id" label="Форма обучения" sortable="custom"> </el-table-column>
    <el-table-column prop="year" label="Год" sortable="custom"> </el-table-column>
    <el-table-column prop="number" label="Номер пакета" sortable="custom"> </el-table-column>
    <el-table-column prop="min" label="Min" sortable="custom"> </el-table-column>
    <el-table-column prop="max" label="Max" sortable="custom"> </el-table-column>
    <el-table-column label="Настоящая" sortable="custom">
      <template #default="scope">
        <el-icon v-if="scope.row.real"><Select /></el-icon>
        <el-icon v-else><CloseBold /></el-icon>
      </template>
    </el-table-column>
  </BaseTable>
</template>

<script>
import useBaseTable from '@/use/useBaseTable'
import BaseTable from '@/components/BaseTable.vue'
import {
  periodFilter,
  specialtiesFilter,
  organizationsFilter,
  trainingFormsFilter,
  realFilter
} from '@/stores/filterStoreFactory'
import { Select, CloseBold } from '@element-plus/icons-vue'

export default {
  name: 'ContentApplications',
  components: {
    BaseTable,
    Select,
    CloseBold
  },
  setup() {
    const filtersConfig = {
      specialty_id: specialtiesFilter(),
      organization_id: organizationsFilter(),
      year: periodFilter(),
      training_form_id: trainingFormsFilter(),
      real: realFilter()
    }

    const useBaseTableResult = useBaseTable(filtersConfig, 'getDataApplications')

    return {
      ...useBaseTableResult
    }
  }
}
</script>
