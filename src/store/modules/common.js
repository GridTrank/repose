//初始化数据
const state = {
    userInfo:'',
    systemInfo:"",
    showInput:true,
}

//getter 抛出去的数据
const getters = {
  getUserInfo(state) {
    return state.userInfo
  },
  getSystemInfo(state) {
    return state.systemInfo
  },
}

//action 异步的操作
const actions = {
    
  upDataUserInfo({commit}, payload) { 
      commit('upDataUserInfo', payload)
  },
  upDataSystemInfo({commit}, payload) { 
      commit('upDataSystemInfo', payload)
  },
  clearUserInfo({commit}, payload) { 
    commit('clearUserInfo', payload)
  },
}

//mutation
const mutations = {
  upDataUserInfo(state,data){
    state.userInfo = data;
  },
   upDataSystemInfo(state,data){
    state.systemInfo = data;
  },
  clearUserInfo(state,data){
    state.userInfo = '';
  },
  updateInput(state,data){
    state.showInput=data
  }

  
}


export default {
    state,
    mutations,
    actions,
    getters,
  };