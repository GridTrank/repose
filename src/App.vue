<template>
  <div id="app" >
      <el-container>
        <el-header>
            <comHeader></comHeader>
        </el-header>
        <el-container>
          <el-aside>
              <comNav></comNav>
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
export default {
  name: 'App',
  components:{
    comHeader,
    comNav
  },
  data(){
    return{
      suid:''
    }
  },
  created(){

  },
  methods:{

  }
}
</script>

<style scoped lang="less">
#app {

}
</style>
