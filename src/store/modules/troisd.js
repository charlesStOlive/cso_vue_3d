import Api from '@/services/Api'

const state = {
  scenes_ready: false,
  scenes: [],
  scene_ready: false,
  scene: [],
  data: []
}

// getters
const getters = {
  scenes: state => {
    return state.scenes;
  },
  scenes_ready: state => {
    return state.scenes_ready;
  },
  scene: state => {
    return state.scenes;
  },
  scene_ready: state => {
    return state.scene_ready;
  },
}

// actions
const actions = {
  getScenes({ commit }) {
    return Api().get('/3d/scenes')
      .then(response => {
        commit('set_scenes', response.data);
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  getScene({ commit }, slug) {
    return Api().get('/3d/scenes/' + slug)
      .then(response => {
        commit('set_scene', response.data);
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

// mutations
const mutations = {
  set_scenes: (state, datas) => {
    state.scenes = datas
    state.scenes_ready = true

  },
  set_scene: (state, datas) => {
    state.scene = datas
    state.scene_ready = true
  },

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
