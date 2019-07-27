import Api from '@/services/Api'

const state = {
  ready: [],
  scenes: [],
  data: []
}

// getters
const getters = {

}

// actions
const actions = {
  getScenes (context) {
    console.log('getScenes')
    return Api().get('/3d/scenes')
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
