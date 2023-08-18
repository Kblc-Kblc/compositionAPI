<template>
  <div>
    <el-container direction="vertical" class="filter-container">
      <div class="title-wrapper">
        <h2 size="large">Поиск</h2>
      </div>
      <base-search
        v-model="search.value"
        :reset-search="resetSearch"
        placeholder="Поиск по названию или ID"
        @update:modelValue="updateSearch"
      ></base-search>
    </el-container>

    <el-container direction="vertical" class="filter-container">
      <div class="title-wrapper">
        <h2 size="large">Фильтры</h2>
      </div>
      <specialties-select></specialties-select>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SpecialtiesSelect from '@/components/SpecialtiesSelect.vue'
import BaseSearch from '@/components/BaseSearch.vue'
import useSearch from '@/use/useSearch'

export default defineComponent({
  name: 'Specialties',
  components: {
    SpecialtiesSelect,
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

.search {
  padding-bottom: 1.5rem;
}
</style>
