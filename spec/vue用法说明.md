此项目主要用于pc端

前端框架是vue2.0 + less + javaScript

学习网址
https://vuefe.cn/
http://element.eleme.io/#/component/notification

### 项目环境说明

需安装node环境

### 项目技术说明

一、用到的插件
1.vue-router 作为前端路由

2.vue-resource 代替ajax向后台请求数据

3.element-ui vue2.0的UI插件 其中用到的插件有
    1.日期插件，
    2.分页
    3.下拉框
    4.上传文件
    5.toast提示（成功，提示，失败）
    6.loading

4.七牛云上传图片
5.echarts 绘制图表插件（echarts: ^3.2.3）

二、插件用法说明
1.vue-router
  1）路径 src/router/index.js,整个项目只有一个路由配置文件
    先在页面引用 需要的js（vue、vue-router）

    import Vue from 'vue'
    import VueRouter from 'vue-router'

    // 引用页面方式  
    import Invite from '../views/home'
    import Login from '../views/login'
    import Register from '../views/register'
    // 开始使用
    Vue.use(VueRouter)

    const router = new VueRouter({
      mode: 'history',
      scrollBehavior: () => ({ y: 0 }),
      routes: [{
        path: '/',
        component: Seller,
        children: [
          { path: '/', component: Home },
        ]
      }, {path: '/login', component: Login},
         {path: '/register', component: Register},
      ]})

      // 路由拦截
      router.beforeEach((to, from, next) => {
        // to 是之前的路由，from是要走的路由
        var userInfo = {}
        if (window.localStorage && window.localStorage.userInfo) {
          userInfo = JSON.parse(window.localStorage.userInfo)
        }
        // to.path = '/seller' + to.path
        let Interception = false

        // 过录不需要拦截的请求 配置的路由里面有 firewall 的，不拦截
        if (to.path.indexOf('firewall') > 0) {
          Interception = true
        }
        if (to.path === '/login' || to.path === '/register' || Interception) {
          next()
        } else if (userInfo.uid) { // 用户没登录跳转登录页面
          next()
        } else {
          next({ path: '/login' })
        }
        // 登录拦截
      })

      路由拦截是项目整体页面拦截的方法，登录成功后会把用户信息存放在localStorage里面，本地无用户信息就拦截页面到登录页

2.vue-resource
  代替ajax操作
  在mian.js里面引入 import vueResource from 'vue-resource'
  mian.js会 加载全局js
  下面介绍的是基于Vue实例的方式，本项目的http请求全部基于vue实例，项目中只使用post和get两种请求方式

  1) post请求方法
  this.$http.post(API.goodsProvideInfo, {}, { params: params }).then((res) => {
    if (res.code === '0') {
      // 成功
    }
  }).catch(function (response) {
    // 失败
    console.log(response)
})
  参数说明 1. url  string (请求的url)
          2.body  Object (request body)(一般为空)
          3.params Object (请求参数)

  2) get
  this.$http.get(API.goodsProvideInfo, {params: {sku: 1213}}).then((res) => {
    }).catch(function (response) {
      console.log(response)
  })
  参数说明 1. url  string (请求的url)
          2.params Object (请求参数)（post和get的传参数位置不同）


  then－－成功回调，catch－－失败回调
    注：共支持7种请求方式（了解）
        get(url, [options])
        post(url, [body], [options])
        head(url, [options])
        delete(url, [options])
        jsonp(url, [options])
        put(url, [body], [options])
        patch(url, [body], [options])
  3）http 拦截

  http拦截在mian.js做统一的拦截处理，有加loading，处理返回错误，所以项目中的http请求不需要catch 方法，请求前可以对参数做统一处理，如加公共参数uid，中文encode，加密等。对请求完的数据 response做统一处理。
  Vue.http.interceptors.push((request, next) => {
    request.credentials = true // 这里解决跨域问题
    // 请求发送前的处理逻辑
    loading() // 加loading

    next((response) => {
        loadingHide() // 去掉loading
      if (response.data && response.data.code === '0') {
        response.code = response.data.code
        response.data = response.data.data

        // 下面是统一的错误处理
      } else if (response.data && response.data.code === 'TOKENINVALID_999') {
        // 说明token过期，需要重新登录
        window.location.href = '/login'
      } else {
        if (response.data && response.data.message) {
          Notifiy('错误', response.data.message, 'error') // 弹出后台错误提示
        } else if (response.data && response.data.code) {
          response.code = response.data.code
        } else {
          // 下载文件，如果是Blob类型数据，则是下载
          if (response.data && response.data.type === 'application/form-data') {
            response.data = response.url
            response.code = '0'
          } else {
            Notifiy('错误', '请求出错', 'error')
            response.code = '222222'
          }
        }
      }
    })
  })

