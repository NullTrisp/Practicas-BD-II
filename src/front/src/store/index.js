import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInSession: "",
    isAdmin: false
  },
  mutations: {
    login(state, userData) {
      state.userInSession = userData.username,
        state.isAdmin = userData.isAdmin
    },
    logout(state) {
      state.userInSession = "",
        state.isAdmin = false
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
