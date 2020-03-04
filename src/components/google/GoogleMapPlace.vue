<script>
import { mapActions } from 'vuex'
import { mapPlaceCfg } from '@/config'

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
    autocomplete: {
      type: String,
      default: '',
      required: true
    }
  },

  data () {
    return {
      sessionToken: null, // use place session token to reduce charge
      autocompleteServiceObj: null // renderering autocomplete information to search box
    }
  },

  watch: {
    // watch user input change and get autocomplete
    autocomplete: {
      handler (newVal) {
        if (newVal.length > 0) {
          this.setAutocomplete()
        }
      },
      deep: true
    }
  },

  mounted () {
    this.initPlace()
  },

  methods: {
    ...mapActions([
      'setSnackbar'
    ]),
    initPlace () {
      const { AutocompleteSessionToken, AutocompleteService } = this.google.maps.places

      this.sessionToken = new AutocompleteSessionToken()
      this.autocompleteServiceObj = new AutocompleteService()
    },
    setAutocomplete () {
      const { LatLng } = this.google.maps
      const location = new LatLng(mapPlaceCfg.location)

      this.autocompleteServiceObj.getPlacePredictions({
        ...mapPlaceCfg,
        input: this.autocomplete,
        sessionToken: this.sessionToken,
        location: location
      }, (result, status) => {
        if (status === 'OK') {
          this.$emit('update:autocomplete', {
            description: result.map(value => {
              return value.description
            })
          })
        } else {
          // this.mixinGoogleErrorHandler({ status })
          // not necessary to inform user even autocomplate call failed
        }
      })
    }
  },

  render () {
    return this.autocompleteServiceObj
  }
}
</script>
