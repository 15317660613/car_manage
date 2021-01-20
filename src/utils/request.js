import axios from 'axios'
import {Message} from 'element-ui'
import qs from 'qs'

// create an axios instance
const service = axios.create({
  baseURL: '/auto-appstore/bigdata/api', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 3600000 // request timeout
})
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (config.method === 'get') {
      config.paramsSerializer = function(params) {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      };
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  // 请求成功
  res => {
    if (res.status === 200) {
      if(res.data instanceof Blob){
         return Promise.resolve(res)
      }
      if (res.data.ok) {
        return Promise.resolve(res.data)
      } else {
        // if (res.config.url === '/api/airport/CarRemote/stop' || res.config.url === '/api/airport/CarRemote/run' || res.config.url === '/api/airport/CarRemote/turn') {
        //
        // } else {
        Message.error(res.data.message)
        // }
        return Promise.reject(res.data)
      }
    } else {
      return Promise.reject(res.data)
    }
  },
  // 请求失败
  error => {
    const {
      response
    } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      return Promise.reject(response)
    } else {
      Message.error('请求失败，请检查您的网络状态')
    }
  }
)

export default service
