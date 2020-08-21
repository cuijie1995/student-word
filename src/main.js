import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n


import { Row, Col, Switch, Button, PasswordInput, NumberKeyboard, Field, Tag, Toast } from 'vant';

Vue.use(Row).use(Col).use(Switch).use(Button).use(PasswordInput).use(NumberKeyboard).use(Field).use(Tag).use(Toast);

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'


import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

import axios from 'axios'
axios.defaults.withCredentials = true


import '@/permission' // permission control


import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}


Vue.use(ElementUI, { locale });

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
