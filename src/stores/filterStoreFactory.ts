import { defineStore, Store } from 'pinia'

type ValueInput = {
  [key: string]: string | number
}

function createStore(id: string) {
  const key = id

  return defineStore({
    id,
    state: () => ({
      value: typeof localStorage.getItem(key) === 'string' ? JSON.parse(localStorage.getItem(key) as string) : ''
    }),
    actions: {
      set(value: ValueInput) {
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

export type FilterStoreKeys =
  | 'territoriesFilter'
  | 'territoriesTypesFilter'
  | 'territoriesGroupFilter'
  | 'territoriesParentFilter'
  | 'indicatorFilter'
  | 'periodFilter'
  | 'specialtiesFilter'
  | 'organizationsFilter'
  | 'stepsFilter'
  | 'statusesFilter'
  | 'trainingFormsFilter'
  | 'uploadedFilter'
  | 'realFilter'
  | 'educationLevelsFilter'
  | 'specialtiesClassifiersFilter'
  | 'organizationsHeadFilter'
  | 'organizationsTypesFilter'

type StoreType = Store<
  string,
  {
    value: ValueInput
  },
  {},
  {
    set(value: ValueInput): void
    resetState(): void
  }
>

export type { StoreType }
