<template>
  <div id="app" >
    <com-Header></com-Header>
    <div class="container">
      <keep-alive>
          <router-view v-if="$route.meta.keepAlive" ></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script>
import comHeader from '@/components/comHeader.vue'
export default {
  name: 'App',
  components:{
    comHeader,
    
  },
  data(){
    return{
    }
  }
}
</script>

<style scoped lang="less">
#app {
  min-width: 1200px;
  // height: 2000px;
  padding-bottom:50px;

}
</style>
