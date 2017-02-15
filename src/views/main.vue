<template lang="html">
  <div class="main">
    <side-bar></side-bar>
    <div class="wrapper">
      <top-bar></top-bar>
      <div id="content">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import sidebar from './layout/sidebar'
import topbar from './layout/topbar'
import crumbs from './layout/crumbs'
export default {
  data: function () {
    return {
      transitionName: 'slide-left'
    }
  },
  computed: {},
  methods: {},
  components: {
    'side-bar': sidebar,
    'top-bar': topbar,
    'crumbs': crumbs
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth <= fromDepth ? 'slide-right' : 'slide-left'
    }
  }
}
</script>
<style lang="less" scoped>
@import '../style/variables.less';
.main{
  position: absolute;
  top: 0;
  left:0;
  bottom:0;
  right: 0;
  width: 100%;
  height: 100%;
  padding-left: @sidebar-w;
}
</style>
