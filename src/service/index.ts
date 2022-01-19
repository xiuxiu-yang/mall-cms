import CtRequest from './request/request'
import { BASE_URL } from './request/config'
import LocalCache from '@/utils/setCache'

const ctRequest = new CtRequest({
  baseURL: BASE_URL,
  showLoading: false,
  interceptors: {
    requestInterceptor(config) {
      // 携带token拦截
      const token = LocalCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    responceInterceptor(config) {
      return config
    }
  }
})

export default ctRequest
