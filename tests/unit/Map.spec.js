import Vuetify from 'vuetify'
import Map from '@/components/Map'
import GoogleMapLoader from '@/components/google/GoogleMapLoader'
import store from '@/store'
import { mount, createLocalVue } from '@vue/test-utils'

const localVue = createLocalVue()

describe('Map.vue', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('get waypoints and submit to Google map', async () => {
    const wrapper = mount(Map, {
      localVue,
      vuetify,
      store
    })

    store.dispatch('setWaypoints', {
      path: [
        ['22.372081', '114.107877'],
        ['22.326442', '114.167811'],
        ['22.284419', '114.159510']
      ],
      totalDistance: 20000,
      totalTime: 1800
    })
    wrapper.find(GoogleMapLoader).vm.initMap()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.markers.length).toEqual(wrapper.vm.getWaypoints.path.length)
  })
})
