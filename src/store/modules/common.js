//初始化数据
const state = {
    showQuote:false,
    userInfo:{},
    menusList:[
      {
        router:'/PublishArticles',
        name:'发布文章',
        icon:'el-icon-circle-plus-outline'
      },
      {
          router:'/MyArticles',
          name:'我的文章',
          icon:'el-icon-document'
      },
      {
          router:'/Drafts',
          name:'草稿箱',
          icon:'el-icon-notebook-1'
      },
    ],
    showTitleDialog:false,
    changeTitleToken:''
}


//action 异步的操作
const actions = {
  
}

//mutation
const mutations = {
  updateShowQuote(state,data){
    state.showQuote=data
  },
  updateShowTitleDialog(state,data){
    state.showTitleDialog=data.show
    state.changeTitleToken=data.token
  },
  updateUserInfo(state,data){
    localStorage.setItem('userInfo',JSON.stringify(data))
    let authoritylist=data.authoritylist
    console.log(authoritylist)
    if(authoritylist.length==0){
      state.menusList=[
        {
          router:'/PublishArticles',
          name:'发布文章',
          icon:'el-icon-circle-plus-outline'
        },
        {
            router:'/MyArticles',
            name:'我的文章',
            icon:'el-icon-document'
        },
        {
            router:'/Drafts',
            name:'草稿箱',
            icon:'el-icon-notebook-1'
        },
      ]
    }else if(authoritylist.indexOf(12)!=-1){
      state.menusList=[
        {
          router:'/PublishArticles',
          name:'发布文章',
          icon:'el-icon-circle-plus-outline'
        },
        {
            router:'/MyArticles',
            name:'我的文章',
            icon:'el-icon-document'
        },
        {
            router:'/Drafts',
            name:'草稿箱',
            icon:'el-icon-notebook-1'
        },
        {
            router:'/ArticlesManage',
            name:'文章管理',
            icon:'el-icon-postcard'
        },
        {
            router:'/AccountManage',
            name:'账号管理',
            icon:'el-icon-user'
        },
      ]
    }else if(authoritylist.indexOf(13)!=-1){
      state.menusList=[
        {
          router:'/PublishArticles',
          name:'发布文章',
          icon:'el-icon-circle-plus-outline'
        },
        {
            router:'/MyArticles',
            name:'我的文章',
            icon:'el-icon-document'
        },
        {
            router:'/Drafts',
            name:'草稿箱',
            icon:'el-icon-notebook-1'
        },
        {
            router:'/ArticlesManage',
            name:'文章管理',
            icon:'el-icon-postcard'
        }
      ]
    }
    
    state.userInfo=data
  },
  updateMenusList(state,data){
    
  }
}


export default {
    state,
    mutations,
    actions,
  };