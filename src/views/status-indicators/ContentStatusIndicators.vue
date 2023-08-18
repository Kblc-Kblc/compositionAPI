<template>
  <BaseTable :table-data="tableData" :total="total" :loading="loading" @fetch-data="fetchData" @sort="handleSortChange">
    <el-table-column prop="indicator_id" label="Показатель" sortable="custom"> </el-table-column>
    <el-table-column prop="training_form_id" label="Форма обучения" sortable="custom"> </el-table-column>
    <el-table-column prop="year" label="Год" sortable="custom"> </el-table-column>
    <el-table-column prop="step_id" label="Шаг" sortable="custom"> </el-table-column>
    <el-table-column label="Статус" sortable="custom">
      <template #default="scope">
        <el-icon v-if="scope.row.uploaded"><Select /></el-icon>
        <el-icon v-else><CloseBold /></el-icon>
      </template>
    </el-table-column>
  </BaseTable>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useBaseTable from '@/use/useBaseTable'
import BaseTable from '@/components/BaseTable.vue'
import {
  useIndicatorFilterStore,
  useTrainingFormsFilterStore,
  usePeriodFilterStore,
  useStepsFilterStore,
  useUploadedFilterStore
} from '@/stores/filterStoreFactory'
import { Select, CloseBold } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'ContentStatusIndicators',
  components: {
    BaseTable,
    Select,
    CloseBold
  },
  setup() {
    const filtersConfig = {
      indicator_id: useIndicatorFilterStore(),
      year: usePeriodFilterStore(),
      step_id: useStepsFilterStore(),
      uploaded: useUploadedFilterStore(),
      training_form_id: useTrainingFormsFilterStore()
    }

    const useBaseTableResult = useBaseTable(filtersConfig, 'getDataStates')

    return {
      ...useBaseTableResult
    }
  }
})
</script>
