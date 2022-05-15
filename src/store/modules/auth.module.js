import axios from 'axios'
import { error } from '../../utils/error'
const TOKEN_KEY = 'jwt-token'

export default {
  namespaced: true,
  state () {
    return {
      token: localStorage.getItem(TOKEN_KEY)
    }
  },
  getters: {
    token(state) {
      return state.token
    },
    isAuthenticated(_, getters) {
      return !!getters.token
    }
  },
  actions: {
    async login ({ commit, dispatch }, payload) {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
      try {
        const { data } = await axios.post(url, { ...payload, returnSecureToken: true })
        commit('SET_TOKEN', data.idToken)
        commit('CLEAR_MESSAGE', null, { root: true })
      } catch (err) {
        dispatch('setMessage', {
          value: error(err.response.data.error.message),
          type: 'danger'
        }, { root: true })
        console.log('login err: ', error(err.response.data.error.message))
        throw new Error(err)
      }
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
      localStorage.setItem(TOKEN_KEY, token)
    },
    LOGOUT(state) {
      state.token = null
      localStorage.removeItem(TOKEN_KEY)
    }
  }
}
