<template>
  <v-snackbar
    v-model="snackbar"
    :timeout="timeout"
    :color="getSnackbar.type"
    top
  >
    <v-alert
      :type="getSnackbar.type"
      :value="true"
      class="ma-0 pa-0"
    >
      <template #prepend>
        <v-icon
          class="mr-4 my-auto"
        >
          {{ getSnackbar.type }}
        </v-icon>
      </template>
      <span>
        {{ getSnackbar.text }}
      </span>
      <template #close>
        <v-icon
          class="ml-4 my-auto"
          @click="close"
        >
          close
        </v-icon>
      </template>
    </v-alert>
  </v-snackbar>
</template>

<script>
import { snackbarCfg } from '@/config'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Snackbar',

  computed: {
    ...mapGetters([
      'getSnackbar'
    ]),
    timeout () {
      return snackbarCfg.timeout
    },
    snackbar: {
      get () {
        return this.getSnackbar.show
      },
      set () {
        this.close()
      }
    }
  },

  methods: {
    ...mapActions([
      'setSnackbar'
    ]),
    close () {
      this.setSnackbar({
        text: '',
        type: 'error',
        show: false
      })
    }
  }
}
</script>

<style lang='sass' scoped>
.v-snack
  ::v-deep &__content
    justify-content: center

    .v-alert
      &__icon
        margin: auto 16px auto 0
</style>
