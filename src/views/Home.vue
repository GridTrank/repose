<template>
  <div class="home-wrap ">
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
        <div class="con-more">更多></div>
      </div>
      <div class="con-pro">
          <productList :type="'typeOne'" :item="newBooks"></productList>
      </div>
    </div>

    <div class="container bodyCon">
      <div class="con-top">
        <div class="con-l">
          <img class="con-i" src="../assets/logo.png" alt="">
          <p class="con-t">热门漫画</p>
        </div>
        <div class="con-more">更多></div>
      </div>
      <div class="con-pro">
          <productList :type="'typeOne'" :item="newBooks"></productList>
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
        <div class="con-more">更多></div>
      </div>
      <div class="con-pro">
          <productList :type="'typeOne'" :item="newBooks"></productList>
      </div>
    </div>

    <!-- 排行榜 -->
    <div class="rank-box">
      <div class="rank-wrap">
        <div class="container rank">
          <div class="con-top">
            <div class="con-l">
              <p class="con-t">新书版</p>
            </div>
            <div class="con-more">更多></div>
          </div>
          <div class="con-pro">
              <productList :type="'typeTwo'" :item="newBooks" :from="'ranklist'"></productList>
          </div>
        </div>
        <div class="container rank">
          <div class="con-top">
            <div class="con-l">
              <p class="con-t">点击版</p>
            </div>
            <div class="con-more">更多></div>
          </div>
          <div class="con-pro">
              <productList :type="'typeTwo'" :item="newBooks"></productList>
          </div>
        </div>
        <div class="container rank">
          <div class="con-top">
            <div class="con-l">
              <p class="con-t">推荐版</p>
            </div>
            <div class="con-more">更多></div>
          </div>
          <div class="con-pro">
              <productList :type="'typeTwo'" :item="newBooks"></productList>
          </div>
        </div>
      </div>
    </div>

    <!-- 完结 -->
    <div class="container bodyCon">
      <div class="con-top">
        <div class="con-l">
          <img class="con-i" src="../assets/logo.png" alt="">
          <p class="con-t">完结优选</p>
        </div>
        <div class="con-more">更多></div>
      </div>
      <div class="con-pro">
          <productList :type="'typeOne'" :item="newBooks"></productList>
      </div>
    </div>

    
  </div>
  
</template>

<script>

import productList from '@/components/productList.vue'
import tabs from '@/components/tabs.vue'
import slide from '@/components/slide.vue'
import {
  getEnds,
  getNewest,
  getBanners,
  getList,
  getmostcharged
} from '@/utils/api.js'
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
      boks:[],
      boks_tag:[],
      newBooks:[],
      endBooks:[],
      banner:[]
    }
  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
      Promise.all([
        getNewest({}),
        // getEnds({}),
        // getBanners({num:3}),
        // getList({}),
        // getmostcharged({})
      ])
      .then(([newBooks])=>{
        console.log(newBooks)
        this.newBooks=newBooks.data.newest
        // this.endBooks=endBooks.data.ends
        // this.banner=banner.data.banners
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
    background: linear-gradient(to top, #4B8C5C 0%, #75945E 100%) ;
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
          width:50px;
          height: 50px;
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
              font-size: 15px;
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