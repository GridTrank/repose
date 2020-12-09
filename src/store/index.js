// 组装模块并导出 store 的地方
import Vue from 'vue';
import Vuex from 'vuex';

import common from './modules/common.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    common,
  },
//   strict: process.env.NODE_ENV !== 'production', // 严格模式
});