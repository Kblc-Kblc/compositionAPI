<template>
  <div>
    <base-specialties-select title="Территория" class="select-wrapper"></base-specialties-select>
    <base-organizations-select class="select-wrapper"></base-organizations-select>
    <base-period-select class="select-wrapper"></base-period-select>
    <base-training-select class="select-wrapper"></base-training-select>
    <base-real-select class="select-wrapper"></base-real-select>
  </div>
</template>

<script>
import BasePeriodSelect from '@/components/BasePeriodSelect.vue'
import BaseSpecialtiesSelect from '@/components/BaseSpecialtiesSelect.vue'
import BaseOrganizationsSelect from '@/components/BaseOrganizationsSelect.vue'
import BaseTrainingSelect from '@/components/BaseTrainingSelect.vue'
import BaseRealSelect from '@/components/BaseRealSelect.vue'

export default {
  name: 'ApplicationsSelectWrapper',
  components: {
    BasePeriodSelect,
    BaseSpecialtiesSelect,
    BaseOrganizationsSelect,
    BaseTrainingSelect,
    BaseRealSelect
  }
}
</script>

<style scoped>
.select-wrapper {
  padding-bottom: 1.5rem;
}
</style>
