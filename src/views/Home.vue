<template>
  <div class="nav">
    <el-menu 
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :router="false">
      <el-submenu 
      v-for="(item,index) in navList" :key="index" 
      :index="item.menu_path">
          <div slot="title">
              <span style="color:#fff">{{item.menu_name}}</span>
          </div>

          <el-menu-item v-for="(v,i) in item.children" :key="i" 
          :index="v.menu_path">
              <span style="color:#fff">{{v.menu_name}}</span>
          </el-menu-item>

      </el-submenu>
    </el-menu>
  </div>
  
</template>

<script>
import {
  getHot,
  test
} from '@/utils/api.js'
import configUrl from '@/utils/config.js'
export default {
  components:{

  },
  data(){
    return{
      navList:[]
    }
  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
      getHot().then(res=>{
        let data=res.data.menuList
        this.getParent(data)
      })
    },
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
    }

  }
}
</script>

<style scoped lang="less">
.home-wrap{
  width: 100%;
  height: auto;
  .tabs{
    margin: auto;
    width: 95%;
  }
  
  .rank-box{
    background: linear-gradient(to top, #791512  0%, #341C1A  100%) ;
    height: 600px;
    padding: 30px;
    .rank-wrap{
      width: 1200px;
      display: flex;
      margin: auto;
      justify-content: space-between;
      .rank{
        width: 380px !important;
        padding: 0px  !important;
        margin: 0px  !important;
        .con-t{
          color: #fff !important;
          font-size: 24px !important;
        }
      }
      .con-more{
        font-size: 14px;
        color: #000;
        cursor: pointer;
        color: #fff !important;
      }
    }
    
  }
  .container{
    padding: 10px;
    // width: 1200px;
    margin: 20px auto;
    .con-top{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .con-l{
        display: flex;
        align-items: center;
        .con-i{
          width:30px;
          height: 30px;
          margin-right: 20px;
        }
        .con-t{
          font-size: 24px;
          color: #000;
          font-weight:500;
        }
        .hot-c{
          margin-left: 30px;
            span{
              display: inline-block;
              padding: 5px 20px;
              font-size: 16px;
              cursor: pointer;
              color: #1A1A1A;
            }
            .select-tag{
              color: #F5A623;
            }
        }
      }
      .con-more{
        margin-right: 22px;
        font-size: 14px;
        color: #000;
        cursor: pointer;
      }
    }
  }
}
</style>