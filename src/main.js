import Vue from 'vue'
import '@/plugins/axios' // ajax call
import '@/mixins' // shared functions
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify' // vue framework
import i18n from '@/plugins/vueI18n' // language control
import store from '@/store' // shared data

Vue.config.productionTip = false

new Vue({
  vuetify,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
