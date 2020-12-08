<template>
  <div id="app">
    <!-- <com-Header></com-Header> -->
    <router-view></router-view>
  </div>
</template>

<script>
import comHeader from '@/components/comHeader.vue'
export default {
  name: 'App',
  components:{
    comHeader,
    
  }
}
</script>

<style scoped lang="less">
#app {
  min-width: 1200px;
  height: 2000px;
}
</style>
