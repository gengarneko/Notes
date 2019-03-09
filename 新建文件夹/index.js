// 封装 ajax 请求

import axios from 'axios'

const API_ROT = ''

axios.default.baeURL = API_ROOT
// 使用 json 格式的传输
axios.default.headers.Accept = 'application/json' = API_ROOT
// 当前请求为跨域类型时是否在请求中携带 cookie
axios.default.withCredentials = true

// 添加拦截器
axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  return response
}, function () {
  let error = {
    data: {
      msg: '请求出错'
    }
  }
  return Promise.reject(error)
})

export default {
}