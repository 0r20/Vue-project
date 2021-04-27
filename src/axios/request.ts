import axios from 'axios'
import store from '@/store'
import router from '@/router'

const axiosRequest = axios.create({
  baseURL: process.env.VUE_APP_FB_URL
})

axiosRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      store.commit('auth/logout')
      router.push('/auth')
    }
    return Promise.reject(error);
  });

export default axiosRequest