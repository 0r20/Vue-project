import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store/index'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('../views/Help.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
    meta: {
      layout: 'auth',
      auth: false
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  const toAuth = to.meta.auth
  const fromAuth = from.meta.auth
  const isAuthenticated = store.getters['auth/isAuthenticated']

  if (toAuth && isAuthenticated) {
    next()
    return
  }

  if (toAuth && !isAuthenticated) {
    next('/auth?message=auth')
    return
  }

  if (!fromAuth && isAuthenticated) {
    next('/')
    return
  }

  next()
})

export default router
