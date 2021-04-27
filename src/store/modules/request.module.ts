import { Commit, Dispatch } from 'vuex'
import axiosRequest from '@/axios/request'
import store from '../index'

export interface IRequest {
  id: string;
  fio: string;
  phone: string;
  amount: number;
  status: string;
}

interface State {
  requests: IRequest[],
  request: IRequest | null
}

const state: State = {
  requests: [],
  request: null
}

export default {
  namespaced: true,
  state,
  getters: {
    requests(state: State) {
      return state.requests
    },
    request(state: State) {
      return state.request
    }
  },
  mutations: {
    setRequest(state: State, request: IRequest) {
      state.request = request
    },
    setRequests(state: State, requests: IRequest[]) {
      state.requests = requests
    },
    addRequest(state: State, request: IRequest) {
      state.requests.push(request)
    },
    changeStatus(state: State, status: string) {
      state.request = { ...state.request, status } as IRequest
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
    },
    async load({ commit, dispatch }: { commit: Commit, dispatch: Dispatch }) {
      try {
        const token = store.getters['auth/token']
        const { data } = await axiosRequest.get(`/requests.json?auth=${token}`)
        const transformData = Object.keys(data).map((key: string) => ({ ...data[key], id: key }))
        commit('setRequests', transformData)
      } catch (e) {
        dispatch('setMessage', {
          type: "danger",
          value: "Ошибка загрузки заявок"
        }, { root: true })
      }
    },
    async loadById({ commit, dispatch }: { commit: Commit, dispatch: Dispatch }, id: string) {
      try {
        const token = store.getters['auth/token']
        const { data } = await axiosRequest.get(`/requests/${id}.json?auth=${token}`)
        if (!data) {
          throw new Error('Нет такого ID')
        }
        const transformData = { ...data, id }
        commit('setRequest', transformData)
      } catch (e) {
        dispatch('setMessage', {
          type: "danger",
          value: "Ошибка загрузки заявки"
        }, { root: true })
      }
    },
    async remove({ dispatch }: { dispatch: Dispatch }, id: string) {
      try {
        const token = store.getters['auth/token']
        await axiosRequest.delete(`/requests/${id}.json?auth=${token}`)
        dispatch('setMessage', {
          type: "primary",
          value: "Заявка успешно удалена"
        }, { root: true })
      } catch (e) {
        dispatch('setMessage', {
          type: "danger",
          value: "Ошибка при удалении заявки"
        }, { root: true })
        throw new Error()
      }
    },
    async update({ dispatch }: { dispatch: Dispatch }, { id, status }: { id: string, status: string }) {
      try {
        const token: string = store.getters['auth/token']
        const { data } = await axiosRequest.patch(`/requests/${id}.json?auth=${token}`, {
          status
        })
        dispatch('setMessage', {
          type: "primary",
          value: 'Статус заявки успешно изменен'
        }, { root: true })
        return { ...data, id }
      } catch (e) {
        dispatch('setMessage', {
          type: "danger",
          value: "Ошибка при изменении статуса"
        }, { root: true })
      }
    }
  }
}
