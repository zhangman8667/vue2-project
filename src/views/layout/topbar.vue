<template>
<div class="top-bar">
  <div class="left">
    <div class="name">{{ user.name }}
    </div>
  </div>
  <div class="right">
    <div class="img fl-left">
    </div>
    <div class="fl-left user">
      <!-- <span class="first">{{ user.uname }} </span> -->
      <span>{{ user.userName }} </span>
    </div>
    <!-- <div class="fl-left settings">
    </div> -->
    <div class="fl-left login-out" @click="loginOut">
    </div>
    <div class="clearfix">
    </div>
  </div>
  <div class="clearfix">
  </div>
</div>
</template>
<script>
import { Notifiy } from '../../utils/toast.js'
import API from '../../store/api.js'
export default {
  data: function () {
    return {
      user: {
        userName: 'manman',
        name: 'vue project'
      }
    }
  },
  mounted: function () {
    this.init()
  },
  computed: {
  },
  methods: {
    init () {
      var localStorage = window.localStorage
      if (localStorage && localStorage.userInfo) {
        var userInfo = JSON.parse(localStorage.userInfo)
        this.user.storeName = userInfo.storeName
        this.user.uname = userInfo.uname
      }
    },
    loginOut () {
      var self = this
      self.$http.get(API.userLogout, {params: {}}).then((res) => {
        if (res.code === '0') {
          Notifiy('成功', '退出成功', 'success')
          window.localStorage.userInfo = ''
          window.localStorage.userId = ''
          self.$router.replace('/firewall/login')
        }
      })
    }
  },
  components: {},
  watch: { // 监听
    '$route' (to, from) {
    }
  }
}
</script>
<style lang="less" scoped>@import '../../style/variables.less';
.top-bar {
    height: @top-h;
    color: #666;
    background: #fff;
    border-bottom: 1px solid @border-color;
    position: absolute;
    top: 0;
    width: 100%;
    .left {
        padding: 16px 20px;
        float: left;
        height: 100%;
        .name {
            line-height: 28px;
            color: #333;
            letter-spacing: 0.75px;
            font-size: 20px;
        }
    }
    .right {
        padding-right: 20px;
        float: right;
        height: 100%;
        .img {
            margin: 8px;
            width: 44px;
            height: 44px;
            border-radius: 22px;
            // border: 1px solid @blue;
            background: url(../../assets/avatar.png) no-repeat;
            background-size: 44px;
        }
        .user {
            padding: 20px 0;
            span {
                display: inline-block;
                line-height: 16px;
                font-size: 16px;
                color: @blue;
                padding: 0 9px;
            }
            span.first {
                border-right: 1px solid @border-color;
            }
        }
        .settings {
            width: 86px;
            height: 100%;
            background: url("../../assets/settings.png") no-repeat center center;
            background-size: 26px;
            border-right: 1px solid @border-color;
        }
        .login-out {
            border-left: 1px solid @border-color;
            width: 86px;
            height: 100%;
            background: url("../../assets/login-out.png") no-repeat center center;
            background-size: 26px;
        }
    }
}
</style>
