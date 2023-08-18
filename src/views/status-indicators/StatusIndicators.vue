<template>
  <div>
    <el-container direction="vertical" class="filter-container">
      <div class="title-wrapper">
        <h2 size="large">Фильтры</h2>
      </div>
      <status-indicators-select></status-indicators-select>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import StatusIndicatorsSelect from '@/components/StatusIndicatorsSelect.vue'

export default defineComponent({
  name: 'StatusIndicators',
  components: {
    StatusIndicatorsSelect
  }
})
</script>

<style scoped>
.select-wrapper {
  padding-bottom: 1.5rem;
}

.title-wrapper {
  padding: 1rem 0;
  color: var(--el-text-color-primary);
}

.filter-container {
  padding: 0 2rem;
}
</style>
