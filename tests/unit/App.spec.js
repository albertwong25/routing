import Vuetify from 'vuetify'
import App from '@/App'
import store from '@/store'
import axios from 'axios'
import { shallowMount, createLocalVue } from '@vue/test-utils'

jest.mock('axios')
const localVue = createLocalVue()

describe('App.vue', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('submit user input to api - success', async () => {
    const wrapper = shallowMount(App, {
      localVue,
      vuetify,
      store,
      mocks: {
        $api: {
          getToken: (route) => axios.post('/route', route)
        }
      }
    })

    axios.post.mockResolvedValue({
      status: 'success',
      data: {
        token: 'testing-token'
      }
    })

    const data = {
      origin: 'Hoi Shing Rd, Chai Wan Kok',
      destination: 'Man Yiu St, Central'
    }
    wrapper.vm.setRoute(data)
    wrapper.vm.submitRoute()
    await wrapper.vm.$nextTick()

    expect(axios.post).toHaveBeenCalledWith('/route', data)
  })

  it('submit user input to api - failure', async () => {
    const wrapper = shallowMount(App, {
      localVue,
      vuetify,
      store,
      mocks: {
        $api: {
          getToken: (route) => axios.post('/route', route)
        }
      }
    })

    axios.post.mockRejectedValue(new Error('server error'))

    const data = {
      origin: 'Hoi Shing Rd, Chai Wan Kok',
      destination: 'Man Yiu St, Central'
    }
    wrapper.vm.setRoute(data)
    wrapper.vm.submitRoute()
    await wrapper.vm.$nextTick()

    expect(axios.post).toHaveBeenCalledWith('/route', data)
  })

  it('submit token to get waypoints - success', async () => {
    const wrapper = shallowMount(App, {
      localVue,
      vuetify,
      store,
      mocks: {
        $api: {
          getWaypoints: (token) => axios.get(`/route/${token}`)
        }
      }
    })

    axios.get.mockResolvedValue({
      status: 'success',
      data: {
        path: [
          ['22.372081', '114.107877'],
          ['22.326442', '114.167811'],
          ['22.284419', '114.159510']
        ],
        totalDistance: 20000,
        totalTime: 1800
      }
    })

    const token = 'testing-token'
    wrapper.vm.setToken(token)
    wrapper.vm.submitToken()
    await wrapper.vm.$nextTick()

    expect(axios.get).toHaveBeenCalledWith(`/route/${token}`)
  })

  it('submit token to get waypoints - failure', async () => {
    const wrapper = shallowMount(App, {
      localVue,
      vuetify,
      store,
      mocks: {
        $api: {
          getWaypoints: (token) => axios.get(`/route/${token}`)
        }
      }
    })

    axios.get.mockRejectedValue(new Error('server error'))

    const token = 'testing-token'
    wrapper.vm.setToken(token)
    wrapper.vm.submitToken()
    await wrapper.vm.$nextTick()

    expect(axios.get).toHaveBeenCalledWith(`/route/${token}`)
  })
})
