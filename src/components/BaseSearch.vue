<template>
  <el-input :model-value="modelValue" class="search" :placeholder="placeholder" @update:modelValue="updateSearch">
    <template #prefix>
      <el-icon class="el-input__icon"><Search /></el-icon>
    </template>
  </el-input>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Search } from '@element-plus/icons-vue';

export default defineComponent({
  name: 'BaseSearch',
  components: {
    Search
  },
  props: {
    modelValue: String as PropType<string>,
      resetSearch: Function as PropType<() => void>,
    placeholder: String as PropType<string>
  },
  watch: {
    resetSearch: {
      handler() {
        this.$emit('update:modelValue', '');
      },
      immediate: true
    }
  },
  methods: {
    updateSearch(newSearch: string) {
      this.$emit('update:modelValue', newSearch);
    }
  }
});
</script>

