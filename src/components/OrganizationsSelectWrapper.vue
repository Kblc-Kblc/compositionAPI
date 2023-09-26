<template>
  <div>
    <base-organizations-select title="ID" class="select-wrapper"></base-organizations-select>
    <base-organizations-head-select class="select-wrapper"></base-organizations-head-select>
    <base-organizations-types-select class="select-wrapper"></base-organizations-types-select>
    <base-territories-select class="select-wrapper"></base-territories-select>
  </div>
</template>

<script>
import BaseOrganizationsSelect from '@/components/BaseOrganizationsSelect.vue'
import BaseOrganizationsHeadSelect from '@/components/BaseOrganizationsHeadSelect.vue'
import BaseOrganizationsTypesSelect from '@/components/BaseOrganizationsTypesSelect.vue'
import BaseTerritoriesSelect from '@/components/BaseTerritoriesSelect.vue'

export default {
  name: 'OrganizationsSelectWrapper',
  components: {
    BaseOrganizationsSelect,
    BaseOrganizationsHeadSelect,
    BaseOrganizationsTypesSelect,
    BaseTerritoriesSelect
  }
}
</script>

<style scoped>
.select-wrapper {
  padding-bottom: 1.5rem;
}
</style>
