const state = {
  count: 0,
  isShowCode: false
}

const mutations = {
  increment: (state) => {
    state.count
  },
  showCode: (state, isshow) => {
    state.isShowCode = isshow
  }
}

export default {
  state,
  mutations
}
