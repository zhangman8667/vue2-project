<template>
<div>
  <crumbs :crumbs_info="crumbs"></crumbs>
  <div class="element">
    <div class="r-header">
      <div class="tags">
        <a v-for="tab,index in tabs" v-bind:class="{active:index === selected}" @click="choose(index)">{{tab.name}}</a>
      </div>
    </div>
    <div class="content">
    </div>
  </div>
</div>
</template>
<script>
import crumbs from '../layout/crumbs'
export default {
  data: function () {
    return {
      crumbs: {
        list: [
          {name: 'element', go: 0},
          {name: '介绍', go: 0}
        ]
      }
    }
  },
  mounted: function () {
  },
  computed: {},
  methods: {
  },
  components: {
    'crumbs': crumbs
  }
}
</script>
<style lang="less" scoped>
@import '../../style/variables.less';
.element {
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
