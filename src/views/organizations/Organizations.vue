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

      <organizations-select></organizations-select>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import OrganizationsSelect from '@/components/OrganizationsSelect.vue'
import BaseSearch from '@/components/BaseSearch.vue'
import useSearch from '@/use/useSearch'

export default defineComponent({
  name: 'Organizations',
  components: {
    OrganizationsSelect,
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
