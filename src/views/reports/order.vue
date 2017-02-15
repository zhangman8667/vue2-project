<template>
<div class="reports-order">
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
    <div class="content">
      <div class="charts">
        <div class="" id="main" style="width: 100%;height:380px">

        </div>
      </div>
      <div class="list">
        <ul class="table-ul-common">
          <li id="header">
            <span>日期({{ begin }} 至 {{ end }})</span>
            <span>订货单</span>
            <span>退货单</span>
            <span>订货客户数</span>
            <span>退货客户数</span>
            <span>订货总金额</span>
            <span>退货总金额</span>
          </li>
          <li v-for="item in list">
            <span>{{ item.dealCode }}</span>
            <span>{{ item.typeDesc }}</span>
            <span>{{ item.orderTime }}</span>
            <span>{{ item.statusDesc }}</span>
            <span>{{ item.payTime }}</span>
            <span>{{ item.serviceTypeDesc }}</span>
            <span>{{ item.count }}</span>
          </li>
          <li v-if="list.length <= 0">暂无记录</li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import crumbs from '../layout/crumbs'
import { getFixTime } from '../../utils/time.js'
import API from '../../store/api.js'
import echarts from 'echarts/index.simple'
export default {
  data: function () {
    return {
      crumbs: {
        list: [
          {name: '数据报表', go: 0},
          {name: '订单数据', go: 0}
        ]
      },
      list: [],
      selectedData: 0,
      begin: '',
      end: '',
      data: [{
        'name': '本周'
      }, {
        'name': '本月'
      }, {
        'name': '上周'
      }, {
        'name': '上月'
      }]
    }
  },
  mounted () {
    this.getTime()
    this.init()
  },
  computed: {
  },
  methods: {
    init () {
      var main = document.getElementById('main')
      var myChart = echarts.init(main)
      var colors = ['#61C7D1', '#ff9200']
      var option = {
        color: colors,
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['订单金额', '订单数']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '20%',
          containLabel: true
        },
        calculable: true,
        xAxis: [{
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#646464'
            }
          },
          axisTick: {
            alignWithLabel: true
          },
          markLine: {
            data: [
              {type: 'average'}
            ]
          },
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        }],
        yAxis: [{
          type: 'value',
          name: '订单金额',
          axisLine: {
            lineStyle: {
              color: '#646464'
            },
            lineWidth: 20
          },
          splitLine: {lineStyle: {type: 'dashed', color: '#dedede'}},
          min: 0,
          max: 250,
          axisLabel: {
            formatter: '{value}元'
          }
        }, {
          type: 'value',
          name: '订单数',
          splitLine: {lineStyle: {type: 'dashed', color: '#dedede'}},
          min: 0,
          max: 25,
          axisLine: {
            lineStyle: {
              color: '#646464'
            }
          },
          axisLabel: {
            formatter: '{value}个'
          }
        }],
        series: [{
          name: '订单金额',
          type: 'bar',
          data: [2.0, 4.9, 7.0, 230.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        }, {
          name: '订单数',
          type: 'line',
          yAxisIndex: 1,
          showSymbol: false,
          animationEasing: '商品数',
          animationDuration: 1000,
          data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }]
      }
      myChart.setOption(option)
    },
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
    }
  },
  components: {
    'crumbs': crumbs
  }
}
</script>
<style lang="less" scoped>
@import '../../style/variables.less';
.reports-order{
  .rep-tags{
    margin: 33px auto 22px auto;
  }
  .content{
    margin-top: 22px;
    .charts{
      width: 100%;
      height: 500px;
      padding-top: 20px;
      background: #fff;
      .border-shadow;
    }
    .list {
        width: 100%;
        margin-top: 20px;
        background: #fff;
        .border-shadow;
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
                  width: 18%
                }
                span:nth-child(2) {
                  width: 10%
                }
                span:nth-child(3) {
                  width: 10%;
                }
                span:nth-child(4) {
                  width: 10%
                }
                span:nth-child(5) {
                  width: 10%
                }
                span:nth-child(6) {
                  width: 12%
                }
                span:nth-child(7) {
                  width: 12%
                }
            }
        }
    }
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
