import axios from '../../axios/request'
import store from '../index'

export default {
  namespaced: true,
  state () {
    return {
      requests: []
    }
  },
  getters: {
    requests(state) {
      return state.requests
    }
  },
  actions: {
    async create ({ commit, dispatch }, payload) {
      try {
        const token = store.getters['auth/token']
        const { data } = await axios.post(`/requests.json?auth=${token}`, payload)
        commit('ADD_REQUEST', { ...payload, id: data.name })
        dispatch('setMessage', {
          value: 'Request successfully created',
          type: 'primary'
        }, { root: true })
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, { root: true })
      }
    },
    async load ({ commit, dispatch }) {
      try {
        const token = store.getters['auth/token']
        const { data } = await axios.get(`/requests.json?auth=${token}`)
        const requests = Object.keys(data).map(id => ({ ...data[id], id }))
        commit('SET_REQUESTS', requests)
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, { root: true })
      }
    },
    async loadOne ({ dispatch }, id) {
      try {
        const token = store.getters['auth/token']
        const { data } = await axios.get(`/requests/${id}.json?auth=${token}`)
        return data
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, { root: true })
      }
    },
    async updateOne ({ dispatch }, request) {
      try {
        const token = store.getters['auth/token']
        await axios.put(`/requests/${request.id}.json?auth=${token}`, request)
        dispatch('setMessage', {
          value: 'Request status updated',
          type: 'primary'
        }, { root: true })
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, { root: true })
      }
    },
    async removeOne ({ dispatch }, id) {
      try {
        const token = store.getters['auth/token']
        await axios.delete(`/requests/${id}.json?auth=${token}`)
        dispatch('setMessage', {
          value: 'Request deleted',
          type: 'primary'
        }, { root: true })
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, { root: true })
      }
    }
  },
  mutations: {
    SET_REQUESTS(state, requests) {
      state.requests = requests
    },
    ADD_REQUEST(state, request) {
      state.requests.push(request)
    }
  }
}
