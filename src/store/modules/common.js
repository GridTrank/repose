//初始化数据
const state = {
    showQuote:false
}

//getter 抛出去的数据
const getters = {

}

//action 异步的操作
const actions = {

}

//mutation
const mutations = {
  updateShowQuote(state,data){
    state.showQuote=data
  }
}


export default {
    state,
    mutations,
    actions,
    getters,
  };