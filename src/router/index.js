import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase/app'
import Home from '../views/Home.vue'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/Login',
      name: 'login',
      meta: { layout: 'empty' },
      component: () => import('../views/Login.vue')
    },
    {
      path: '/Register',
      name: 'Register',
      meta: { layout: 'empty' },
      component: () => import('../views/Register.vue')
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Categories',
      name: 'categories',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Categories.vue')
    },
    {
      path: '/',
      name: 'Index',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Index.vue')
    },
    {
      path: '/History',
      name: 'History',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/History.vue')
    },
    {
      path: '/Detail/:id',
      name: 'Detal-record',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Detail.vue')
    },
    {
      path: '/Planing',
      name: 'Planing',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Planing.vue')
    },
    {
      path: '/Record',
      name: 'Record',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Record.vue')
    },
    {
      path: '/Profile',
      name: 'Profile',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Profile.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router
