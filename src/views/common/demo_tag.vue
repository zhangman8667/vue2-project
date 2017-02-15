<template>
<div>
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
import stockrecord from './stock_record'
import pricerecord from './price_record'
import crumbs from '../../layout/crumbs'
export default {
  data: function () {
    return {
      crumbs: {
        list: [
          {name: '商品管理', go: 0},
          {name: '我的供货', go: -1},
          {name: '记录', go: 0}
        ]
      },
      tabs: [{
        'name': '变价记录',
        active: true
      }, {
        'name': '库存记录',
        active: false
      }],
      selected: 0,
      currentView: 'price-record'
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
      if (index === 0) {
        this.selected = 0
        this.currentView = 'price-record'
      } else {
        this.selected = 1
        console.log(this.selected)
        this.currentView = 'stock-record'
      }
    }

  },
  components: {
    'stock-record': stockrecord,
    'price-record': pricerecord,
    'crumbs': crumbs
  }
}
</script>
<style lang="less" scoped>@import '../../../style/variables.less';
.record {
    width: 100%;
    .r-header {
        width: 100%;
        height: 30px;
        margin: 10px auto 30px;
        .tags {
            width: 300px;
            .display-flex;
            background: #fff;
            font-size: 16px;
            color: #555555;
            letter-spacing: 0.6px;
            text-align: center;
            border-radius: 20px;
            overflow: hidden;
            border: 1px solid @blue;
            a {
                display: block;
                .flex(1);
                height: 100%;
                line-height: 30px;
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
