<template>
  <div>
    <el-container direction="vertical" class="filter-container">
      <div class="title-wrapper">
        <h2 size="large">Фильтры</h2>
      </div>
      <status-indicators-select-wrapper></status-indicators-select-wrapper>
    </el-container>
  </div>
</template>

<script>
import StatusIndicatorsSelectWrapper from '@/components/StatusIndicatorsSelectWrapper.vue'

export default {
  name: 'StatusIndicators',
  components: {
    StatusIndicatorsSelectWrapper
  }
}
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
