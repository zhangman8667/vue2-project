<template>
<div class="stock">
  <crumbs :crumbs_info="crumbs"></crumbs>
  <div class="header">
    <div class="h-left">
      <div class="input">
        <input type="text" name="name" value="" class="common-input" placeholder="输入产品名城／产品条码" v-model="params.parameter">
      </div>
      <div class="common-select-el">
        <el-select v-model="districtId">
          <el-option
          v-for="item in district"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      </div>
      <div class="search">
        <a class="button2" @click="searchStock">搜索</a>
      </div>
      <div class="less-stock" @click="stockListForLess">
        <i :class="{ifselected: params.ifSafe === 1}"></i> 低于安全库存
      </div>
      <div class="clear">
      </div>
    </div>
    <div class="h-right">
      <div class="button">
        <a class="button1" @click="exportUrl">库存导出</a>
      </div>
      <div class="button">
        <router-link to="/product/stock/import" class="button1">库存导入</router-link>
      </div>
      <div class="clear">
      </div>
    </div>
    <div class="clear">
    </div>
  </div>
  <div class="content">
    <ul class="table-ul-common">
      <li id="header">
        <span>商品图片</span>
        <span>商品名称</span>
        <span>商品条码</span>
        <span>规格</span>
        <span>单位</span>
        <span>实际库存</span>
        <span>可售库存</span>
        <span>订单占用库存</span>
        <span>报损库存</span>
        <span>安全库存</span>
        <span>操作</span>
      </li>
      <li v-for="item in list">
        <span class="img"><img :src="item.goodsImage" alt="" /></span>
        <span>{{ item.goodsName }}</span>
        <span>{{ item.sku }}</span>
        <span>{{ item.spec }}</span>
        <span>{{ item.unit }}</span>
        <span>{{ item.actualStock }}</span>
        <span>{{ item.sellStock }}</span>
        <span>{{ item.orderStock }}</span>
        <span>{{ item.badStock }}</span>
        <span>{{ item.safeStock }}</span>
        <span class="operation">
          <a @click="stockChange(item.goodsId, item.stockId)">变更</a>
          <a @click="stcokLog(item.goodsId, item.stockId)">明细</a>
          </span>
      </li>
      <li v-if="list.length <= 0">暂无商品</li>
    </ul>
  </div>
  <div class="pages" v-if="total > 0">
    <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="total" :current-page="page">
    </el-pagination>
    <div class="all-total">
      每页显示{{ params.pageSize }}条  共计{{ allTotal }}条数据
    </div>
  </div>
