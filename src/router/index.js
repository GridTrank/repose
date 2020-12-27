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
    {
      path: '/Login',
      name: 'Login',
      meta: { pageTitle: "登录/注册", keepAlive: true},
      component: (resolve) => require(['@/views/Login.vue'], resolve)
    },
    {
      path: '/Detail',
      name: 'Detail',
      meta: { pageTitle: "漫画详情", keepAlive: true},
      component: (resolve) => require(['@/views/Detail.vue'], resolve)
    },
    {
      path: '/Catalog',
      name: 'Catalog',
      meta: { pageTitle: "章节目录", keepAlive: true},
      component: (resolve) => require(['@/views/Catalog.vue'], resolve)
    },
    {
      path: '/Classify',
      name: 'Classify',
      meta: { pageTitle: "分类", keepAlive: true},
      component: (resolve) => require(['@/views/Classify.vue'], resolve)
    },
    {
      path: '/Search',
      name: 'Search',
      meta: { pageTitle: "搜索",keepAlive: true},
      component: (resolve) => require(['@/views/Search.vue'], resolve)
    },
    {
      path: '/UpdateToday',
      name: 'UpdateToday',
      meta: { pageTitle: "今日更新"},
      component: (resolve) => require(['@/views/UpdateToday.vue'], resolve)
    },
    {
      path: '/RankList',
      name: 'RankList',
      meta: { pageTitle: "排行榜"},
      component: (resolve) => require(['@/views/RankList.vue'], resolve)
    },
    {
      path: '/Recharge',
      name: 'Recharge',
      meta: { pageTitle: "充值",isToken:true},
      component: (resolve) => require(['@/views/Recharge.vue'], resolve)
    },
    {
      path: '/Record',
      name: 'Record',
      meta: { pageTitle: "历史",isToken:true},
      component: (resolve) => require(['@/views/Record.vue'], resolve)
    },
    {
      path: '/UserCenter',
      name: 'UserCenter',
      meta: { pageTitle: "用户中心"},
      component: (resolve) => require(['@/views/UserCenter.vue'], resolve)
    },
    {
      path: '/Upload',
      name: 'Upload',
      meta: { pageTitle: "下载"},
      component: (resolve) => require(['@/views/Upload.vue'], resolve)
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
