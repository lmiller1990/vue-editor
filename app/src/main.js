import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import VueElectron from 'vue-electron'

Vue.config.debug = true

Vue.use(VueElectron)

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
