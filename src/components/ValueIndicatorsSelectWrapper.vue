<template>
  <div>
    <base-indicator-select class="select-wrapper"></base-indicator-select>
    <base-period-select class="select-wrapper"></base-period-select>
    <base-specialties-select title="Территория" class="select-wrapper"></base-specialties-select>
    <base-organizations-select class="select-wrapper"></base-organizations-select>
    <base-territories-select class="select-wrapper"></base-territories-select>
    <base-steps-select class="select-wrapper"></base-steps-select>
    <base-statuses-select class="select-wrapper"></base-statuses-select>
    <base-training-select class="select-wrapper"></base-training-select>
  </div>
</template>

<script>
import BaseIndicatorSelect from '@/components/BaseIndicatorSelect.vue'
import BasePeriodSelect from '@/components/BasePeriodSelect.vue'
import BaseSpecialtiesSelect from '@/components/BaseSpecialtiesSelect.vue'
import BaseOrganizationsSelect from '@/components/BaseOrganizationsSelect.vue'
import BaseTerritoriesSelect from '@/components/BaseTerritoriesSelect.vue'
import BaseStepsSelect from '@/components/BaseStepsSelect.vue'
import BaseStatusesSelect from '@/components/BaseStatusesSelect.vue'
import BaseTrainingSelect from '@/components/BaseTrainingSelect.vue'

export default {
  name: 'ValueIndicatorsSelectWrapper',
  components: {
    BaseIndicatorSelect,
    BasePeriodSelect,
    BaseSpecialtiesSelect,
    BaseOrganizationsSelect,
    BaseTerritoriesSelect,
    BaseStepsSelect,
    BaseStatusesSelect,
    BaseTrainingSelect
  }
}
</script>

<style scoped>
.select-wrapper {
  margin-bottom: 1.5rem;
}
</style>
