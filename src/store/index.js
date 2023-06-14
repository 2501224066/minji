import Vue from 'vue'
import Vuex from 'vuex'
import tab from '@/store/tab.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    LayValue: 0
  },
  getters: {},
  mutations: {
    // 修改laytab的选中下表
    changeValue(state, val) {
      console.log(state)
      state.LayValue = val
    }
  },
  actions: {},
  modules: {
    tab
  }
})