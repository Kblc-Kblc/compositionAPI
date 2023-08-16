<template>
  <div class="table-wrapper">
    <el-table
      v-loading="loading"
      class="table"
      :data="tableData"
      style="width: 100%"
      stripe
      @sort-change="handleSortChange"
    >
      <slot></slot>
    </el-table>
    <Pagination
      :current-page="currentPage"
      :page-sizes="[25, 50, 100]"
      :page-size="pageSize"
      :total="total"
      :handle-size-change="handleSizeChange"
      :handle-current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'BaseTable',
  components: {
    Pagination
  },
  props: {
    tableData: {
      type: Array,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const currentPage = ref(1)
    const pageSize = ref(25)

    const handleSizeChange = (newSize) => {
      pageSize.value = newSize
      emit('fetch-data', { currentPage: currentPage.value, pageSize: pageSize.value })
    }

    const handleCurrentChange = (newCurrentPage) => {
      currentPage.value = newCurrentPage
      emit('fetch-data', { currentPage: currentPage.value, pageSize: pageSize.value })
    }

    const handleSortChange = ({ prop, order }) => {
      emit('sort', { prop, order })
    }

    return {
      currentPage,
      pageSize,
      handleSizeChange,
      handleCurrentChange,
      handleSortChange
    }
  }
}
</script>

<style scoped>
.table-wrapper {
  height: 100%;
  max-height: calc(100% - 48px);
}
.table {
  height: 100%;
}
</style>
