import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes= [
    {
      path: '/PublishArticles',
      name: 'PublishArticles',
      meta: { pageTitle: "发布文章", keepAlive: true},
      component: (resolve) => require(['@/views/PublishArticles.vue'], resolve)
    },
    {
      path: '/MyArticles',
      name: 'MyArticles',
      meta: { pageTitle: "我的文章", keepAlive: true},
      component: (resolve) => require(['@/views/MyArticles.vue'], resolve)
    },
    {
      path: '/EditArticles',
      name: 'EditArticles',
      meta: { pageTitle: "编辑文章", keepAlive: true},
      component: (resolve) => require(['@/views/EditArticles.vue'], resolve)
    },
    {
      path: '/EditDrafts',
      name: 'EditDrafts',
      meta: { pageTitle: "编辑文章", keepAlive: true},
      component: (resolve) => require(['@/views/EditDrafts.vue'], resolve)
    },
    {
      path: '/Drafts',
      name: 'Drafts',
      meta: { pageTitle: "草稿箱", keepAlive: true},
      component: (resolve) => require(['@/views/Drafts.vue'], resolve)
    },
    {
      path: '/ArticlesManage',
      name: 'ArticlesManage',
      meta: { pageTitle: "文章管理", keepAlive: true},
      component: (resolve) => require(['@/views/ArticlesManage.vue'], resolve)
    },
    {
      path: '/AccountManage',
      name: 'AccountManage',
      meta: { pageTitle: "账号管理", keepAlive: true},
      component: (resolve) => require(['@/views/AccountManage.vue'], resolve)
    },
  
    { // 匹配
      path: '*',
      name: 'PublishArticles',
      meta: { pageTitle: "发布文章" },
      component: (resolve) => require(['@/views/PublishArticles.vue'], resolve)
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
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export default router;
