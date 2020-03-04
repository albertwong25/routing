<template>
  <v-app>
    <v-content>
      <Search
        :data-autocomplete="autocomplete"
        :data-route-result="routeResult"
        @update:route="setRoute"
        @update:routeResult="setRouteResult"
        @update:autocomplete="setAutocomplete"
        @submit:route="submitRoute"
      />
      <Map
        :data-autocomplete="autocomplete.text"
        @update:autocomplete="setAutocomplete"
      />
    </v-content>
    <Snackbar />
  </v-app>
</template>

<script>
import Search from '@/components/Search'
import Map from '@/components/Map'
import Snackbar from '@/components/Snackbar'
import { apiCfg } from '@/config'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',

  components: {
    Search,
    Map,
    Snackbar
  },

  data () {
    return {
      autocomplete: { // temp obj to store autocomplete data
        index: '',
        text: '',
        description: []
      },
      routeResult: { // temp obj to store route result
        status: '',
        message: ''
      }
    }
  },

  computed: {
    ...mapGetters([
      'getRoute',
      'getToken',
      'getRetryCount'
    ])
  },

  methods: {
    ...mapActions([
      'setRoute',
      'setToken',
      'setWaypoints',
      'resetWaypoints',
      'addRetryCount',
      'resetRetryCount',
      'setSnackbar',
      'setLoading'
    ]),
    // submit user input to get token
    async submitRoute () {
      try {
        this.setLoading(true)
        this.resetWaypoints() // clear waypoints before api call

        const response = await this.$api.getToken(this.getRoute)
        this.setToken(response.data.token)
        this.submitToken()
      } catch (error) {
        this.mixinApiErrorHandler(error)
      }
    },
    // submit token to get waypoints
    async submitToken () {
      let clearRetryCount = true
      try {
        const response = await this.$api.getWaypoints(this.getToken)

        // set route result and waypoints when request success
        if (response.data.status === 'success') {
          this.setRouteResult(response.data.status)
          this.setWaypoints({
            path: response.data.path,
            totalDistance: response.data.total_distance,
            totalTime: response.data.total_time
          })
          this.setLoading(false)
        } else if (response.data.status === 'in progress') {
          if (this.getRetryCount <= apiCfg.retryCount) {
            clearRetryCount = false
            this.mixinApiRetry(apiCfg.retryDelay, this.submitToken)
          } else { // request failed, retry time > maxmimum retry count
            this.setRouteResult()
            this.mixinApiErrorHandler({
              status: response.data.status,
              message: response.data.error
            })
          }
        } else { // request failure, set in route result
          this.setRouteResult(response.data.status, response.data.error)
          this.setLoading(false)
        }
      } catch (error) {
        this.setRouteResult()
        this.mixinApiErrorHandler(error)
      }
      if (clearRetryCount) { // reset retry count for api call next time
        this.resetRetryCount()
      }
    },
    // update autocomplete temp from search box (index/text) or google map place (description)
    setAutocomplete (autocomplete) {
      this.autocomplete = { ...this.autocomplete, ...autocomplete }
    },
    // update route result temp for search box
    setRouteResult (status = '', message = '') {
      this.routeResult = { status, message }
    }
  }
}
</script>

<style lang='sass'>
$breakpoint-xs: 600px

@mixin xs-max
  @media all and (max-width: $breakpoint-xs)
    @content

html
  @include xs-max
    font-size: 14px

    .v-label, .v-btn.v-size--default
      font-size: 14px
</style>
