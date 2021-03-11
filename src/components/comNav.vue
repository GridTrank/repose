<template>
  <div class="nav-wrap">
    <div class="toggleMenu">
        <i @click="toggleCollapse" class="el-icon-menu"></i>
    </div>
    <el-menu 
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
      :unique-opened='true'
      :router="true">
      <el-submenu 
      v-for="(item,index) in navList" :key="index" 
      :index="item.menu_path">
          <div slot="title">
              <i :class="item.icon" style="color:#fff; margin-right:15px;"></i>
              <span style="color:#fff">{{item.menu_name}}</span>
          </div>

          <el-menu-item v-for="(v,i) in item.children" :key="i" 
          :index="v.menu_path">
              <span >{{v.menu_name}}</span>
          </el-menu-item>

      </el-submenu>
    </el-menu>
  </div>
  
</template>

<script>
import configUrl from '@/utils/config.js'
import { mapActions,mapGetters } from 'vuex'
export default {
  components:{

  },
  data(){
    return{
      navList:[],
      isCollapse:false
    }
  },
  computed:{
      ...mapGetters(['getUserInfo'])
  },
  created(){
    this.getParent(this.getUserInfo.menuList)
  },
  methods:{
    getParent(data){
      let arr=[]
      data.forEach(ele => {
          if(ele.parent_id && ele.child_id!=0){
            ele.children=[]
            arr.push(ele)
          }
      });
      this.getChild(data,arr)
    },
    getChild(data,arr){
      arr.forEach(ele=>{
        data.forEach(el=>{
          if(ele.child_id==el.parent_id){
            ele.children.push(el)
          }
        })
      })
      this.navList=arr
    },
    // 收起、打开菜单
    toggleCollapse(){
        // if(this.$route.meta.isUpdata){
        //     this.$refs.view.updataChart();
        // } 
        this.isCollapse = !this.isCollapse;
        this.$emit('showMenu',!this.isCollapse)
    }

  }
}
</script>

<style scoped lang="less">
.nav-wrap{
  width: 100%;
  height: auto;
  .toggleMenu {
      color: #fff;
      font-size: 24px;
      text-align: right;
      padding-top: 10px;
      cursor: pointer;
      padding-right: 24px;
  }
}
</style>