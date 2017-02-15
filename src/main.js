import Vue from 'vue'
import App from './App'
import routers from './router'
import store from './store'
import Element from 'element-ui'
import vueResource from 'vue-resource'
import './style/common.less'
import './style/variables.less'
import { Notifiy, loading, loadingHide } from './utils/toast'

Vue.use(vueResource)
Vue.use(Element)

  // 提供公用的vueResource方法
Vue.http.interceptors.push((request, next) => {
  // 这里解决跨域问题
  request.credentials = true
  // 加loading
  loading()

  // 请求发送前的处理逻辑
  var localStorage = window.localStorage
  if (localStorage && localStorage.userInfo && !request.params.token) {
    var userInfo = JSON.parse(localStorage.userInfo)
    request.params.uid = userInfo.uid
  }

  next((response) => {
    loadingHide()
    if (response.data && response.data.code === '0') {
      console.log(response.data.code + '------------')
      console.log(JSON.stringify(response.data.data) + '------------')
      response.code = response.data.code
      response.data = response.data.data
    } else {
      if (response.data && response.data.message) {
        Notifiy('错误', response.data.message, 'error')
        response.message = response.data.message
        response.code = response.data.code
        // return {...response.body, ok: false}
      } else if (response.data && response.data.code) {
        response.code = response.data.code
      } else {
        // 下载文件，如果是Blob类型数据，则是下载
        Notifiy('错误', '请求出错', 'error')
      }
    }
  })
})
new Vue({
  store,
  router: routers,
  components: {
    // chart: ECharts
  },
  ...App
}).$mount('#app')
