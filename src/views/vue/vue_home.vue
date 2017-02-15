<template>
<div class="vue-home">
  <crumbs :crumbs_info="crumbs"></crumbs>
  <div class="record">
    <div class="r-header">
      <div class="tags">
        <a v-for="tab,index in tabs" v-bind:class="{active:index === selected}" @click="choose(index)">{{tab.name}}</a>
      </div>
    </div>
    <div class="content">
      <component :is="currentView" transition="fade" transition-mode="out-in"></component>
    </div>
  </div>
</div>
</template>
<script>
import crumbs from '../layout/crumbs'
import Instruction from './vue/instruction'
import Cycle from './vue/cycle'
import Communication from './vue/communication'
import Request from './vue/request'
export default {
  data: function () {
    return {
      crumbs: {
        list: [
          {name: 'vue', go: 0},
          {name: '基本用法', go: 0}
        ]
      },
      tabs: [{
        'name': '常用指令',
        active: true
      }, {
        'name': 'vue生命周期',
        active: false
      }, {
        'name': '数据通信',
        active: false
      }, {
        'name': '后台请求',
        active: false
      }],
      selected: 0,
      currentView: 'vue_0'
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      // 初始化方法
    })
  },
  computed: {},
  methods: {
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      var _content = document.getElementById('content')
      _content.scrollTop = 0
    },
    choose (index) {
      this.currentView = 'vue_' + index
      this.selected = index
    }

  },
  components: {
    // 'stock-record': stockrecord,
    'vue_0': Instruction,
    'vue_1': Cycle,
    'vue_2': Communication,
    'vue_3': Request,
    'crumbs': crumbs
  }
}
</script>
<style lang="less" scoped>
@import '../../style/variables.less';
.vue-home{
  width: 100%;
  height: 100%;
}
.record {
    width: 100%;
    .r-header {
        width: 100%;
        height: 30px;
        margin: 10px auto 30px;
        .tags {
            width: 460px;
            .display-flex;
            background: #fff;
            font-size: 16px;
            color: #555555;
            letter-spacing: 0.6px;
            text-align: center;
            border-radius: 20px;
            overflow: hidden;
            border: 1px solid @blue;
            a:last-child{
              border-right: none;
            }
            a {
                display: block;
                .flex(1);
                height: 100%;
                line-height: 30px;
                border-right: 1px solid @blue;
            }
            a.active {
                background: @blue;
                color: #fff;
            }
        }
    }
    .content {
        width: 100%;
    }
}
</style>
