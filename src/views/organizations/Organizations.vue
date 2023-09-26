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

      <organizations-select-wrapper></organizations-select-wrapper>
    </el-container>
  </div>
</template>

<script>
import OrganizationsSelectWrapper from '@/components/OrganizationsSelectWrapper.vue'
import BaseSearch from '@/components/BaseSearch.vue'
import useSearch from '@/use/useSearch'

export default {
  name: 'Organizations',
  components: {
    OrganizationsSelectWrapper,
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
