
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store'

import './assets/global.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)


import global from './utils/global.js'
Vue.prototype.$global=global


Vue.config.productionTip = false
router.beforeEach((to,from,next) => {
  if(to.meta.pageTitle){
    document.title = '油条漫画--'+ to.meta.pageTitle
  }
  next()
});
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
