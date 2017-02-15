<template>
<div class="instruction">
    <div class="content">
      <div class="li">
        <h5>数据双向绑定</h5>
        <div class="text">
          <span>例子：{{ name }}</span>
          <span><input type="text" name="" class="common-input-search" v-model="name"></span>
        </div>
      </div>
      <div class="li">
        <h5>点击事件 ＋ 提示</h5>
        <div class="text">
          <span> <a class="button1" @click="success">成功提示</a></span>
          <span><a class="button2" @click="cinfo">普通提示</a></span>
          <span> <a class="button3" @click="error">失败提示</a></span>
          <span> <a class="button2" @click="operation">操作提示</a></span>
        </div>
      </div>
      <div class="li">
        <h5>渲染列表 分页</h5>
        <div class="table">
          <ul class="table-ul-common">
            <li id="header">
              <span>名称1</span>
              <span>名称2</span>
              <span>名称3</span>
              <span>名称4</span>
              <span>名称5</span>
              <span>名称6</span>
              <span>状态</span>
            </li>
            <li v-for="item in list">
              <span>{{ item.name1 }}</span>
              <span>{{ item.name2 }}</span>
              <span>{{ item.name3 }}</span>
              <span>{{ item.name4 }}</span>
              <span>{{ item.name5 }}</span>
              <span>{{ item.name6 }}</span>
              <span v-if="item.status === 1">开启</span>
              <span v-else>关闭</span>
            </li>
            <li v-if="list.length <= 0">暂无数据</li>
          </ul>
        </div>
      </div>
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
import { Notifiy } from '../../../utils/toast.js'
import API from '../../../store/api.js'
export default {
  data: function () {
    return {
      name: '请修改',
      list: [],
      info: {},
      total: 0,
      page: 1,
      params: {
        pageSize: 10,
        page: 1
      }
    }
  },
  mounted () {
    // 初始化页面加载的方法
    this.initList()
  },
  computed: {
  },
  methods: {
    initList () {
      var self = this  //  重新定义全局变量
      // 用vue-resource 向后台发送请求
      self.$http.get(API.nameList, {params: self.params}).then((res) => {
        if (res.code === '0') {
          self.list = res.data.list
          self.page = res.data.page
          self.allTotal = res.data.total
          self.total = (res.data.total / res.data.size) * 10
        }
      })
    },
    handleCurrentChange (val) {  // 分页请求
      this.params.page = val
      this.initList()
      var _content = document.getElementById('content')
      _content.scrollTop = 0
    },
    success () {
      Notifiy('成功', '成功提示信息', 'success')
    },
    cinfo () {
      Notifiy('提示', '提示信息', 'info')
    },
    error () {
      Notifiy('失败', '失败提示信息', 'error')
    },
    operation () {
      var self = this
      self.$confirm('确认删除该条数据吗？', '提示', {
        type: 'warning'
      }).then(() => {
        // 确定操作
        Notifiy('成功', '删除成功', 'success')
      }).catch(() => {
        // 取消操作
        Notifiy('提示', '已取消删除', 'info')
      })
    }
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
@import '../../../style/variables.less';
.instruction{
  width: 100%;
    .content {
        width: 100%;
        margin-top: 25px;
        padding: 0 20px;
        background: #fff;
        .border-shadow;
        .li:last-child{
          border-bottom: none;
        }
        .li{
          width: 100%;
          border-bottom: 1px dashed #eaeaea;
          margin-bottom: 10px;

          h5{
            position: relative;
            font-size: 16px;
            color: #5DC7D2;
            letter-spacing: 0.6px;
            line-height: 40px;
            padding-left: 15px;
          }
          h5:after{
            content: "";
            width: 3px;
            height: 20px;
            background: @blue;
            position: absolute;
            left: 0px;
            top: 10px
          }

          .text{
            width: 100%;
            padding: 8px 0 14px 0;

            span{
              display: block;
              line-height: 24px;
              letter-spacing: 0.52px;
              margin: 20px;
              .common-input-search{
                width: 300px;
              }
              a{
                width: 120px;
                margin: 0;
              }
            }

          }
          .table{
            .border-shadow;
          }
          .pro-tal{
            height: 100px;
            width: 100%;
            .fl-right{
              float: right;
              padding-left: 30px;
              text-align: right;
              line-height: 43px;
              span:first-child{
                border-bottom: 1px dashed #eaeaea;
                padding-left: 30px;
              }
              span{
                display: block;
                letter-spacing: 0.52px;
                i{
                  color: @blue;
                  padding-right: 20px;
                }
                .c-y{
                  color: #FFA171;
                }
              }
            }
          }
        }
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
                  width: 11%
                }
                span:nth-child(2) {
                  width: 16%
                }
                span:nth-child(3) {
                  width: 15%
                }
                span:nth-child(4) {
                  width: 10%
                }
                span:nth-child(5) {
                  width: 10%
                }
                span:nth-child(6) {
                  width: 10%
                }
                span:nth-child(7) {
                  width: 10%
                }
                span.img {
                    height: 60px;
                    img {
                        max-width: 60px;
                        height: auto;
                    }
                }
            }
        }
    }
}
</style>
