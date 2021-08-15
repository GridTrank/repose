<template>
  <div id="app" >
      <commonHead v-if="$route.name!='Login'"/>
      <router-view ></router-view>
  </div>
</template>

<script>
import commonHead from '@/components/common/commonHead.vue'
import http from '@/utils/httpUtil'
export default {
  name: 'App',
  components:{
    commonHead
  },
  data(){
    return{
      suid:'',
      isCollapse:false
    }
  },
 
  created(){
    this.getIndex()
  },
  methods:{
    getIndex(){
        http.post("/yifangPC/index",{},(res=>{
            if(res.code!=200){
              localStorage.removeItem("userInfo")
              setTimeout(()=>{
                this.$router.push("/Login")
              },1000)
            }else if(res.code==200){
              this.$store.commit('updateUserInfo',res.data.user)
              this.$store.commit('updateMenusList',res.data.user)
            }
        }))
    },
    showMenu(val){
        this.isCollapse=!val
    }
  }
}
</script>

<style scoped lang="less">
#app {
  height: 100%;
  padding: 30px;
  min-width:1300px;
}
</style>