3.element-ui
详情见http://element.eleme.io/#/component/notification

三、.vue页面
1. 页面构成
有template(dom部分),js,less 三部分
html部分外部有固定的template标签，（vue固定用法）
js部分有data(页面数据),mounted（vue生命周期中的create vm.$el and replace 'el' with it,完成dom创建之后方法回调）

vue生命周期为 beforeCreate--created--beforeMount--mounted-- (beforeUpdate-updated) --beforeDestory--destoryed

less部分引用公用variables.css，里面定义全局变量、公共函数

<template>
<div class="order">
<crum-bs></crum-bs>
</div>
</template>
<script>
import crumbs from '../../layout/crumbs'

export default {
  data: function () {
    return {
    }
  },
  mounted () {
    // 初始化方法
  },
  computed: {
    类型 { [key: string]: Function | { get: Function, set: Function } }
    // 计算 vue实例
  },
  methods: {
    所有页面方法
    例：
    getProductList () {

    }
  },
  components: {
    // 引用组件
    'crum-bs' : crumbs
  },
  updated() {
    // 页面修改回调方法
  },
  destoryed () {
    // 页面销毁回调方法
  }
}
</script>
<style lang="less" scoped>
@import '../../../style/variables.less';
.order{

}
</style>

2.组件间的数据传递
// 父组件
<template>
<div class="order">
<dialog-addpro v-on:closedialog="close" :proinfo="proinfo"></dialog-addpro>
</div>
</template>
<script>
import daddpro from '../../daddpro'

export default {
  data: function () {
    return {
      proinfo: {
        name: '222',
        id: 12
      }
    }
  },
  methods: {
    close (info) {
       // 方法体
    }
  },
  components: {
    'dialog-addpro': daddpro
  }
}
</script>

// 子组件
<template>
<div class="">
  <span>{{ proinfo.name }}</span>
  <span>{{ proinfo.id }}</span>
</div>
</template>
<script>
import crumbs from '../../layout/crumbs'

export default {
  data: function () {
    return {
    }
  },
  props: ['proinfo'],
  methods: {
    cancel () {
      this.$emit('closedialog', this.proinfo)
      // 参数  父组件方法名 , 参数
    }
  }
}
</script>
父组件向子组件传递值
传递数据给组件:proinfo="proinfo"  proinfo为父组件里定义的值，组件取值方式 props: ['proinfo', 'propsdata_show'],可以传多个对象

自组件向父组件传值
this.$emit('方法名' , 参数)，触发当前实例上的事件

3.vue常用命令
 1） @click  例 : <a @click="submit"></a> (vue2.0 用@click)
 2) v-if if判断
 3）v-else 接上一个 v-if
 4) v-else-if
 5) v-show 隐藏（等同css display:none）
 6) v-for 循环数组
 7）:class 动态判断类 例： :class="{ active: item.active, ss: true}"
 8) :src 例： <img  :src="item.imgurl"/>
 9) 取值 双个大括号前后加一个空格 例：{{ item.name }}
 10) router-link 跳转路由，相当于a标签 <router-link to="/product/myprovide"></router-link>

 4.取路由里参数方式
 路由传参有两种方式
  1) 路由配置传参方式
    在配置路由时 例如 "/firewall/authorize/:uid/:uname/:token"
      页面url为 http://XXX.com/firewall/authorize/23/zhangman/232454

      js 接收方式 this.$route.params.uid,
  2) ?传参方式
    例 http://XXX.com/firewall/authorize?uid=12&uname=zhangman&token=23243
    js 接收方式 this.$route.query.uid

5.跳转路由方式
 1）this.$router.push('/deal/returns')  // 跳转
 2） this.$router.replace('/deal/returns')  // 替换当前url
 3） this.$router.go(-1)  // 返回上一页
