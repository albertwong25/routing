<template>
  <v-container px-0>
    <v-row
      dense
    >
      <v-col
        :class="hide ? 'd-none' : 'd-block'"
        class="elevation-3 white"
        cols="11"
      >
        <v-row
          dense
        >
          <v-col
            cols="10"
          >
            <v-combobox
              v-for="item in ['origin', 'destination']"
              :key="item"
              :ref="item"
              v-model="route[item].text"
              :items="route[item].autocomplete"
              :search-input.sync="route[item].text"
              :disabled="isLoading"
              :label="$t(`${item}Label`)"
              append-icon=""
              class="ma-2"
              color="deep-orange"
              clear-icon="clear"
              clearable
              dense
              hide-details
              hide-no-data
              hide-selected
              outlined
              @blur="resetAutoComplete(item)"
              @click:clear="resetRoute(item)"
              @input="updateRoute(item)"
              @input.native="updateRoute(item)"
            />
          </v-col>

          <v-col
            class="ma-auto"
            cols="2"
          >
            <v-btn
              :disabled="isLoading"
              icon
              @click="swapInput"
            >
              <v-icon>
                swap_vert
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-row
          justify="end"
          dense
        >
          <v-btn
            :disabled="!route.origin.text || !route.destination.text || isLoading"
            class="white--text ma-2"
            color="deep-orange"
            @click="submitRoute"
          >
            {{ $t('submitButton') }}
          </v-btn>

          <v-btn
            :disabled="isLoading"
            class="ma-2"
            @click="resetInput"
          >
            {{ $t('resetButton') }}
          </v-btn>
        </v-row>

        <div
          v-if="dataRouteResult.status"
          class="ma-2"
        >
          <div
            v-if="dataRouteResult.status === 'success'"
          >
            <div
              class="font-weight-bold"
            >
              {{ $t('routeResultLabelApi') }}
            </div>
            <div
              class="pl-3"
            >
              {{ $t('totalDistance') + ' ' + getWaypoints.totalDistance }}
            </div>
            <div
              class="pl-3"
            >
              {{ $t('totalTime') + ' ' + getWaypoints.totalTime }}
            </div>
          </div>
          <div
            v-else
            class="red--text"
          >
            {{ dataRouteResult.message }}
          </div>
        </div>

        <v-progress-linear
          :active="isLoading"
          color="deep-orange"
          indeterminate
        />
      </v-col>
      <v-col
        class="pa-0"
        cols="1"
      >
        <v-btn
          class="pa-0"
          color="white"
          elevation="3"
          min-width="auto"
          absolute
          @click="hideSearch"
        >
          <v-icon>
            {{ hide ? 'arrow_right' : 'arrow_left' }}
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Search',

  props: {
    dataAutocomplete: { // get autocomplete description from google map place
      type: Object,
      default: () => {}
    },
    dataRouteResult: { // get route result from api call
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      hide: false,
      route: { // local copy of user input and autocomplete
        origin: {
          text: '',
          autocomplete: []
        },
        destination: {
          text: '',
          autocomplete: []
        }
      }
    }
  },

  computed: {
    ...mapGetters([
      'getWaypoints',
      'isLoading'
    ])
  },

  watch: {
    // watch change and set local copy of autocomplete
    dataAutocomplete: {
      handler (newVal) {
        this.setAutocomplete(newVal)
      },
      deep: true
    }
  },

  methods: {
    hideSearch () {
      this.hide = !this.hide
    },
    updateRoute (index) {
      // emit user input to store
      this.$emit('update:route', {
        [index]: this.route[index].text
      })

      // emit user input to google map place, prevent null value error
      if (typeof this.route[index].text === 'string' && this.route[index].text.length > 0) {
        this.$emit('update:autocomplete', {
          index,
          text: String(this.route[index].text)
        })
      } else {
        this.resetRoute(index)
      }
    },
    resetRoute (index) {
      this.route[index] = {
        text: '',
        autocomplete: []
      }
      // reset user input in store (single input field)
      this.$emit('update:route', {
        [index]: this.route[index].text
      })
    },
    swapInput () {
      this.route = {
        origin: {
          text: this.route.destination.text,
          autocomplete: []
        },
        destination: {
          text: this.route.origin.text,
          autocomplete: []
        }
      }
      const swap = {
        origin: this.route.origin.text,
        destination: this.route.destination.text
      }
      // swap user input in store
      this.$emit('update:route', swap)
    },
    resetInput () {
      const reset = {}
      for (const index in this.route) {
        this.route[index] = {
          text: '',
          autocomplete: []
        }
        reset[index] = this.route[index].text
      }
      // reset user input in store (multi input fields)
      this.$emit('update:route', reset)
    },
    submitRoute () {
      // emit confirmation to trigger api call
      this.$emit('submit:route')
    },
    // set local copy of autocomplete
    setAutocomplete (autocomplete) {
      this.route[autocomplete.index].autocomplete = autocomplete.description
    },
    // reset local copy of autocomplete
    resetAutoComplete (index) {
      this.route[index].autocomplete = []
    }
  }
}
</script>

<style lang='sass' scoped>
$breakpoint-xs: 600px

@mixin xs-min
  @media all and (min-width: $breakpoint-xs)
    @content

.container
  position: absolute
  z-index: 1

  @include xs-min
    max-width: 33.3%
    min-width: 260px

  .col
    border-radius: 10px

  .v-progress-linear
    top: 4px
</style>
