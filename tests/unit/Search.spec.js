import Vuetify from 'vuetify'
import Search from '@/components/Search'
import store from '@/store'
import { shallowMount, createLocalVue } from '@vue/test-utils'

const localVue = createLocalVue()

describe('Search.vue', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('get user input', () => {
    const wrapper = shallowMount(Search, {
      localVue,
      vuetify,
      store,
      propsData: {
        dataRouteResult: {
          status: 'success'
        }
      }
    })

    wrapper.find({ ref: 'origin' }).element.value = 'Hoi Shing Rd, Chai Wan Kok'
    wrapper.find({ ref: 'destination' }).element.value = 'Man Yiu St, Central'
    wrapper.vm.$emit('submit:route')

    expect(wrapper.emitted()['update:route'])
  })
})
