import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/views/AppLayout.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/views/pages/DashboardView.vue'),
        meta: { title: 'Dashboard' }
      },
      {
        path: 'proformas',
        name: 'proformas',
        component: () => import('@/views/pages/ProformaView.vue'),
        meta: { title: 'Gestión de Proformas' }
      },
      {
        path: '/historial',
        name: 'historial',
        component: () => import('@/views/pages/HistorialView.vue'),
        meta: { title: 'Historial de Operaciones' }
      },
      {
        path: '/precio-fierro',
        name: 'precio-fierro',
        component: () => import('@/views/pages/PrecioFierroView.vue'),
        meta: { title: 'Precio del Fierro' }
      },
      {
        path: '/lista',
        name: 'lista',
        component: () => import('@/views/pages/ListaTareasView.vue'),
        meta: { title: 'Lista de Pendientes' }
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/pages/LoginView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/pages/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  // Verificación de autenticación existente
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token')
    if (!token) {
      next('/login')
      return
    }
  }

  // Establecer título de la página
  if (to.meta.title) {
    document.title = `${to.meta.title} - Ferretería`
  }

  next()
})

export default router
