import Api from '@/services/Api'

const state = {
  ready: [],
  data: [],
  loggedIn: true,
  isSubscribed: false
}

// getters
const getters = {
  auth (state) {
    return state.user
  }

}

// actions
const actions = {
  getSettings (context) {
    console.log('getSettings')
    return Api().get('/settings/')
      .then(response => {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

}

// mutations
const mutations = {

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
