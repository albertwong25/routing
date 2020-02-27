<template>
  <div>
    <div
      ref="googleMap"
      class="google-map"
    />
    <slot
      v-if="Boolean(google) && Boolean(map) && Boolean(bounds)"
      :google="google"
      :map="map"
      :bounds="bounds"
    />
  </div>
</template>

<script>
import GoogleMapsApiLoader from 'google-maps-api-loader'

import { mapCfg } from '@/config'

export default {
  props: {
    dataToken: { // get token from local env
      type: String,
      default: '',
      required: true
    }
  },

  data () {
    return {
      google: null, // set and share google api
      map: null, // set and share map
      bounds: null // set and share bounds
    }
  },

  mounted () {
    this.initMap()
  },

  methods: {
    async initMap () {
      this.google = await GoogleMapsApiLoader({
        libraries: ['places'],
        apiKey: this.dataToken
      })
      this.setMap()
    },
    setMap () {
      const { Map, LatLng, LatLngBounds } = this.google.maps
      const center = new LatLng(mapCfg.center)

      this.map = new Map(this.$refs.googleMap, {
        ...mapCfg,
        center: center
      })
      this.bounds = new LatLngBounds()
    }
  }
}
</script>

<style lang='sass' scoped>
.google-map
  position: absolute
  width: 100%
  min-height: 100%
</style>
