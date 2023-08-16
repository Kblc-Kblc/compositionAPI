import { defineStore } from 'pinia'

function createStore(id) {
  const key = id

  return defineStore({
    id,
    state: () => ({
      value: JSON.parse(localStorage.getItem(key)) || ''
    }),
    actions: {
      set(value) {
        this.value = value
        localStorage.setItem(key, JSON.stringify(value))
      },
      resetState() {
        this.value = ''
        localStorage.removeItem(key)
      }
    }
  })
}

export const useTerritoriesFilterStore = createStore('territoriesFilter')
export const useTerritoriesTypesFilterStore = createStore('territoriesTypesFilter')
export const useTerritoriesGroupFilterStore = createStore('territoriesGroupFilter')
export const useTerritoriesParentFilterStore = createStore('territoriesParentFilter')
export const useIndicatorFilterStore = createStore('indicatorFilter')
export const usePeriodFilterStore = createStore('periodFilter')
export const useSpecialtiesFilterStore = createStore('specialtiesFilter')
export const useOrganizationsFilterStore = createStore('organizationsFilter')
export const useStepsFilterStore = createStore('stepsFilter')
export const useStatusesFilterStore = createStore('statusesFilter')
export const useTrainingFormsFilterStore = createStore('trainingFormsFilter')
export const useUploadedFilterStore = createStore('uploadedFilter')
export const useRealFilterStore = createStore('realFilter')
export const useEducationLevelsFilterStore = createStore('educationLevelsFilter')
export const useSpecialtiesClassifiersFilterStore = createStore('specialtiesClassifiersFilter')
export const useOrganizationsHeadFilterStore = createStore('organizationsHeadFilter')
export const useOrganizationsTypesFilterStore = createStore('organizationsTypesFilter')
