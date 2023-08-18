import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import Login from '@/views/Login.vue'
import NotFound from '@/views/404.vue'
import { useAuthStore } from '@/stores/auth/auth'

import ContentStatusIndicators from '@/views/status-indicators/ContentStatusIndicators.vue'
import StatusIndicators from '@/views/status-indicators/StatusIndicators.vue'
import ContentValueIndicators from '@/views/value-indicators/ContentValueIndicators.vue'
import ValueIndicators from '@/views/value-indicators/ValueIndicators.vue'

import ContentSpecialties from '@/views/specialties/ContentSpecialties.vue'
import Specialties from '@/views/specialties/Specialties.vue'

import ContentOrganizations from '@/views/organizations/ContentOrganizations.vue'
import Organizations from '@/views/organizations/Organizations.vue'

import ContentTerritories from '@/views/territories/ContentTerritories.vue'
import Territories from '@/views/territories/Territories.vue'

import ContentApplications from '@/views/applications/ContentApplications.vue'
import Applications from '@/views/applications/Applications.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/value-indicators',
      component: MainLayout,
      props: { headerTitle: 'Значения показателей' },
      meta: { requiresAuth: true },
      children: [{ path: '', components: { content: ContentValueIndicators, aside: ValueIndicators } }]
    },
    {
      path: '/status-indicators',
      component: MainLayout,
      props: { headerTitle: 'Статус показателей' },
      meta: { requiresAuth: true },
      children: [{ path: '', components: { content: ContentStatusIndicators, aside: StatusIndicators } }]
    },
    {
      path: '/specialties',
      component: MainLayout,
      props: { headerTitle: 'Специальности' },
      meta: { requiresAuth: true },
      children: [{ path: '', components: { content: ContentSpecialties, aside: Specialties } }]
    },
    {
      path: '/organizations',
      component: MainLayout,
      props: { headerTitle: 'Организации' },
      meta: { requiresAuth: true },
      children: [{ path: '', components: { content: ContentOrganizations, aside: Organizations } }]
    },
    {
      path: '/territories',
      component: MainLayout,
      props: { headerTitle: 'Территории' },
      meta: { requiresAuth: true },
      children: [{ path: '', components: { content: ContentTerritories, aside: Territories } }]
    },
    {
      path: '/applications',
      component: MainLayout,
      props: { headerTitle: 'Заявки' },
      meta: { requiresAuth: true },
      children: [{ path: '', components: { content: ContentApplications, aside: Applications } }]
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authStore.token) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    if (to.path === '/' && authStore.token) {
      next({ path: '/value-indicators' })
    } else {
      next()
    }
  }
})

export default router
