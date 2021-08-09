<template>
  <div id="app" >
      <commonHead/>
      <router-view ></router-view>
  </div>
</template>

<script>
import commonHead from '@/components/common/commonHead.vue'
import { mapActions,mapGetters } from 'vuex'
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
  computed:{
      ...mapGetters(['getUserInfo',])
  },
  created(){
  
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
  padding: 30px;
  min-width:1300px;
}
</style>
