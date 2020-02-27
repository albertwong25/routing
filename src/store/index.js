import Vue from 'vue'
import Vuex from 'vuex'

import routeData from '@/store/modules/routeData'
import snackbar from '@/store/modules/snackbar'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    routeData,
    snackbar
  },
  state: {
    loading: false
  },
  actions: {
    setLoading ({ commit }, payload) {
      commit('SET_LOADING', payload)
    }
  },
  mutations: {
    SET_LOADING (state, val) {
      state.loading = val
    }
  },
  getters: {
    isLoading: (state) => state.loading
  }
})
