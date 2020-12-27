<template>
  <div id="app" >
     <com-Header></com-Header>
    <div class="container">
      <router-view  :key="$route.fullPath"></router-view>
      <!-- <router-view v-if="!$route.meta.keepAlive" :key="$route.fullPath"></router-view> -->
    </div>
    <comFoot class="foot"></comFoot> 
  </div>
</template>

<script>
import comHeader from '@/components/comHeader.vue'
import comFoot from '@/components/comFoot.vue'
import {userAutoReg,userAutoLogin} from '@/utils/api.js'
import {mapActions,mapGetters,mapMutations} from 'vuex'
import md5 from 'js-md5';
export default {
  name: 'App',
  components:{
    comHeader,
    comFoot
  },
  data(){
    return{
      suid:''
    }
  },
  created(){
    let appkey='hahmh';
    let times=(new Date().getTime()/1000).toFixed(0);
    this.suid=md5(appkey+times)
    if(!localStorage.getItem("suid")){
      localStorage.setItem("suid",this.suid)
    }
    if(!localStorage.getItem("utoken")){
      this.autoRegister()
    }
  },
  methods:{
      ...mapActions(["upDataUserInfo"]),
      autoRegister(){
        userAutoReg({suid:localStorage.getItem("suid")}).then(res=>{
          if(res.data.success==1){
            userAutoLogin({suid:localStorage.getItem("suid")}).then(res=>{
              if(res.data.userInfo){
                localStorage.setItem("userInfo",JSON.stringify(res.data.userInfo))
                localStorage.setItem("utoken",res.data.userInfo.utoken)
                this.upDataUserInfo(Object.assign({},this.getUserInfo,res.data.userInfo))
              }
            })
          }
        })
      }
  }
}
</script>

<style scoped lang="less">
#app {
  // min-width: 1200px;
  background: #F9F9F9;
  min-height: 800px;
  position: relative;
  .container{
    min-height: 500px
  }
}
</style>
