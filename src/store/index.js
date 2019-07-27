import Vue from 'vue'
import Vuex from 'vuex'
import troisd from './modules/troisd'
import user from './modules/user'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    troisd,
    user
  }
})
