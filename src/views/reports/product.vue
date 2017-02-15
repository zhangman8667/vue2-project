<template>
<div class="reports-product">
  <crumbs :crumbs_info="crumbs"></crumbs>
  <div class="product">
    <div class="header-search-common">
      <div class="r-header">
        <div class="tags">
          <a v-for="tab,index in data" v-bind:class="{active:index === selectedData}" @click="changeData(index)">{{tab.name}}</a>
        </div>
        <div class="text text-time">下单时间</div>
        <div class="time">
          <el-date-picker  v-model="begin" type="date" placeholder="开始日期" style="width: 180px">
          </el-date-picker>
          <i class="time-line">-</i>
        </div>
        <div class="time">
          <el-date-picker v-model="end" type="date" placeholder="结束日期" style="width: 180px">
          </el-date-picker>
        </div>
        <div class="search">
          <a class="button2" @click="search">查询</a>
        </div>
        <div class="clear"></div>
      </div>
    </div>
    <div class="r-header rep-tags">
      <div class="tags">
        <a v-for="tab,index in tabs" v-bind:class="{active:index === selectedTags}" @click="changeTags(index)">{{tab.name}}</a>
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
import cate from './protags/cate'
import goods from './protags/goods'
import { getFixTime } from '../../utils/time.js'
import API from '../../store/api.js'

export default {
  data: function () {
    return {
      crumbs: {
        list: [
          {name: '数据报表', go: 0},
          {name: '商品数据', go: 0}
        ]
      },
      selectedData: 0,
      selectedTags: 0,
      currentView: 'tags_0',
      tabs: [{
        'name': '按商品'
      }, {
        'name': '按分类'
      }],
      data: [{
        'name': '本周'
      }, {
        'name': '本月'
      }, {
        'name': '上周'
      }, {
        'name': '上月'
      }],
      begin: '',
      end: ''
    }
  },
  mounted () {
    // this.stockListinit()
  },
  computed: {
  },
  methods: {
    getTime (index) {
      var self = this
      var time = getFixTime()
      if (index === 1) { // 本月
        self.begin = time.monthStartDate
        self.end = time.monthEndDate
      } else if (index === 2) { // 上周
        self.begin = time.upWeekStartDate
        self.end = time.upWeekEndDate
      } else if (index === 3) { // 上月
        self.begin = time.lastMonthStartDate
        self.end = time.lastMonthEndDate
      } else { // 本周
        self.begin = time.weekStartDate
        self.end = time.weekEndDate
      }
      // self.getOrder()
    },
    getOrder () {
      var self = this
      var params = {
        startDay: self.begin,
        end: self.end
      }
      self.$http.get(API.goodsStockManageList, {params: params}).then((res) => {
        if (res.code === '0') {
          self.data = res.data
        }
      })
    },
    changeData (index) {
      var self = this
      self.selectedData = index
      self.getTime(index)
    },
    search () {
      this.getOrder()
    },
    changeTags (index) {
      this.selectedTags = index
      this.currentView = 'tags_' + index
    }
  },
  components: {
    'tags_1': cate,
    'tags_0': goods,
    'crumbs': crumbs
  }
}
</script>
<style lang="less" scoped>
@import '../../style/variables.less';
.reports-product{
  .rep-tags{
    margin: 33px auto 22px auto;
  }
  .header-search-common{
    .r-header {
      .tags {
        float: left;
        width: 322px;
        margin-right: 30px;
      }
    }
  }
  .r-header {
    width: 100%;
    height: 30px;
    // margin: 10px auto 30px;
    .text{
      margin-right: 10px;
    }
    .search.export{
      // float: right;
      margin-left: 50px;
      width: 120px;
    }
    .search{
      margin-left: 20px;
    }
    .tags {
      width: 300px;
      margin: 0 auto;
      .display-flex;
      background: #fff;
      font-size: 16px;
      color: @blue;
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
        border-right: 1px solid @blue;
      }
      a:last-child{
        border-right: 0;
      }
      a.active {
        background: @blue;
        color: #fff;
      }
    }
  }
}
</style>
