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
        this[callback]()
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
    }
  }
}

Vue.mixin(mixin)

export default mixin
