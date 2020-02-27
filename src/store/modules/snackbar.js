const snackbar = {
  state: {
    snackbarData: {
      text: '',
      type: 'error',
      show: false
    }
  },
  actions: {
    setSnackbar ({ commit }, snackbar) {
      commit('SET_SNACKBAR', snackbar)
    }
  },
  mutations: {
    SET_SNACKBAR (state, snackbar) {
      state.snackbarData = {
        ...state.snackbarData,
        ...snackbar
      }
    }
  },
  getters: {
    getSnackbar: (state) => state.snackbarData
  }
}

export default snackbar
