import type { AxiosRequestConfig, AxiosResponse } from 'axios'

interface CtRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responceInterceptor?: (config: T) => T
  responceInterceptorCatch?: (err: any) => any
}

interface CTRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: CtRequestInterceptors<T>
  showLoading?: boolean
}

export { CtRequestInterceptors, CTRequestConfig }
