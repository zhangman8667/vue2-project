<template>
  <div class="reports-goods">
    <div class="charts">
      <div class="" id="main" style="width: 100%;height:380px">

      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts/index.simple'
export default {
  data: function () {
    return {
      list: []
    }
  },
  mounted () {
    this.init()
  },
  computed: {
  },
  methods: {
    init () {
      var main = document.getElementById('main')
      var myChart = echarts.init(main)
      var colors = ['#61C7D1', '#ff9200', '#1FAFF6']
      var option = {
        color: colors,
        tooltip: {
          trigger: 'axis'
        },
        // toolbox: {
        //   show: true,
        //   feature: {
        //     mark: {show: true},
        //     dataView: {show: true, readOnly: false},
        //     magicType: {show: true, type: ['line', 'bar']},
        //     restore: {show: true},
        //     saveAsImage: {show: true}
        //   }
        // },
        // color: ['red', 'green', 'yellow', 'blueviolet'],
        legend: {
          data: ['订单金额', '商品数']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '20%',
          containLabel: true
        },
        // label: {
        //   normal: {
        //     position: 'inner'
        //   }
        // },
        // labelLine: {
        //   normal: {
        //     show: false
        //   }
        // },
        calculable: true,
        xAxis: [{
          type: 'category',
          // color: '#fff',
          // boundaryGap: false,
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
          // boundaryGap: [0.2, 0.2],
          axisLabel: {
            formatter: '{value}元'
          }
        }, {
          type: 'value',
          name: '商品数',
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
          name: '商品数',
          type: 'line',
          yAxisIndex: 1,
          // markLine: {
          //   data: [
          //     {type: 'average', name: '平均值'}
          //   ]
          // },
          showSymbol: false,
          animationEasing: '商品数',
          animationDuration: 1000,
          data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }]
      }
      myChart.setOption(option)
    }
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
@import '../../../style/variables.less';
.reports-goods{
  .charts{
    width: 100%;
    height: 500px;
    padding-top: 20px;
    background: #fff;
    .border-shadow;
  }
}
</style>
