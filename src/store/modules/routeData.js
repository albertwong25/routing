import Vue from 'vue'

export default {
  state: {
    routeData: {
      origin: '',
      destination: '',
      token: '',
      path: [],
      totalDistance: 0,
      totalTime: 0
    },
    retryCount: 0
  },
  actions: {
    setRoute ({ commit }, payload) {
      commit('SET_ROUTE', payload)
      commit('RESET_TOKEN')
    },
    setToken ({ commit }, payload) {
      commit('SET_TOKEN', payload)
    },
    setWaypoints ({ commit }, payload) {
      commit('SET_ROUTE', payload)
    },
    resetWaypoints ({ commit }) {
      commit('RESET_WAYPOINTS')
    },
    addRetryCount ({ commit }) {
      commit('ADD_RETRY_COUNT')
    },
    resetRetryCount ({ commit }) {
      commit('RESET_RETRY_COUNT')
    }
  },
  mutations: {
    SET_ROUTE (state, val) {
      for (const index in val) {
        Vue.set(state.routeData, index, val[index])
      }
    },
    SET_TOKEN (state, val) {
      Vue.set(state.routeData, 'token', val)
    },
    RESET_TOKEN (state) {
      Vue.set(state.routeData, 'token', '')
    },
    RESET_WAYPOINTS (state) {
      Vue.set(state.routeData, 'path', [])
      Vue.set(state.routeData, 'totalDistance', 0)
      Vue.set(state.routeData, 'totalTime', 0)
    },
    ADD_RETRY_COUNT (state) {
      state.retryCount++
    },
    RESET_RETRY_COUNT (state) {
      state.retryCount = 0
    }
  },
  getters: {
    getRoute: (state) => {
      return {
        origin: state.routeData.origin,
        destination: state.routeData.destination
      }
    },
    getToken: (state) => state.routeData.token,
    getWaypoints: (state) => {
      return {
        path: state.routeData.path,
        totalDistance: state.routeData.totalDistance,
        totalTime: state.routeData.totalTime
      }
    },
    getRetryCount: (state) => state.retryCount
  }
}
