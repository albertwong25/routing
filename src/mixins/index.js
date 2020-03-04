import Vue from 'vue'

const mixin = {
  methods: {
    // retry api call after delay
    mixinApiRetry (delay, callback) {
      this.setSnackbar({
        text: this.$t('responses.inProgressRetry'),
        type: 'warning',
        show: true
      })
      window.setTimeout(() => {
        this.addRetryCount()
        callback()
      }, delay)
    },
    // centralize all api errors
    mixinApiErrorHandler (error) {
      let text = ''
      if (error.status === 'failure') {
        text = error.message
      } else if (error.status === 'in progress') {
        text = this.$t('responses.inProgressFail')
      } else {
        text = this.$t('responses.internalServerError')
      }

      this.setSnackbar({
        text,
        type: 'error',
        show: true
      })
      this.setLoading(false)
    },
    // centralize all Google errors
    mixinGoogleErrorHandler (error) {
      // dummy handler
      const text = error.status.split('_').map(word => {
        return word.charAt(0).toUpperCase() + word.substr(1)
      }).join(' ') // convert snake case to title case

      // Google Map API errors:
      // INVALID_REQUEST, MAX_WAYPOINTS_EXCEEDED, NOT_FOUND, OVER_QUERY_LIMIT, REQUEST_DENIED, UNKNOWN_ERROR, ZERO_RESULTS

      this.setSnackbar({
        text,
        type: 'error',
        show: true
      })
    }
  }
}

Vue.mixin(mixin)

export default mixin
