<template>
<div class="child">
  <div class="title">
    子组建内容
  </div>
  <div class="info">
    <h3>父级数据</h3>
    <p>姓名：{{ _info.name }}</p>
    <p>
      <span>卡1：</span>
      <span><input type="text" class="common-input-search" v-model="_info.money1"></span>
    </p>
    <p>
      <span>卡2：</span>
      <span><input type="text" class="common-input-search" v-model="_info.money2"></span>
    </p>
    <p>
      <span>卡3：</span>
      <span><input type="text" class="common-input-search" v-model="_info.money3"></span>
    </p>
    <p>
      <span>卡4：</span>
      <span><input type="text" class="common-input-search" v-model="_info.money4"></span>
    </p>
    <p>总额:{{ allmoney }}</p>
    <p><a @click="sure" class="button1">触发父组建</a></p>
  </div>
</div>
</template>
<script>
export default {
  data: function () {
    return {
      data: ''
    }
  },
  props: ['_info'],
  mounted () {
    // this.stockListinit()
  },
  computed: {
    allmoney () {
      var _all = this._info.money1 + this._info.money2 + this._info.money3 + this._info.money4
      return _all
    }
  },
  methods: {
    sure () {
      // 触发父组建方法 并向父组建传递数据
      var self = this
      self.data = '触发父组建方法 并向父组建传递数据'
      self.$emit('changData', self.data)
    }
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
@import '../../../../style/variables.less';
.child{
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
