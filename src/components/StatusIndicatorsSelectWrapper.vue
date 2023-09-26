<template>
  <div>
    <base-indicator-select class="select-wrapper"></base-indicator-select>
    <base-period-select class="select-wrapper"></base-period-select>
    <base-steps-select class="select-wrapper"></base-steps-select>
    <base-uploaded-select class="select-wrapper"></base-uploaded-select>
    <base-training-select class="select-wrapper"></base-training-select>
  </div>
</template>

<script>
import BaseIndicatorSelect from '@/components/BaseIndicatorSelect.vue'
import BasePeriodSelect from '@/components/BasePeriodSelect.vue'
import BaseStepsSelect from '@/components/BaseStepsSelect.vue'
import BaseUploadedSelect from '@/components/BaseUploadedSelect.vue'
import BaseTrainingSelect from '@/components/BaseTrainingSelect.vue'

export default {
  name: 'StatusIndicatorsSelectWrapper',
  components: {
    BaseIndicatorSelect,
    BasePeriodSelect,
    BaseStepsSelect,
    BaseUploadedSelect,
    BaseTrainingSelect
  }
}
</script>

<style scoped>
.select-wrapper {
  padding-bottom: 1.5rem;
}
</style>
