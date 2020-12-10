<template>
  <div class="home-wrap " 
    v-loading.fullscreen.lock="loading"
     element-loading-text="加载中"
     element-loading-spinner="el-icon-loading"
     element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <slide :item="homeData.banners"></slide>
    <div class="tabs">
      <tabs></tabs>
    </div>
   
    <div class="container bodyCon">
      <div class="con-top">
        <div class="con-l">
          <img class="con-i" src="../assets/logo.png" alt="">
          <p class="con-t">上升最快</p>
        </div>
        <div class="con-more">更多</div>
      </div>
      <div class="con-pro">
          <productList :type="'typeOne'" :item="homeData.newest"></productList>
      </div>
    </div>

    <div class="container bodyCon">
      <div class="con-top">
        <div class="con-l">
          <img class="con-i" src="../assets/logo.png" alt="">
          <p class="con-t">热门漫画</p>
        </div>
        <div class="con-more">更多</div>
      </div>
      <div class="con-pro">
          <productList :type="'typeOne'" :item="homeData.hot_books"></productList>
      </div>
    </div>
    <div class="container bodyCon">
      <div class="con-top">
        <div class="con-l">
          <img class="con-i" src="../assets/logo.png" alt="">
          <p class="con-t">热门分类</p>
          <div class="hot-c">
            <span v-for="(e,el) in boks_tag" :key="el">{{e.tag_name}}</span>
          </div>
        </div>
        <div class="con-more">更多</div>
      </div>
      <div class="con-pro">
          <productList :type="'typeOne'" :item="boks"></productList>
      </div>
    </div>

    <div class="rank-box bodyCon">
      <div class="container rank">
        <div class="con-top">
          <div class="con-l">
            <img class="con-i" src="../assets/logo.png" alt="">
            <p class="con-t">新书版</p>
          </div>
          <div class="con-more">更多</div>
        </div>
        <div class="con-pro">
            <productList :type="'typeTwo'" :item="homeData.newbook"></productList>
        </div>
      </div>
      <div class="container rank">
        <div class="con-top">
          <div class="con-l">
            <img class="con-i" src="../assets/logo.png" alt="">
            <p class="con-t">点击版</p>
          </div>
          <div class="con-more">更多</div>
        </div>
        <div class="con-pro">
            <productList :type="'typeTwo'" :item="homeData.djbook"></productList>
        </div>
      </div>
      <div class="container rank">
        <div class="con-top">
          <div class="con-l">
            <img class="con-i" src="../assets/logo.png" alt="">
            <p class="con-t">推荐版</p>
          </div>
          <div class="con-more">更多</div>
        </div>
        <div class="con-pro">
            <productList :type="'typeTwo'" :item="homeData.tjbook"></productList>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>

import productList from '@/components/productList.vue'
import tabs from '@/components/tabs.vue'
import slide from '@/components/slide.vue'
import {getIndex} from '@/utils/api.js'
import configUrl from '@/utils/config.js'
export default {
  components:{

    productList,
    tabs,
    slide
  },
  data(){
    return{
      homeData:{},
      loading:true,
      boks:[],
      boks_tag:[]
    }
  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
      getIndex({}).then(res=>{
        this.loading=false
        if(res.status==200){
          let book_tags=res.data.data.book_tags
          this.boks_tag=book_tags.tags
          for(let key in book_tags){
            if(key!=='tags'){
              this.boks.push(book_tags[key])
            }
          }
          this.homeData=res.data.data
        }
        this.loading=false
      })
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
    display: flex;
    // width: 1200px;
    margin: auto;
    justify-content: space-between;
    .rank{
      width: 350px !important;
      padding: 0px  !important;
      margin: 0px  !important;
    }
    .con-more{
      // margin: 0 !important;
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
          width:50px;
          height: 50px;
          margin-right: 20px;
        }
        .con-t{
          font-size: 18px;
        }
        .hot-c{
          margin-left: 30px;
            span{
              display: inline-block;
              padding: 5px 20px;
              font-size: 15px;
            }
        }
      }
      .con-more{
        margin-right: 22px;
      }
    }
  }
}
</style>