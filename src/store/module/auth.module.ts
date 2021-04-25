import { Commit } from 'vuex'

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
    async login({ commit }: { commit: Commit }, payload: IUser) {
      commit('setToken', 'Test token')
    }
  }
}