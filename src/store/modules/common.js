//初始化数据
const state = {
    showQuote:false,
    userInfo:{}
}


//action 异步的操作
const actions = {
  
}

//mutation
const mutations = {
  updateShowQuote(state,data){
    state.showQuote=data
  },
  updateUserInfo(state,data){
    localStorage.setItem('userInfo',JSON.stringify(data))
    state.userInfo=data
  }
}


export default {
    state,
    mutations,
    actions,
  };