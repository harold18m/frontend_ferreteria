import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HistorialView from '../views/HistorialView.vue'
import PrecioFierroView from '../views/PrecioFierroView.vue'
import LoginViewVue from '@/views/LoginView.vue'
import ListaTareasViewVue from '@/views/ListaTareasView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }, 
    beforeEnter: (to, from, next) => {
      if (window.innerWidth <= 600) {
        next('/lista')
      } else {
        next()
      }
    }
  },
  {
    path: '/historial',
    name: 'historial',
    component: HistorialView,
    meta: { requiresAuth: true }  
  },
  {
    path: '/precio-fierro',
    name: 'precio-fierro',
    component: PrecioFierroView,
    meta: { requiresAuth: true }  
  },
  {
    path: '/lista',
    name: 'lista',
    component: ListaTareasViewVue,
    meta: { requiresAuth: true } 
  },
  {
    path: '/login',
    name: 'login',
    component: LoginViewVue  
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('token')

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/login')
  } else if (to.path === '/login' && loggedIn) {
    next('/')
  } else {
    next()
  }
})

export default router