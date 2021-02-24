import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes= [
    {
      path: '/home',
      name: 'Home',
      meta: { pageTitle: "首页", keepAlive: true},
      component: (resolve) => require(['@/views/Home.vue'], resolve)
    },
  
    { // 匹配
      path: '*',
      name: 'Home',
      meta: { pageTitle: "首页" },
      component: (resolve) => require(['@/views/Home.vue'], resolve)
    }
]
const router = new Router({
  scrollBehavior(to, from, savedPosition) {
      if (to.hash) {
          return {
              selector: to.hash
          }
      } else {
          return { x: 0, y: 0 }
      }

  },
  mode: 'hash',
  routes
});

export default router;
