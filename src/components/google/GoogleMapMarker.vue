<script>
import { mapMarkerCfg } from '@/config'

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
    bounds: {
      type: Object,
      default: () => {},
      required: true
    },
    marker: {
      type: Object,
      default: () => {},
      required: true
    }
  },

  data () {
    return {
      markerObj: null // renderering marker in map
    }
  },

  mounted () {
    this.initMarker()
  },

  methods: {
    initMarker () {
      const { Marker, LatLng } = this.google.maps
      const position = new LatLng(this.marker.position)

      this.markerObj = new Marker({
        position: position,
        marker: this.marker,
        map: this.map,
        label: {
          ...mapMarkerCfg.label,
          text: this.marker.id
        }
      })

      // prevent duplicate position of bounds
      if (!this.bounds.contains(position)) {
        this.bounds.extend(position)
        this.map.fitBounds(this.bounds)
        this.map.panToBounds(this.bounds)
      }
    }
  },

  render () {
    return this.markerObj
  }
}
</script>
