<template>
<div class="reports-cate">
  <div class="charts">
    <div class="" id="main" style="width: 100%;height:380px">

    </div>
  </div>
</div>
</template>
<script>
import echarts from 'echarts/index.common'
export default {
  data: function () {
    return {
      list: []
    }
  },
  mounted () {
    // this.stockListinit()
    this.init()
  },
  computed: {},
  methods: {
    init () {
      var main = document.getElementById('main')
      var myChart = echarts.init(main)
      var itemStyle = {
        normal: {
          borderWidth: 3,
          borderColor: '#fff'
        }
      }
      var option = {
        title: {
          // text: '某站点用户访问来源',
          // subtext: '纯属虚构',
          // x: 'center'
        },
        itemStyle: itemStyle,
        // color: ['red', 'green', 'yellow', 'blueviolet'],
        legend: {
          // orient: 'vertical',
          x: 'center',
          y: 'bottom',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
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
        series: [{
          name: '访问来源',
          type: 'pie',
          radius: '70%',
          center: ['50%', '50%'],
          data: [{
            value: 335,
            name: '直接访问'
          }, {
            value: 310,
            name: '邮件营销'
          }, {
            value: 234,
            name: '联盟广告'
          }, {
            value: 135,
            name: '视频广告'
          }, {
            value: 1548,
            name: '搜索引擎'
          }]
        }]
      }
      myChart.setOption(option)
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
@import '../../../style/variables.less';
.reports-cate {
    .charts {
        width: 100%;
        .border-shadow;
        height: 500px;
        background: #fff;
    }
}
</style>