</div>
</template>
<script>
import crumbs from '../../layout/crumbs'
import { Notifiy } from '../../../utils/toast.js'
import { httpGet } from '../../../utils/request.js'
export default {
  data: function () {
    return {
      crumbs: {
        list: [
          {name: '商品管理', go: 0},
          {name: '我的供货', go: -1},
          {name: '库存管理类', go: 0}
        ]
      },
      total: 0,
      page: 1,
      selectCate_1: false,
      selectCate_2: false,
      selectCate_1Text: '选择一级分类',
      selectCate_2Text: '选择二级分类',
      list: [],
      cate: [],
      cate_list1: [],
      cate_list2: [],
      params: {
        page: 1,
        pageSize: 10,
        parameter: '',
        ifSafe: 0
      }
    }
  },
  mounted () {
    this.stockListinit()
    this.categoryList()
  },
  computed: {
    cate_1: function () {
      this.cate_list1 = this.cate
      return this.cate_list1
    },
    exportUrl () {
      var uid = window.localStorage.userId
      return API.goodsStockManageExport + '?uid=' + uid
    }
  },
  methods: {
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.params.page = val
      this.stockListinit()
      var _content = document.getElementById('content')
      _content.scrollTop = 0
    },
    stockListinit () {
      var self = this
      self.$http.get(API.goodsStockManageList, {params: self.params}).then((res) => {
        self.list = res.data.list
        self.page = res.data.page
        self.allTotal = res.data.total
        self.total = (res.data.total / res.data.size) * 10
      })
    },
    searchStock () {
      this.params.page = 1
      this.stockListinit()
    },
    stockListForLess () {
      if (this.params.ifSafe === 0) {
        this.params.ifSafe = 1
      } else {
        this.params.ifSafe = 0
      }
      this.stockListinit()
    },
    categoryList () {
      var self = this
      self.$http.get(API.goodsCategoryList, {params: {}}).then((res) => {
        self.cate = res.data
      })
    },
    showCate_1fun () {
      this.selectCate_1 = !this.selectCate_1
    },
    showCate_2fun () {
      if (!this.params.cate_1) {
        Notifiy('提示', '请选择一级分类', 'info')
        return
      }
      this.selectCate_2 = !this.selectCate_2
    },
    cate_1select (item) {
      this.selectCate_1 = false
      this.params.cate_1 = item.cate_id
      this.selectCate_1Text = item.cate_name
      this.params.cate_2 = null
      this.selectCate_2Text = '选择二级分类'
      for (var i in this.cate_list1) {
        if (this.cate_list1[i].cate_id === this.params.cate_1) {
          this.cate_list2 = this.cate_list1[i].cate_list
        }
      }
    },
    cate_2select (item) {
      this.selectCate_2 = false
      this.params.cate_2 = item.cate_id
      this.selectCate_2Text = item.cate_name
    },
    stockexport () {
      // var self = this
      this.params.page = null
      httpGet({
        url: API.goodsStockManageExport,
        params: {},
        success: function (res) {
          Notifiy('成功', '导出成功', 'success')
        }
      })
      // self.$http.get(API.goodsStockManageExport, {params: {}}).then((res) => {
      // })
    },
    stockChange (gid, sid) {
      var url = '/product/stockcar/0/' + gid + '/' + sid
      this.$router.push(url)
    },
    stcokLog (gid, sid) {
      var url = '/product/stockcar/1/' + gid + '/' + sid
      this.$router.push(url)
    },
    exportUrl () {

    }
  },
  components: {
    'crumbs': crumbs
  }
}
</script>
<style lang="less" scoped>@import '../../../style/variables.less';
.stock {
    width: 100%;
    .header {
        width: 100%;
        line-height: 30px;

        .h-left {
            float: left;
            .input {
                height: 30px;
                width: 230px;
                border: 1px solid @border-color;
                background: #fff;
                border-radius: 100px;
                margin-right: 10px;
            }

            .select {
                width: 140px;
                height: 30px;
                margin-right: 10px;
                line-height: 30px;
            }
            .select:last-child{
              width: 160px;
            }
            .search {
                width: 90px;
                height: 30px;
                margin-right: 10px;
            }
            .less-stock {
                font-size: 16px;
                color: #555555;
                position: relative;
                padding-left: 22px;
                cursor: pointer;
                i {
                    position: absolute;
                    width: 14px;
                    height: 14px;
                    display: block;
                    top: 8px;
                    left: 0;
                    background: url("../../../assets/my-noselect.png") no-repeat;
                    background-size: 14px;
                }
                i.ifselected{
                  background: url("../../../assets/my-select.png") no-repeat;
                  background-size: 14px;
                }
            }

        }
        .h-left > div {
            float: left;
        }
        .h-right {
            float: right;
            .button {
                width: 120px;
                height: 30px;
                margin-left: 10px;
                float: left;
            }
        }
    }
    .content {
        width: 100%;
        margin-top: 25px;
        .border-shadow;
        ul {
            li#header {
                height: 40px;
                line-height: 20px;
                padding: 10px 10px 10px 0;
            }
            li {
                padding: 10px;
                // line-height: 80px;
                color: #555;
                span:nth-child(1) {
                  width: 11%
                }
                span:nth-child(2) {
                  width: 16%
                }
                span:nth-child(3) {
                  width: 15%
                }
                span:nth-child(4) {
                  width: 7%
                }
                span:nth-child(5) {
                  width: 7%
                }
                span:nth-child(6) {
                  width: 7%
                }
                span:nth-child(7) {
                  width: 7%
                }
                span:nth-child(8) {
                  width: 10%
                }
                span:nth-child(9) {
                  width: 7%
                }
                span:nth-child(10) {
                  width: 7%
                }
                span:nth-child(11) {
                  width: 7%
                }
                span.img {
                    height: 80px;
                    img {
                        max-width: 80px;
                        height: auto;
                    }
                }
                span.operation {
                    position: relative;

                    a {
                        display: block;
                        position: absolute;
                        right: 50%;
                        margin-right: -15px;
                        color: @blue;
                        line-height: 14px;
                    }
                    a:first-child {
                        top: 17px;
                    }
                    a:last-child {
                        bottom: 17px;
                    }
                }
            }
        }
    }
}
</style>
