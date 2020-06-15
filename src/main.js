import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import App from './App.vue'
import router from './router'
import VueMeta from 'vue-meta'
import store from './store'
import messagePlugin from '@/utils/message.plugin'
import titlePlugin from '@/utils/title.plugin'
import loader from '@/components/app/loader'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import localFilter from '@/filters/local.filter'
import tooltipDirective from '@/directives/tooltip.directive'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.use(titlePlugin)
Vue.filter('date', dateFilter)
Vue.filter('local', localFilter)
Vue.filter('currency', currencyFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('loader', loader)
Vue.component('paginate', Paginate)

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
