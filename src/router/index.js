import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HistorialView from '../views/HistorialView.vue'
import PrecioFierroView from '../views/PrecioFierroView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/historial',
      name: 'historial',
      component: HistorialView
    },
    {
      path: '/precio-fierro',
      name: 'precio-fierro',
      component: PrecioFierroView
    }
  ]
})

export default router
