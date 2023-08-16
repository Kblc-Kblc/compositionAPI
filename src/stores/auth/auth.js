import { defineStore } from 'pinia'
import api from '@/api/index'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: localStorage.getItem('api_token')
  }),
  actions: {
    async login({ email, password }) {
      try {
        const response = await api.auth.login(email, password)
        this.token = response.data.token
        localStorage.setItem('api_token', this.token)
      } catch (error) {
        console.error(error)
        throw error
      }
    },
    async logout() {
      try {
        await api.auth.logout()
        this.token = null
        localStorage.removeItem('api_token')
      } catch (error) {
        console.error(error)
      }
    }
  }
})
