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

<script lang="ts">
import { ref, defineComponent, PropType } from 'vue';
import Pagination from '@/components/Pagination.vue';

export default defineComponent({
  name: 'BaseTable',
  components: {
    Pagination
  },
  props: {
    tableData: {
      type: Array as PropType<any[]>,
      required: true
    },
    total: {
      type: Number as PropType<number>,
      required: true
    },
    loading: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup(props, { emit }) {
    const currentPage = ref(1);
    const pageSize = ref(25);

    const handleSizeChange = (newSize: number) => {
      pageSize.value = newSize;
      emit('fetch-data', { currentPage: currentPage.value, pageSize: pageSize.value });
    }

    const handleCurrentChange = (newCurrentPage: number) => {
      currentPage.value = newCurrentPage;
      emit('fetch-data', { currentPage: currentPage.value, pageSize: pageSize.value });
    }

    const handleSortChange = ({ prop, order }: { prop: string; order: string }) => {
      emit('sort', { prop, order });
    }

    return {
      currentPage,
      pageSize,
      handleSizeChange,
      handleCurrentChange,
      handleSortChange
    }
  }
});
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
