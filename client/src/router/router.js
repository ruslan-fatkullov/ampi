import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: () => import('../components/MainPage.vue')
  },
  {
    path: '/auth',
    name: 'AuthPopUp',
    component: () => import('../components/AuthPopUp.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
