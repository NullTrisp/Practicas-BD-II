import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import css from './assets/styles.css'

Vue.config.productionTip = false

new Vue({
  css,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
