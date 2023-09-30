import axios, { AxiosError } from 'axios'
import { message } from './AntdGlobal'
import { hideLoading, showLoading } from '@/utils/loading'
import storage from './storage'
import env from '../config'
import { Result } from '@/types/api'

const instance = axios.create({
  timeout: 8000,
  timeoutErrorMessage: '请求超时,请稍后重试',
  withCredentials: true,
  headers: {
    icode: '5B2EB9524BE49CBA'
  }
})

// 请求拦截器,传入两个函数，一个是成功的回调，一个是失败的回调,
// 成功回调的参数是config，失败回调的参数是error
instance.interceptors.request.use(
  config => {
    // config是请求的配置对象，是可以修改的,结构是：{data,headers,method,url}
    if (config.showLoading) showLoading()
    const token = storage.get('token')
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    if (env.mock) {
      config.baseURL = env.mockApi
    } else {
      config.baseURL = env.baseApi
    }

    // 这里不能直接返回config，否则会报错，因为这里的返回值会作为下一个then的参数
    return {
      ...config
    }
  },
  // 请求失败的回调
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
// 传入两个函数，一个是成功地回调，一个是失败的回调,
instance.interceptors.response.use(
  response => {
    const data: Result = response.data
    // 为什么要在这里隐藏loading呢？因为这里是所有请求的响应拦截器，只要请求成功了，就会执行这里的回调
    hideLoading()
    // 如果code不是0，说明请求失败了，这里统一处理错误
    // 后端约定接口 500001，说明token过期了，这里统一处理token过期
    if (data.code === 500001) {
      message.error(data.msg)
      storage.remove('token')
      // 跳转到登录页，登录成功后，还要跳转到之前的页面
      location.href = '/login?callback=' + encodeURIComponent(location.href)
    } else if (data.code !== 0) {
      if (response.config.showError === false) {
        return Promise.reject(data)
      } else {
        message.error(data.msg)
        return Promise.reject(data)
      }
    }
    // 如果请求成功了，就返回data.data,第一个data是响应对象,大概是这样的：{data:{code:0,data:{}}}
    // 第二个data才是后端返回的数据
    return data.data
  },
  error => {
    // 这里也要隐藏loading,因为请求失败了，不会执行响应拦截器的成功回调
    hideLoading()
    message.error(error.message)
    return Promise.reject(error.message)
  }
)

interface IConfig {
  showLoading?: boolean
  showError?: boolean
}

export default {
  get<T>(
    url: string,
    params?: object,
    options: IConfig = {
      showLoading: true,
      showError: true
    }
  ): Promise<T> {
    return instance.get(url, { params, ...options })
  },
  post<T>(
    url: string,
    params?: object,
    options: IConfig = {
      showLoading: true,
      showError: true
    }
  ): Promise<T> {
    return instance.post(url, params, options)
  }
}
