<template>
<div class="dialog modal">
  <div class="dialog-content">
    <h3>修改名字</h3>
    <div class="acc-email">
      <div class="li phone">
        <label>新名字：</label>
        <span>
          <input type="text" class="common-input" placeholder="请输入新名字" v-model="name">
        </span>
        <span> <i>{{ data_text }}</i> </span>
      </div>
    </div>
    <div class="button">
      <span> <a class="button-cancel" @click="cancel">取消</a></span>
      <span><a class="button1" @click="save">保存</a></span>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      name: ''
    }
  },
  props: ['_name', 'data_text'],
  events: {
  },
  computed: {
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.name = this._name
    },
    cancel () {
      this.$emit('close')
    },
    save () {
      this.$emit('saveChange', this.name)
      this.$emit('close')
    }
  },
  beforeDestroy () {
    // 销毁方法
  }
}
</script>
<style lang="less" scoped>
@import '../../../../style/variables.less';
.acc-email{
  width: 600px;
  padding: 20px;
  border-bottom: 1px dashed #cdcdcd;
  .common-input{
    text-align: center;
  }
  .li{
    height: 30px;
    line-height: 30px;
    margin: 20px 0 30px 0;

    label{
      width: 100px;
      text-align: right;
      letter-spacing: 0.52px;
      display: block;
      float: left;
    }
    span{
      display: block;
      float: left;
    }
    i{
      display: block;
      float: left;
      font-size: 14px;
      color: #C4C4C4;
      letter-spacing: 0.52px;
    }
  }
  .phone{
    span{
      width: 250px;
      margin-right: 20px;
    }
  }
  .code{
    .code-a{
      width: 120px;
      margin: 0 20px 0 10px;
    }
    .code-input{
      width: 120px;
      input{
        padding: 8px 10px;
        text-align: center;
      }
    }
  }
}
</style>
