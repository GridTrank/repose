<template>
  <div id="app" >
      <el-container>
        <el-header v-if="getUserInfo.token">
            <comHeader></comHeader>
        </el-header>
        <el-container class="con">
          <el-aside :width=" isCollapse ?'70px':'300px'" v-if="getUserInfo.token">
              <comNav @showMenu="showMenu"></comNav>
          </el-aside>
          <el-main>
              <router-view  :key="$route.fullPath"></router-view>
          </el-main>
        </el-container>
      </el-container>
  </div>
</template>

<script>
import comHeader from '@/components/comHeader.vue'
import comNav from '@/components/comNav.vue'
import { mapActions,mapGetters } from 'vuex'
export default {
  name: 'App',
  components:{
    comHeader,
    comNav
  },
  data(){
    return{
      suid:'',
      isCollapse:false
    }
  },
  computed:{
      ...mapGetters(['getUserInfo',])
  },
  created(){
    let userInfo=JSON.parse(sessionStorage.getItem("userInfo"))
    if(userInfo){
      this.upDataUserInfo(userInfo)
    }
  },
  methods:{
    ...mapActions([
            'upDataUserInfo',
		]),
    showMenu(val){
        this.isCollapse=!val
    }
  }
}
</script>

<style scoped lang="less">
#app {
  height: 100%;
  .con{
    // margin-top: 40px;
  }
}
</style>
