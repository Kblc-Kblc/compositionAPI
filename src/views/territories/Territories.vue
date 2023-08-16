<template>
  <div>
    <el-container direction="vertical" class="filter-container">
      <div class="title-wrapper">
        <h2 size="large">Поиск</h2>
      </div>
      <base-search
        v-model="search.value"
        :reset-search="resetSearch"
        placeholder="Поиск по названию"
        @update:modelValue="updateSearch"
      ></base-search>
    </el-container>

    <el-container direction="vertical" class="filter-container">
      <div class="title-wrapper">
        <h2 size="large">Фильтры</h2>
      </div>
      <territories-select></territories-select>
    </el-container>
  </div>
</template>

<script>
import TerritoriesSelect from '@/components/TerritoriesSelect.vue'
import BaseSearch from '@/components/BaseSearch.vue'
import useSearch from '@/use/useSearch'

export default {
  name: 'Territories',
  components: {
    TerritoriesSelect,
    BaseSearch
  },
  setup() {
    const { search, updateSearch, resetSearch } = useSearch()

    return {
      search,
      updateSearch,
      resetSearch
    }
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

.search {
  padding-bottom: 1.5rem;
}
</style>
