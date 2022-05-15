import { createStore, createLogger } from 'vuex'
import auth from './modules/auth.module'
import requests from './modules/requests.module'

const plugins = []

if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger())
}

export default createStore({
  plugins,
  state() {
    return {
      message: null,
      sidebar: false
    }
  },

  actions: {
    setMessage ({ commit }, message) {
      commit('SET_MESSAGE', message)
      setTimeout(() => {
        commit('CLEAR_MESSAGE')
      }, 5000)
    }
  },

  mutations: {
    SET_MESSAGE (state, message) {
      state.message = message
    },
    CLEAR_MESSAGE (state) {
      state.message = null
    },
    OPEN_SIDEBAR (state) {
      state.sidebar = true
    },
    CLOSE_SIDEBAR (state) {
      state.sidebar = false
    }
  },

  modules: {
    auth,
    requests
  }
})
