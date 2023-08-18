import { ref } from 'vue'
import {
  useIndicatorFilterStore,
  usePeriodFilterStore,
  useSpecialtiesFilterStore,
  useOrganizationsFilterStore,
  useTerritoriesFilterStore,
  useStepsFilterStore,
  useTrainingFormsFilterStore
} from '@/stores/filterStoreFactory'
import api from '@/api/index'
import { useFetchData } from '@/use/useFetchData'

export default function useFilterDataSources() {
  const indicatorFilterStore = useIndicatorFilterStore()
  const indicatorFilter = ref(indicatorFilterStore.value)
  const selectDataIndicators = ref([])
  const currentPageIndicators = ref(1)
  const sizePageIndicators = ref(25)
  const searchQueryIndicators = ref('')

  const periodFilterStore = usePeriodFilterStore()
  const periodFilter = ref(periodFilterStore.value)
  const selectDataPeriods = ref([])

  const specialtiesFilterStore = useSpecialtiesFilterStore()
  const specialtiesFilter = ref(specialtiesFilterStore.value)
  const selectDataSpecialties = ref([])
  const currentPageSpecialties = ref(1)
  const sizePageSpecialties = ref(25)
  const searchQuerySpecialties = ref('')

  const organizationsFilterStore = useOrganizationsFilterStore()
  const organizationsFilter = ref(organizationsFilterStore.value)
  const selectDataOrganizations = ref([])
  const currentPageOrganizations = ref(1)
  const sizePageOrganizations = ref(25)
  const searchQueryOrganizations = ref('')

  const territoriesFilterStore = useTerritoriesFilterStore()
  const territoriesFilter = ref(territoriesFilterStore.value)
  const selectDataTerritories = ref([])
  const currentPageTerritories = ref(1)
  const sizePageTerritories = ref(25)
  const searchQueryTerritories = ref('')

  const stepsFilterStore = useStepsFilterStore()
  const stepsFilter = ref(stepsFilterStore.value)
  const selectDataSteps = ref([])

  const trainingFormsFilterStore = useTrainingFormsFilterStore()
  const trainingFormsFilter = ref(trainingFormsFilterStore.value)
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
    indicatorFilter,
    selectDataIndicators,
    currentPageIndicators,
    fetchDataIndicators,
    searchQueryIndicators,

    periodFilterStore,
    periodFilter,
    selectDataPeriods,
    fetchDataPeriods,

    specialtiesFilterStore,
    specialtiesFilter,
    selectDataSpecialties,
    currentPageSpecialties,
    searchQuerySpecialties,
    fetchDataSpecialties,

    organizationsFilterStore,
    organizationsFilter,
    selectDataOrganizations,
    currentPageOrganizations,
    searchQueryOrganizations,
    fetchDataOrganizations,

    territoriesFilterStore,
    territoriesFilter,
    selectDataTerritories,
    currentPageTerritories,
    sizePageTerritories,
    searchQueryTerritories,
    fetchDataTerritories,

    stepsFilterStore,
    stepsFilter,
    selectDataSteps,
    fetchDataSteps,

    trainingFormsFilterStore,
    trainingFormsFilter,
    selectDataTrainingForms,
    fetchDataTrainingForms
  }
}
