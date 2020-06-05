import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/Login',
    name: 'login',
    meta: { layout: 'empty' },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/Categories',
    name: 'categories',
    meta: { layout: 'main' },
    component: () => import('../views/Categories.vue')
  },
  {
    path: '/Register',
    name: 'Register',
    meta: { layout: 'empty' },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/',
    name: 'Index',
    meta: { layout: 'main' },
    component: () => import('../views/Index.vue')
  },
  {
    path: '/History',
    name: 'History',
    meta: { layout: 'main' },
    component: () => import('../views/History.vue')
  },
  {
    path: '/Detal-record',
    name: 'Detal-record',
    meta: { layout: 'main' },
    component: () => import('../views/Detal-record.vue')
  },
  {
    path: '/Planing',
    name: 'Planing',
    meta: { layout: 'main' },
    component: () => import('../views/Planing.vue')
  },
  {
    path: '/Record',
    name: 'Record',
    meta: { layout: 'main' },
    component: () => import('../views/Record.vue')
  },
  {
    path: '/Profile',
    name: 'Profile',
    meta: { layout: 'main' },
    component: () => import('../views/Profile.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
