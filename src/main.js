import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import messagePlugin from '@/utils/message.plugin'
import loader from '@/components/app/loader'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.component('loader', loader)

firebase.initializeApp({
  apiKey: 'AIzaSyA-quSntwShHk4nBzE_G91Nu8PoxPxUJjM',
  authDomain: 'vue-lesson-53dd1.firebaseapp.com',
  databaseURL: 'https://vue-lesson-53dd1.firebaseio.com',
  projectId: 'vue-lesson-53dd1',
  storageBucket: 'vue-lesson-53dd1.appspot.com',
  messagingSenderId: '884144070155',
  appId: '1:884144070155:web:effb5fefcbf4389ff4f10e',
  measurementId: 'G-VHM8QTD4G3'
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
