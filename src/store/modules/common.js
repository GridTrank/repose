//初始化数据
const state = {
    userInfo:'',
    systemInfo:"",
    showInput:true,
    menuList:[]
}

//getter 抛出去的数据
const getters = {
  getUserInfo(state) {
    return state.userInfo
  },
  getSystemInfo(state) {
    return state.systemInfo
  },
  getMenuList(state){
    return state.menuList
  }
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
  upDateMenuList({commit}, payload){
    commit('upDateMenuList', payload)
  }
}

//mutation
const mutations = {
  upDataUserInfo(state,data){
    state.userInfo = data;
  },
  upDataSystemInfo(state,data){
    state.systemInfo = data;
  },
  upDateMenuList(state,data){
    state.menuList = data;
  },
  clearUserInfo(state,data){
    state.userInfo = '';
  },
}


export default {
    state,
    mutations,
    actions,
    getters,
  };