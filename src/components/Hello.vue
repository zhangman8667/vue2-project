<template>
    <div class="side-bar">
        <ul> <li> <div class="img seller"></div> <h4>我是卖家</h4> </li><li class="active"> <div class="img product"></div> <h4>商品管理</h4> </li><li> <div class="img transaction"></div> <h4>交易管理</h4> </li><li> <div class="img wallet"></div> <h4>我的钱包</h4> </li><li> <div class="img reports"></div> <h4>数据报表</h4> </li><li> <div class="img yuncai"></div> <h4>我的云采</h4> </li> </ul>
    </div>
</template>
<script>
</script>
<style lang="less" scoped>
@import '../style/variables.less';
.side-bar {
  height: 100%;
  width: @sidebar-w;
  background-color: @blue;
  position: absolute;
  left: 0;
  overflow-y: auto;
  padding-top: @top-h;
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
      .img {
        width: 34px;
        height: 34px;
        margin: 0 auto;
      }
      .seller {
        background: url("../assets/seller.png") no-repeat center;
        background-size: contain;
      }
      .product {
        background: url("../assets/product.png") no-repeat center;
        background-size: contain;
      }
      .transaction {
        background: url("../assets/transaction.png") no-repeat center;
        background-size: contain;
      }
      .wallet {
        background: url("../assets/wallet.png") no-repeat center;
        background-size: contain;
      }
      .reports {
        background: url("../assets/reports.png") no-repeat center;
        background-size: contain;
      }
      .yuncai {
        background: url("../assets/yuncai.png") no-repeat center;
        background-size: contain;
      }
      h4 {
        font-size: 16px;
        text-align: center;
        line-height: 32px;
        letter-spacing: 0.6px;
      }
    }
    li.active {
      background: @blue-h;
    }
  }
}

</style>
