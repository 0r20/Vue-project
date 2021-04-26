import { createStore, createLogger } from 'vuex'
import auth from './modules/auth.module'

const plugins = []

if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger())
}

export interface IMessage {
  value: string,
  type: 'danger'
}
interface State {
  message: IMessage | null
}

const state: State = {
  message: null
}

export default createStore({
  plugins,
  state() {
    return state
  },
  mutations: {
    setMessage(state: State, message: IMessage) {
      state.message = message
    },
    clearMessage(state: State) {
      state.message = null
    },
  },
  actions: {
    setMessage({ commit }, message: IMessage) {
      commit('setMessage', message)
      setTimeout(() => {
        commit('clearMessage')
      }, 5000)
    }
  },
  modules: {
    auth
  }
})
