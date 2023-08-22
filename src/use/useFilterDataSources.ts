import { ref } from 'vue'
import {
  indicatorFilter,
  periodFilter,
  specialtiesFilter,
  organizationsFilter,
  territoriesFilter,
  stepsFilter,
  trainingFormsFilter
} from '@/stores/filterStoreFactory'
import api from '@/api/index'
import { useFetchData } from '@/use/useFetchData'

export default function useFilterDataSources() {
  const indicatorFilterStore = indicatorFilter()
  const indicatorFilterValue = ref(indicatorFilterStore.value)
  const selectDataIndicators = ref([])
  const currentPageIndicators = ref(1)
  const sizePageIndicators = ref(25)
  const searchQueryIndicators = ref('')

  const periodFilterStore = periodFilter()
  const periodFilterValue = ref(periodFilterStore.value)
  const selectDataPeriods = ref([])

  const specialtiesFilterStore = specialtiesFilter()
  const specialtiesFilterValue = ref(specialtiesFilterStore.value)
  const selectDataSpecialties = ref([])
  const currentPageSpecialties = ref(1)
  const sizePageSpecialties = ref(25)
  const searchQuerySpecialties = ref('')

  const organizationsFilterStore = organizationsFilter()
  const organizationsFilterValue = ref(organizationsFilterStore.value)
  const selectDataOrganizations = ref([])
  const currentPageOrganizations = ref(1)
  const sizePageOrganizations = ref(25)
  const searchQueryOrganizations = ref('')

  const territoriesFilterStore = territoriesFilter()
  const territoriesFilterValue = ref(territoriesFilterStore.value)
  const selectDataTerritories = ref([])
  const currentPageTerritories = ref(1)
  const sizePageTerritories = ref(25)
  const searchQueryTerritories = ref('')

  const stepsFilterStore = stepsFilter()
  const stepsFilterValue = ref(stepsFilterStore.value)
  const selectDataSteps = ref([])

  const trainingFormsFilterStore = trainingFormsFilter()
  const trainingFormsFilterValue = ref(trainingFormsFilterStore.value)
  const selectDataTrainingForms = ref([])

  const fetchDataIndicators = useFetchData({
    apiCall: api.dataSelect.getIndicators,
    selectData: selectDataIndicators,
    currentPage: currentPageIndicators,
    pageSize: sizePageIndicators,
    searchQuery: searchQueryIndicators
  }).fetchData

  const fetchDataPeriods = useFetchData({
    apiCall: api.dataSelect.getPeriods,
    selectData: selectDataPeriods
  }).fetchData

  const fetchDataSpecialties = useFetchData({
    apiCall: api.dataSelect.getSpecialties,
    selectData: selectDataSpecialties,
    currentPage: currentPageSpecialties,
    pageSize: sizePageSpecialties,
    searchQuery: searchQuerySpecialties
  }).fetchData

  const fetchDataOrganizations = useFetchData({
    apiCall: api.dataSelect.getOrganizations,
    selectData: selectDataOrganizations,
    currentPage: currentPageOrganizations,
    pageSize: sizePageOrganizations,
    searchQuery: searchQueryOrganizations
  }).fetchData

  const fetchDataTerritories = useFetchData({
    apiCall: api.dataSelect.getTerritories,
    selectData: selectDataTerritories,
    currentPage: currentPageTerritories,
    pageSize: sizePageTerritories,
    searchQuery: searchQueryTerritories
  }).fetchData

  const fetchDataSteps = useFetchData({
    apiCall: api.dataSelect.getSteps,
    selectData: selectDataSteps
  }).fetchData

  const fetchDataTrainingForms = useFetchData({
    apiCall: api.dataSelect.getTrainingForms,
    selectData: selectDataTrainingForms
  }).fetchData

  return {
    indicatorFilterStore,
    indicatorFilterValue,
    selectDataIndicators,
    currentPageIndicators,
    fetchDataIndicators,
    searchQueryIndicators,

    periodFilterStore,
    periodFilterValue,
    selectDataPeriods,
    fetchDataPeriods,

    specialtiesFilterStore,
    specialtiesFilterValue,
    selectDataSpecialties,
    currentPageSpecialties,
    searchQuerySpecialties,
    fetchDataSpecialties,

    organizationsFilterStore,
    organizationsFilterValue,
    selectDataOrganizations,
    currentPageOrganizations,
    searchQueryOrganizations,
    fetchDataOrganizations,

    territoriesFilterStore,
    territoriesFilterValue,
    selectDataTerritories,
    currentPageTerritories,
    sizePageTerritories,
    searchQueryTerritories,
    fetchDataTerritories,

    stepsFilterStore,
    stepsFilterValue,
    selectDataSteps,
    fetchDataSteps,

    trainingFormsFilterStore,
    trainingFormsFilterValue,
    selectDataTrainingForms,
    fetchDataTrainingForms
  }
}
