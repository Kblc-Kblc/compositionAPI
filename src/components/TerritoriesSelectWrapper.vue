<template>
  <div>
    <base-territories-select title="ID" class="select-wrapper"></base-territories-select>
    <base-territories-parent-select class="select-wrapper"></base-territories-parent-select>
    <base-territories-types-select class="select-wrapper"></base-territories-types-select>
    <base-territories-group-select class="select-wrapper"></base-territories-group-select>
  </div>
</template>

<script>
import BaseTerritoriesSelect from '@/components/BaseTerritoriesSelect.vue'
import BaseTerritoriesParentSelect from '@/components/BaseTerritoriesParentSelect.vue'
import BaseTerritoriesTypesSelect from '@/components/BaseTerritoriesTypesSelect.vue'
import BaseTerritoriesGroupSelect from '@/components/BaseTerritoriesGroupSelect.vue'

export default {
  name: 'TerritoriesSelectWrapper',
  components: {
    BaseTerritoriesSelect,
    BaseTerritoriesParentSelect,
    BaseTerritoriesTypesSelect,
    BaseTerritoriesGroupSelect
  }
}
</script>

<style scoped>
.select-wrapper {
  padding-bottom: 1.5rem;
}
</style>
