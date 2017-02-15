<template>
<div class="side-bar">
  <div class="logo">
  </div>
  <ul>
    <li v-for="item,index in list" :class="{active: item.style === toPath}">
      <div v-if="index==0">
        <router-link to="/home">
          <div class="img " v-bind:class="item.style"></div>
          <h4>{{ item.name }}</h4>
        </router-link>
      </div>
      <div v-else>
        <div class="img " v-bind:class="item.style"></div>
        <h4>{{ item.name }}</h4>
        <div class="tags">
          <span v-for="tag in item.tags"><router-link :to="tag.url" >{{ tag.tagname }}</router-link></span>
        </div>
      </div>
    </li>
  </ul>
</div>
</template>
<script>
export default {
  data: function () {
    return {
      toPath: '',
      list: [{
        name: '首页',
        style: 'home',
        url: '/home',
        active: true,
        tags: []
      }, {
        name: 'vue',
        style: 'vue',
        url: '/vue',
        active: false,
        tags: [{
          tagname: '常用指令',
          url: '/vue/order'
        }]
      },
      {
        name: '数据报表',
        style: 'reports',
        url: '/reports',
        active: false,
        tags: [{
          tagname: '订单数据',
          url: '/reports/order'
        }, {
          tagname: '商品数据',
          url: '/reports/product'
        }]
      }
      // , {
      //   name: 'element-ui',
      //   style: 'element',
      //   url: '/element',
      //   active: false,
      //   tags: [{
      //     tagname: '分页的使用',
      //     url: '/element/pages'
      //   }, {
      //     tagname: '日期插件',
      //     url: '/element/date'
      //   }, {
      //     tagname: '日期插件',
      //     url: '/element/date'
      //   }]
      // }
      ]}
  },
  mounted: function () {
    this.init()
  },
  computed: {},
  methods: {
    init () {
      this.toPath = window.location.pathname.substr(1).split('/')[0].replace(/\?\S+/, '')
    }
  },
  watch: {
    '$route' (to, from) {
      this.toPath = to.path.substr(1).split('/')[0].replace(/\?\S+/, '')
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
@import '../../style/variables.less';
.side-bar {
    height: 100%;
    width: @sidebar-w;
    background-color: @blue;
    position: absolute;
    left: 0;
    // overflow-y: auto;
    padding-top: @top-h;
    .logo {
        width: 100%;
        position: absolute;
        top: 0;
        width: 100%;
        height: 60px;
    }

    ul {
        display: block;
        width: 100%;

        li {
            display: block;
            width: 100%;
            text-align: center;
            height: 100px;
            padding-top: 20px;
            color: #fff;
            position: relative;
            overflow: visible;
            .tags {
                position: absolute;
                top: 0;
                width: 105px;
                background: #fff;
                left: 100px;
                z-index: 3;
                font-weight: 300;

                span {
                    display: none;
                    width: 100%;
                    text-align: center;
                    height: 30px;
                    margin-bottom: 1px;
                    background: @blue;
                    font-size: 16px;
                    letter-spacing: 0.6px;
                    color: #fff;
                    line-height: 30px;
                    position: relative;
                }
                span.active,
                span:hover {
                    background: #55C6CF;
                }
                span.active:after,
                span:hover:after {
                    content: "";
                    position: absolute;
                    display: block;
                    width: 6px;
                    height: 6px;
                    background: #55C6CF;
                    .transform(45deg);
                    left: -2px;
                    top: 13px;
                }
            }
            .img {
                width: 34px;
                height: 34px;
                margin: 0 auto;
            }
            .home {
                background: url("../../assets/seller.png") no-repeat center;
                background-size: contain;
            }
            .element {
                background: url("../../assets/product.png") no-repeat center;
                background-size: contain;
            }
            .vue {
                background: url("../../assets/transaction.png") no-repeat center;
                background-size: contain;
            }
            .wallet {
                background: url("../../assets/wallet.png") no-repeat center;
                background-size: contain;
            }
            .reports {
                background: url("../../assets/reports.png") no-repeat center;
                background-size: contain;
            }
            .yuncai {
                background: url("../../assets/yuncai.png") no-repeat center;
                background-size: contain;
            }
            h4 {
                font-size: 16px;
                text-align: center;
                line-height: 32px;
                letter-spacing: 0.6px;
                font-weight: 300;
            }
        }
        li:hover {
            background: @blue-h;
            span {
                display: block;
            }
        }
        li.active {
            background: @blue-h;
        }
    }
}
</style>
