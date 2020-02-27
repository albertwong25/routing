<template>
  <GoogleMapLoader
    :data-token="token"
  >
    <template slot-scope="{ google, map, bounds }">
      <GoogleMapPlace
        :google="google"
        :map="map"
        :bounds="bounds"
        :autocomplete="dataAutocomplete"
        @update:autocomplete="setAutocomplete"
      />
      <GoogleMapMarker
        v-for="marker in markers"
        :key="marker.id"
        :google="google"
        :map="map"
        :bounds="bounds"
        :marker="marker"
      />
      <GoogleMapDirection
        :google="google"
        :map="map"
        :markers="markers"
      />
    </template>
  </GoogleMapLoader>
</template>

<script>
import GoogleMapLoader from '@/components/google/GoogleMapLoader'
import GoogleMapPlace from '@/components/google/GoogleMapPlace'
import GoogleMapMarker from '@/components/google/GoogleMapMarker'
import GoogleMapDirection from '@/components/google/GoogleMapDirection'
import { mapGetters } from 'vuex'

export default {
  name: 'Map',

  components: {
    GoogleMapLoader,
    GoogleMapPlace,
    GoogleMapMarker,
    GoogleMapDirection
  },

  props: {
    dataAutocomplete: { // get user input text from search box
      type: String,
      default: ''
    }
  },

  data () {
    return {
      token: process.env.VUE_APP_GOOGLE_MAP_TOKEN
    }
  },

  computed: {
    ...mapGetters([
      'getWaypoints'
    ]),
    // translate store waypoints to google map markers
    markers () {
      return this.getWaypoints.path.map((val, index) => {
        return {
          id: String.fromCharCode(index + 65),
          position: {
            lat: Number(val[0]),
            lng: Number(val[1])
          }
        }
      })
    }
  },

  methods: {
    setAutocomplete (autocomplete) {
      this.$emit('update:autocomplete', autocomplete)
    }
  }
}
</script>
