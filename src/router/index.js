import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/main'
import Home from '../views/home/home'
import Login from '../views/login'

import VueOrder from '../views/vue/vue_home'

import ReportsOrder from '../views/reports/order'
import ReportsProduct from '../views/reports/product'

import ElementInfo from '../views/element/element'
Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [{
    path: '/',
    component: Main,
    children: [
      { path: '/', component: Home },
      { path: '/home', component: Home },
      // vue
      { path: '/vue/order', component: VueOrder },
      // 数据报表
      { path: '/reports/order', component: ReportsOrder },
      { path: '/reports/product', component: ReportsProduct },
      // element
      { path: '/element/info', component: ElementInfo }
    ]
  }, {path: '/firewall/login', component: Login}
  ]})

// 路由拦截
router.beforeEach((to, from, next) => {
  var userInfo = {}
  if (window.localStorage && window.localStorage.userInfo) {
    userInfo = JSON.parse(window.localStorage.userInfo)
  }
  let Interception = false
  // 路由加 firewall 是不拦截的url
  if (to.path.indexOf('firewall') > 0) {
    Interception = true
  }
  if (Interception) {
    next()    // next() 方法是继续
  } else if (userInfo.uid) { // 用户没登录跳转登录页面
    next()
  } else { // 跳转登陆页面
    next()
    // next({
    //   path: '/firewall/login',
    //   query: {redirect: to.fullPath} // 登陆成功后跳转到之前的页面
    // })
  }
})
export default router
