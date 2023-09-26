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

export const territoriesFilter = createStore('territoriesFilter')
export const territoriesTypesFilter = createStore('territoriesTypesFilter')
export const territoriesGroupFilter = createStore('territoriesGroupFilter')
export const territoriesParentFilter = createStore('territoriesParentFilter')
export const indicatorFilter = createStore('indicatorFilter')
export const periodFilter = createStore('periodFilter')
export const specialtiesFilter = createStore('specialtiesFilter')
export const organizationsFilter = createStore('organizationsFilter')
export const stepsFilter = createStore('stepsFilter')
export const statusesFilter = createStore('statusesFilter')
export const trainingFormsFilter = createStore('trainingFormsFilter')
export const uploadedFilter = createStore('uploadedFilter')
export const realFilter = createStore('realFilter')
export const educationLevelsFilter = createStore('educationLevelsFilter')
export const specialtiesClassifiersFilter = createStore('specialtiesClassifiersFilter')
export const organizationsHeadFilter = createStore('organizationsHeadFilter')
export const organizationsTypesFilter = createStore('organizationsTypesFilter')
