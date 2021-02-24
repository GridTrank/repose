<template>
  <div id="app" >
    <div class="container">
      <router-view  :key="$route.fullPath"></router-view>
      <!-- <router-view v-if="!$route.meta.keepAlive" :key="$route.fullPath"></router-view> -->
      </div>
  </div>
</template>

<script>

import {userAutoReg,userAutoLogin} from '@/utils/api.js'
import {mapActions,mapGetters,mapMutations} from 'vuex'
import md5 from 'js-md5';
export default {
  name: 'App',
  components:{

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
