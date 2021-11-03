import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
// eslint-disable-next-line no-unused-vars
import { getRefreshToken, getToken } from '@/utils/auth'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// create an axios instance
const service = axios.create({
  baseURL: process.env['VUE_APP_BASE_API '], // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor (拦截器)
service.interceptors.request.use(
  // 在发送请求之前做些什么
  config => {
    if (store.getters.token) {
      config.headers.Authorization = getToken()
    }
    return config
  },
  // 对请求错误做些什么
  error => {
    return Promise.reject(error)
  }
)

let refreshing = false // 正在刷新标识，避免重复刷新
let waitQueue = [] // 请求等待队列

// response interceptor (拦截器)
service.interceptors.response.use(
  // 对响应数据做点什么
  ({ data }) => {
    const { code, msg } = data
    if (code === '00000') {
      return data
    } else {
      Message({
        message: msg || '系统出错',
        type: 'error'
      })
      return Promise.reject(new Error(msg || 'Error'))
    }
  },
  // 对响应错误做点什么
  error => {
    const config = error.config
    // eslint-disable-next-line no-unused-vars
    const { code, msg } = error.response.data
    // access_token过期，尝试续期token
    if (code === '0230') {
      if (refreshing === false) {
        // 切换正在刷新标识
        refreshing = true

        const refreshToken = getRefreshToken()
        return store.dispatch('user/refreshToken', refreshToken).then((token) => {
          config.headers.Authorization = token
          config.baseURL = '' // 请求重试时，url已包含baseURL
          waitQueue.forEach(callback => callback(token)) // 已成功刷新token，队列中的所有请求重试
          waitQueue = []
          return service(config)
        }).catch(() => { // token续期失败
          MessageBox.confirm(
            '当前页面已失效，请重新登录', '确认退出', {
              confirmButtonText: '重新登录',
              cancelButtonText: '取消',
              type: 'warning'
            }
          ).then(() => {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          })
        }).finally(() => {
          refreshing = false
        })
      } else {
        return new Promise(resolve => {
          waitQueue.push((token) => {
            config.headers.Authorization = token
            config.baseURL = ''
            resolve(service(config))
          })
        })
      }
    } else if (code === '0231') {
      Message({
        message: '很不辛，您已被管理员强制下线',
        type: 'error'
      })
      store.dispatch('user/resetToken').then(() => {
        location.reload()
      })
    } else {
      Message({
        message: msg || '系统出错',
        type: 'error'
      })
      return Promise.reject(new Error(msg || 'Error'))
    }
  }
)

export default service
