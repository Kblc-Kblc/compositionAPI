<template>
  <BaseTable :table-data="tableData" :total="total" :loading="loading" @fetch-data="fetchData" @sort="handleSortChange">
    <el-table-column prop="indicator_id" label="Показатель" sortable="custom"> </el-table-column>
    <el-table-column prop="specialty_id" label="Специальность" sortable="custom"> </el-table-column>
    <el-table-column prop="organization_id" label="Организация" sortable="custom"> </el-table-column>
    <el-table-column prop="training_form_id" label="Форма обучения" sortable="custom"> </el-table-column>
    <el-table-column prop="territory_id" label="Территория" sortable="custom"> </el-table-column>
    <el-table-column prop="year" label="Год" sortable="custom"> </el-table-column>
    <el-table-column prop="step_id" label="Шаг" sortable="custom"> </el-table-column>
    <el-table-column prop="value" label="Значение" sortable="custom"> </el-table-column>
  </BaseTable>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useBaseTable from '@/use/useBaseTable'
import BaseTable from '@/components/BaseTable.vue'
import {
  useIndicatorFilterStore,
  usePeriodFilterStore,
  useSpecialtiesFilterStore,
  useOrganizationsFilterStore,
  useTerritoriesFilterStore,
  useStepsFilterStore,
  useStatusesFilterStore,
  useTrainingFormsFilterStore
} from '@/stores/filterStoreFactory'

export default defineComponent({
  name: 'ContentValueIndicators',
  components: {
    BaseTable
  },
  setup() {
    const filtersConfig = {
      indicator_id: useIndicatorFilterStore(),
      year: usePeriodFilterStore(),
      specialty_id: useSpecialtiesFilterStore(),
      organization_id: useOrganizationsFilterStore(),
      territory_id: useTerritoriesFilterStore(),
      step_id: useStepsFilterStore(),
      status_id: useStatusesFilterStore(),
      training_form_id: useTrainingFormsFilterStore()
    }

    const useBaseTableResult = useBaseTable(filtersConfig, 'getDataIndicators')

    return {
      ...useBaseTableResult
    }
  }
})
</script>
