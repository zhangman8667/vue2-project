<template>
<div class="home">
  <crumbs :crumbs_info="crumbs"></crumbs>
  <div class="title">
    <h2>
      欢迎来到vue2.0
    </h2>
    <h3>
      本项目使用技术 vue 2.0 + less + javaScript + vue-router + vue-resource ＋ element-ui ＋ echarts3.0
    </h3>
    <div class="">
      <h5>学习链接</h5>
      <h5>vue <a href="https://vuefe.cn/">https://vuefe.cn/</a></h5>
      <h5>element-ui<a href="http://element.eleme.io/#/component/notification">http://element.eleme.io/#/component/notification</a></h5>
    </div>
  </div>
</div>
</template>
<script>
import crumbs from '../layout/crumbs'
export default {
  data: function () {
    return {  // 数据
      crumbs: {
        list: [
          {name: '首页', go: 0}
        ]
      }
    }
  },
  mounted () {
    // 初始化方法
  },
  computed: {
    //
  },
  methods: {
    // 方法
  },
  components: {
    // 引用组建
    'crumbs': crumbs
  }
}
</script>
<style lang="less" scoped>
@import '../../style/variables.less';
.home{
  .title{
    background: #fff;
    h2{
      font-size: 28px;
      color: #555;
      padding: 40px;
      text-align: center;
    }
    h3{
      font-size: 18px;
      padding:0 20px 30px 20px;
    }
    div{
      margin: 20px;
      h5{
        font-size: 16px;
        line-height: 40px;
        a{
          color: @blue;
          cursor: pointer;
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
