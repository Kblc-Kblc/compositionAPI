<template>
  <el-input :model-value="modelValue" class="search" :placeholder="placeholder" @update:modelValue="updateSearch">
    <template #prefix>
      <el-icon class="el-input__icon"><Search /></el-icon>
    </template>
  </el-input>
</template>

<script>
import { Search } from '@element-plus/icons-vue'

export default {
  name: 'BaseSearch',
  components: {
    Search
  },
  props: ['modelValue', 'resetSearch', 'placeholder'],
  watch: {
    resetSearch: {
      handler() {
        this.$emit('update:modelValue', '')
      },
      immediate: true
    }
  },
  methods: {
    updateSearch(newSearch) {
      this.$emit('update:modelValue', newSearch)
    }
  }
}
</script>
