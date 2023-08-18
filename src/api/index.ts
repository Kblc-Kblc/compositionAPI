import axios from 'axios'
import { useAuthStore } from '@/stores/auth/auth'
import router from '@/router'

function api() {
  const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL + '/api/v1',
    headers: {
      Charset: 'utf-8',
      Accept: 'application/json; charset=UTF-8'
    }
  })

  api.interceptors.request.use((config) => {
    const authStore = useAuthStore()
    config.headers.Authorization = 'Bearer ' + authStore.token
    return config
  })

  api.interceptors.response.use(
    (response) => {
      return Promise.resolve(response)
    },
    (error) => {
      const { status } = error.response || ''
      if (status === 401 || status === 403) {
        const authStore = useAuthStore()
        authStore.token = null
        localStorage.removeItem('api_token')
        router.replace('/')
      }
      return Promise.reject(error)
    }
  )

  return api
}

export default {
  auth: {
    login: (email, password) => api().post('/auth/login', { email, password }),
    me: (data = {}) => api().get('/auth/me', data),
    logout: () => api().post('/auth/logout')
  },
  dataTable: {
    getDataIndicators: (params = {}) => api().get('/indicators/values', { params }),
    getDataStates: (params = {}) => api().get('/indicators/states', { params }),
    getDataSpecialties: (params = {}) => api().get('/specialties', { params }),
    getDataOrganizations: (params = {}) => api().get('/organizations', { params }),
    getDataTerritories: (params = {}) => api().get('/territories', { params }),
    getDataApplications: (params = {}) => api().get('/applications', { params })
  },
  dataSelect: {
    getIndicators: (params = {}) => api().get(`/indicators`, { params }),
    getPeriods: (params = {}) => api().get(`/periods`, { params }),
    getSpecialties: (params = {}) => api().get(`/specialties`, { params }),
    getOrganizations: (params = {}) => api().get(`/organizations`, { params }),
    getTerritories: (params = {}) => api().get(`/territories`, { params }),
    getSteps: (params = {}) => api().get(`/indicators/steps`, { params }),
    getStatuses: (params = {}) => api().get(`/indicators/values/statuses`, { params }),
    getTrainingForms: (params = {}) => api().get(`/training-forms`, { params }),
    getEducationLevels: (params = {}) => api().get(`/education-levels`, { params }),
    getSpecialtiesClassifiers: (params = {}) => api().get(`/specialties-classifiers`, { params }),
    getOrganizationsHead: (params = {}) => api().get(`/organizations?is_head=0`, { params }),
    getOrganizationsTypes: (params = {}) => api().get(`/organizations-types`, { params }),
    getTerritoriesTypes: (params = {}) => api().get(`/territories-types`, { params }),
    getTerritoriesGroup: (params = {}) => api().get(`/territories?is_group=1`, { params })
  }
}
