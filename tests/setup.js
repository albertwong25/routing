import Vue from 'vue'
import Vuetify from 'vuetify'
import { config } from '@vue/test-utils'
import '@/mixins'

Vue.use(Vuetify)
config.mocks.$t = msg => msg // ignore i18n
