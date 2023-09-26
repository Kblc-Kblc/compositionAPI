<template>
  <div class="section-wrapper">
    <el-text size="large" class="label">{{ section.title }}</el-text>
    <base-select
      v-model="section.filter"
      :options="section.selectData"
      :is-name="section.isName"
      :label="section.label"
      :store-id="section.store"
      :searchable="section.searchable"
      class="select-wrapper"
      @search-value="(e) => searchValue(e, section)"
      @load-more-data="() => loadMoreData(section)"
      @update-store="handleUpdateStore"
      @close-select="() => closeSelect(section)"
      @open-select="() => handleOpenSelect(section)"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import BaseSelect from '@/components/BaseSelect.vue'
import useFilterControls from '@/use/useFilterControls'
import { uploadedFilter } from '@/stores/filterStoreFactory'

export default {
  name: 'BaseUploadedSelect',
  components: {
    BaseSelect
  },
  setup() {
    const uploadedFilterStore = uploadedFilter()
    const uploadedFilterValue = ref(uploadedFilterStore.value)
    const selectDataUploaded = ref([
      { id: 'Все', name: 'Все' },
      { id: '1', name: 'True', icon: `Select` },
      { id: '0', name: 'False', icon: `CloseBold` }
    ])

    const section = ref({
      title: 'Статус',
      filter: uploadedFilterValue,
      selectData: selectDataUploaded,
      store: uploadedFilterStore,
      fetchDataFunc: null,
      staticData: true,
      label: 'name'
    })

    const { closeSelect, searchValue, loadMoreData, handleUpdateStore, handleOpenSelect } = useFilterControls([section])

    return {
      section,
      searchValue,
      loadMoreData,
      closeSelect,
      handleUpdateStore,
      handleOpenSelect
    }
  }
}
</script>

<style scoped>
.label {
  display: block;
  padding: 0px 0px 0.5rem 0px;
}
</style>
