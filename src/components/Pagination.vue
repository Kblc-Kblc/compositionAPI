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

<script>
export default {
  name: 'Pagination',
  props: ['currentPage', 'pageSize', 'total', 'handleSizeChange', 'handleCurrentChange', 'pageSizes']
}
</script>

<style lang="scss" scoped>
.el-pagination {
  padding-top: 1rem;
  :deep(.is-last) {
    margin-left: auto;
  }
}
</style>
