<template>
<div class="father">
  <div class="title">
    父级组建向子级组建传递数据
  </div>
  <div class="info">
    <h3>父级数据</h3>
    <p>姓名：{{ info.name }}</p>
    <p>卡1：{{ info.money1 }}</p>
    <p>卡2：{{ info.money2 }}</p>
    <p>卡3：{{ info.money3 }}</p>
    <p>
      <span>卡4：</span>
      <span><input type="text" class="common-input-search" v-model="info.money4"></span>
    </p>
    <p>总额:{{ allmoney }}</p>
  </div>
  <child :_info="info" v-on:changData="change"></child>
  <dialog-c :_name="info.name" :data_text="data" v-if="show" v-on:close="close" v-on:saveChange="sure"></dialog-c>
</div>
</template>
<script>
import child from './commun/child'
import Dialog from './commun/dialog'

export default {
  data: function () {
    return {
      show: false,
      info: {
        name: '11111',
        money1: 200,
        money2: 200,
        money3: 200,
        money4: 200
      }
    }
  },
  mounted () {
  },
  computed: {
    allmoney () {
      var _all = this.info.money1 + this.info.money2 + this.info.money3 + parseInt(this.info.money4)
      return _all
    }
  },
  methods: {
    change (data) {
      this.show = true
      this.data = data
    },
    close () { // 关闭弹框
      this.show = false
    },
    sure (name) {
      this.info.name = name
    }
  },
  components: {
    'child': child,
    'dialog-c': Dialog
  }
}
</script>
<style lang="less" scoped>
@import '../../../style/variables.less';
.father{
  width: 100%;
  height: 100%;
  background: #fff;
  .title{
    text-align: center;
    padding: 30px;
    font-size: 20px;
  }
  .info{
    font-size: 16px;
    margin-top: 20px;
    padding: 0 20px;
    line-height: 40px;
    p{
      span{
        display: inline-block;
      }
    }
  }
}
</style>
