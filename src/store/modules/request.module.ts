import { Commit, Dispatch } from 'vuex'
import axiosRequest from '@/axios/request'
import store from '../index'

export interface IRequest {
  fio: string;
  phone: string;
  amount: number;
  status: 'done' | 'cancelled' | 'active' | 'pending';
}

interface State {
  requests: IRequest[]
}

const state: State = {
  requests: []
}

export default {
  namespaced: true,
  state,
  getters: {
    requests(state: State) {
      return state.requests
    }
  },
  mutations: {
    setRequests(state: State, requests: IRequest[]) {
      state.requests = requests
    },
    addRequest(state: State, request: IRequest) {
      state.requests.push(request)
    }
  },
  actions: {
    async create({ commit, dispatch }: { commit: Commit, dispatch: Dispatch }, request: IRequest) {
      try {
        const token = store.getters['auth/token']
        const { data } = await axiosRequest.post(`/requests.json?auth=${token}`, request)
        commit('addRequest', { ...request, id: data.name })
        dispatch('setMessage', {
          type: "primary",
          value: "Заявка успешно создана"
        }, { root: true })
      } catch (e) {
        dispatch('setMessage', {
          type: "danger",
          value: "Ошибка добавления заявки"
        }, { root: true })
      }
    }
  }
}
