import Vue from 'vue'

export default {
  getToken (route) {
    return Vue.$axios.post('/route', route)
  },
  getWaypoints (token) {
    return Vue.$axios.get(`/route/${token}`)
  }
}
