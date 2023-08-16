<template>
  <div>
    <el-container direction="vertical" class="filter-container">
      <div class="title-wrapper">
        <h2 size="large">Фильтры</h2>
      </div>

      <applications-select></applications-select>
    </el-container>
  </div>
</template>

<script>
import ApplicationsSelect from '@/components/ApplicationsSelect.vue'

export default {
  name: 'Applications',
  components: {
    ApplicationsSelect
  }
}
</script>

<style scoped>
.title-wrapper {
  padding: 1rem 0;
  color: var(--el-text-color-primary);
}

.filter-container {
  padding: 0 2rem;
}
</style>
