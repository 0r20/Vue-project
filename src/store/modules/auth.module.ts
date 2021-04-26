import { Commit, Dispatch } from 'vuex'
import axios from 'axios'
import { error } from '@/utils/error'

const TOKEN_KEY = 'jwt-token'

export interface IUser {
  email: string,
  password: string
}

interface State {
  token: string | null;
}

const state: State = {
  token: localStorage.getItem(TOKEN_KEY)
}

export default {
  namespaced: true,
  state,
  getters: {
    token(state: State) {
      return state.token
    },
    isAuthenticated(state: State) {
      return !!state.token
    }
  },
  mutations: {
    setToken(state: State, token: string) {
      state.token = token
      localStorage.setItem('jwt-token', token)
    },
    logout(state: State) {
      state.token = null
      localStorage.removeItem('jwt-token')
    }
  },
  actions: {
    async login({ commit, dispatch }: { commit: Commit, dispatch: Dispatch }, payload: IUser) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
        const { data } = await axios.post(url, { ...payload, returnSecureToken: true })
        const token = data.idToken
        commit('setToken', token)
        commit('clearMessage', null, { root: true })
      } catch (e) {
        dispatch('setMessage', {
          value: error(e.response.data.error.message),
          type: 'danger'
        }, { root: true })
        throw new Error()
      }
    }
  }
}
