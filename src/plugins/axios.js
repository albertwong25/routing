import Vue from 'vue'
import axios from 'axios'
import api from '@/api'
import { apiCfg } from '@/config'

const config = {
  baseURL: apiCfg.baseUrl,
  withCredentials: false, // disable cross-site Access-Control
  headers: {
    'Content-Type': 'application/json'
  }
}

const _axios = axios.create(config)

// set $axios and $api to Vue prototype
Plugin.install = (Vue) => {
  Vue.$axios = _axios
  Vue.$api = api
  Object.defineProperties(Vue.prototype, {
    $axios: {
      get () {
        return _axios
      }
    },
    $api: {
      get () {
        return api
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
