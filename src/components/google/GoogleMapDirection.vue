<script>
import { mapActions } from 'vuex'
import { mapDirectionCfg } from '@/config'

export default {
  props: {
    google: {
      type: Object,
      default: () => {},
      required: true
    },
    map: {
      type: Object,
      default: () => {},
      required: true
    },
    markers: {
      type: Array,
      default: () => [],
      required: true
    }
  },

  data () {
    return {
      directionsServiceObj: null, // service for getting direction
      directionsRendererObj: null, // service for renderering direction in map
      infoWindowObj: null // display direction distance and time
    }
  },

  computed: {
    // get waypoints (exclude origin and destination)
    waypoints () {
      const waypoints = this.markers.map(val => {
        const { LatLng } = this.google.maps
        return {
          location: new LatLng(val.position)
        }
      })
      return waypoints.slice(1, waypoints.length - 1)
    }
  },

  watch: {
    // watch marker change and set direction
    markers: {
      handler (newVal) {
        if (newVal.length > 0) {
          this.setDirection()
        }
      },
      deep: true
    }
  },

  mounted () {
    this.initDirection()
  },

  methods: {
    ...mapActions([
      'setSnackbar',
      'setLoading'
    ]),
    initDirection () {
      const { DirectionsService, DirectionsRenderer, InfoWindow } = this.google.maps

      this.directionsServiceObj = new DirectionsService()
      this.directionsRendererObj = new DirectionsRenderer({
        ...mapDirectionCfg.renderer,
        map: this.map
      })
      this.infoWindowObj = new InfoWindow()
    },
    setDirection () {
      const { LatLng } = this.google.maps
      const origin = new LatLng(this.markers[0].position)
      const destination = new LatLng(this.markers[this.markers.length - 1].position)

      this.infoWindowObj.close()
      this.directionsServiceObj.route({
        ...mapDirectionCfg.service,
        origin: origin,
        destination: destination,
        waypoints: this.waypoints
      }, (result, status) => {
        if (status === 'OK') {
          this.directionsRendererObj.setDirections(result)
          this.setInfoWindow(result)
        } else {
          this.mixinApiErrorHandler({ status }) // throw to error handler if status is not 'OK'
        }
      })
    },
    setInfoWindow (result) {
      const position = result.routes[0].overview_path[result.routes[0].overview_path.length / 3]
      let totalDistance = 0
      let totalTime = 0
      result.routes[0].legs.forEach(value => {
        totalDistance += value.distance.value
        totalTime += value.duration.value
      })

      this.infoWindowObj.setContent('<b>' + this.$t('routeResultLabelGoogle') + '</b><br />' + this.$t('totalDistance') + ' ' + totalDistance + '<br />' + this.$t('totalTime') + ' ' + totalTime)
      this.infoWindowObj.setPosition(position)
      this.infoWindowObj.open(this.map)
    }
  },

  render () {
    return this.directionsServiceObj
  }
}
</script>
