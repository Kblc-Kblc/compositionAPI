<template>
  <div>
    <base-levels-select class="select-wrapper"></base-levels-select>
    <base-specialties-classifiers-select class="select-wrapper"></base-specialties-classifiers-select>
  </div>
</template>

<script>
import BaseLevelsSelect from '@/components/BaseLevelsSelect.vue'
import BaseSpecialtiesClassifiersSelect from '@/components/BaseSpecialtiesClassifiersSelect.vue'

export default {
  name: 'SpecialtiesSelectWrapper',
  components: {
    BaseLevelsSelect,
    BaseSpecialtiesClassifiersSelect
  }
}
</script>

<style scoped>
.select-wrapper {
  padding-bottom: 1.5rem;
}
</style>
