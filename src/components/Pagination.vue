<template>
  <el-pagination
    :current-page="currentPage"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    layout="prev, pager, next, sizes"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  >
  </el-pagination>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Pagination',
  props: {
    currentPage: Number,
    pageSize: Number,
    total: Number,
    handleSizeChange: Function,
    handleCurrentChange: Function,
    pageSizes: Array
  }
})
</script>

<style lang="scss" scoped>
.el-pagination {
  padding-top: 1rem;
  :deep(.is-last) {
    margin-left: auto;
  }
}
</style>
