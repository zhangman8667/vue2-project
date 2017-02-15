<template>
<div class="request">
  <div class="content">
    <div class="li">
      <h5>1. vue-resource</h5>
      <div class="text">
        <span> <a class="button1" @click="f1">post</a></span>
        <span>结果：{{ post1 }}</span>
        <span> <a class="button2" @click="f2">get</a></span>
        <span>结果：{{ get1 }}</span>
      </div>
    </div>
    <div class="li">
      <h5>2. ajax</h5>
      <div class="text">
        <span> <a class="button1" @click="f3">ajax post</a></span>
        <span>结果：{{ post2 }}</span>
        <span> <a class="button2" @click="f4">ajax get</a></span>
        <span>结果：{{ get2 }}</span>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import API from '../../../store/api.js'
import { httpGet, httpPost } from '../../../utils/request.js'

export default {
  data: function () {
    return {
      post1: '',
      get1: '',
      post2: '',
      get2: ''
    }
  },
  mounted () {
    // 初始化加载 f1() 方法
    this.f1()
  },
  computed: {
  },
  methods: {
    f1 () {
      var self = this  // post请求第二个参数放在 request body里面
      var param = {}
      self.$http.post(API.resourcePost, param, {params: {}}).then((res) => {
        if (res.code === '0') {
          self.post1 = res.text
        }
      })
    },
    f2 () {
      var self = this
      var param = {}
      self.$http.get(API.resourceGet, {params: param}).then((res) => {
        console.log(JSON.stringify(res.data))
        if (res.code === '0') {
          self.get1 = res.data.text
        }
      })
    },
    f3 () {
      var self = this
      var param = {}
      httpPost({
        url: API.ajaxPost,
        params: param,
        success: function (data) {
          self.post2 = data.text
        }
      })
    },
    f4 () {
      var self = this
      var param = {}
      httpGet({
        url: API.ajaxGet,
        params: param,
        success: function (res) {
          self.get2 = res.data.text
        }
      })
    }
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
@import '../../../style/variables.less';
.request{
  .content {
      width: 100%;
      margin-top: 25px;
      padding: 0 20px;
      background: #fff;
      .border-shadow;
      .li:last-child{
        border-bottom: none;
      }
      .li{
        width: 100%;
        border-bottom: 1px dashed #eaeaea;
        margin-bottom: 10px;

        h5{
          position: relative;
          font-size: 16px;
          color: #5DC7D2;
          letter-spacing: 0.6px;
          line-height: 40px;
          padding-left: 15px;
        }
        h5:after{
          content: "";
          width: 3px;
          height: 20px;
          background: @blue;
          position: absolute;
          left: 0px;
          top: 10px
        }

        .text{
          width: 100%;
          padding: 8px 0 14px 0;

          span{
            display: block;
            line-height: 24px;
            letter-spacing: 0.52px;
            margin: 20px;
            .common-input-search{
              width: 300px;
            }
            a{
              width: 120px;
              margin: 0;
            }
          }

        }
        .table{
          .border-shadow;
        }
        .pro-tal{
          height: 100px;
          width: 100%;
          .fl-right{
            float: right;
            padding-left: 30px;
            text-align: right;
            line-height: 43px;
            span:first-child{
              border-bottom: 1px dashed #eaeaea;
              padding-left: 30px;
            }
            span{
              display: block;
              letter-spacing: 0.52px;
              i{
                color: @blue;
                padding-right: 20px;
              }
              .c-y{
                color: #FFA171;
              }
            }
          }
        }
      }
      ul {
          li#header {
              height: 40px;
              line-height: 20px;
              padding: 10px 10px 10px 0;
          }
          li {
              padding: 10px;
              color: #555;
              span:nth-child(1) {
                width: 11%
              }
              span:nth-child(2) {
                width: 16%
              }
              span:nth-child(3) {
                width: 15%
              }
              span:nth-child(4) {
                width: 10%
              }
              span:nth-child(5) {
                width: 10%
              }
              span:nth-child(6) {
                width: 10%
              }
              span:nth-child(7) {
                width: 10%
              }
              span.img {
                  height: 60px;
                  img {
                      max-width: 60px;
                      height: auto;
                  }
              }
          }
      }
  }
}
</style>
