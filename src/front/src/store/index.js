import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInSession: ""
  },
  mutations: {
    login(state, user) {
      state.userInSession = user
    },
    logout(state) {
      state.userInSession = ""
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
