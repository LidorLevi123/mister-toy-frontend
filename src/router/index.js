import { createRouter, createWebHashHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import AboutPage from '../pages/AboutPage.vue'
import Dashboard from '../pages/Dashboard.vue'

import ToyIndex from '../pages/ToyIndex.vue'
import ToyDetails from '../pages/ToyDetails.vue'
import ToyEdit from '../pages/ToyEdit.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage
    },
    {
      path: '/toy',
      name: 'toy',
      component: ToyIndex
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/toy/details/:toyId',
      name: 'toy details',
      component: ToyDetails
    },
    {
      path: '/toy/edit/:toyId?',
      name: 'toy edit',
      component: ToyEdit
    },
  ]
})

export default router
