import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import myPlugins from './plugins/myMixins.js'

Vue.config.productionTip = false
Vue.use(myPlugins)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
