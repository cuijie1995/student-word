import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import Cookies from "js-cookie";
import { nextTick } from 'q';

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 500000,// request timeout
  //headers:{"Content-Type":"application/json"}

})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['token'] = getToken()
    return config
  },
  error => {
    return Promise.reject(error)
  }
)



// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.success) {
      return res;
    } else {
      return res;
    }
  },
  error => {
    if (error.response) {
      if (error.response.status == 401) {

        MessageBox.confirm('你的登录已过期，请重新登录', '重新登录', {
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          Cookies.remove("Token");
          location.reload()
        })

      }

    } else if (error.request) {
    } else {
    }

    return Promise.reject(error)
  },
)

export default service
