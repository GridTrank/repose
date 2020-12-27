<template>
  <div class="home-wrap ">
    <slide :item="banner"></slide>
    <div class="tabs">
      <tabs></tabs>
    </div>
   
    <div class="container bodyCon">
      <div class="con-top">
        <div class="con-l">
          <img class="con-i" src="../assets/images/sszk.png" alt="">
          <p class="con-t">上升最快</p>
        </div>
        <router-link to="/RankList" class="con-more">更多></router-link>
      </div>
      <div class="con-pro">
          <productList :type="'typeOne'" :item="tops"></productList>
      </div>
    </div>

    <div class="container bodyCon">
      <div class="con-top">
        <div class="con-l">
          <img class="con-i" src="../assets/images/rmmh.png" alt="">
          <p class="con-t">热门漫画</p>
        </div>
        <router-link to="/RankList" class="con-more">更多></router-link>
      </div>
      <div class="con-pro">
          <productList :type="'typeOne'" :item="hots"></productList>
      </div>
    </div>
    <!-- 热门分类 -->
    <div class="container bodyCon">
      <div class="con-top">
        <div class="con-l">
          <img class="con-i" src="../assets/images/rmmh.png" alt="">
          <p class="con-t">热门分类</p>
          <div class="hot-c">
            <span class="tag" :class="selectTag==el?'select-tag':''" @click="toClass(e,el)" v-for="(e,el) in boks_tag.slice(0,4)" :key="el">{{e.tag_name}}</span>
          </div>
        </div>
        <router-link to="/Classify" class="con-more">更多></router-link>
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
            <router-link to="/RankList" class="con-more">更多></router-link>
          </div>
          <div class="con-pro">
              <productList :type="'typeTwo'" :item="newBooks" :from="'rankHome'"></productList>
          </div>
        </div>
        <div class="container rank">
          <div class="con-top">
            <div class="con-l">
              <p class="con-t">点击版</p>
            </div>
            <router-link to="/RankList" class="con-more">更多></router-link>
          </div>
          <div class="con-pro">
              <productList :type="'typeTwo'" :item="hots"></productList>
          </div>
        </div>
        <div class="container rank">
          <div class="con-top">
            <div class="con-l">
              <p class="con-t">推荐版</p>
            </div>
            <router-link to="/RankList" class="con-more">更多></router-link>
          </div>
          <div class="con-pro">
              <productList :type="'typeTwo'" :item="endBooks"></productList>
          </div>
        </div>
      </div>
    </div>

    <!-- 完结 -->
    <div class="container bodyCon">
      <div class="con-top">
        <div class="con-l">
          <img class="con-i" src="../assets/images/wjyx.png" alt="">
          <p class="con-t">完结优选</p>
        </div>
        <router-link to="/RankList" class="con-more">更多></router-link>
      </div>
      <div class="con-pro">
          <productList :type="'typeOne'" :item="endBooks"></productList>
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
  getmostcharged,
  getHot,
  getTops,
  getBookList
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
      selectTag:0,
      homeData:{},
      boks:[],
      boks_tag:[],
      newBooks:[],
      endBooks:[],
      banner:[],
      hots:[],
      tops:[],
      recharges:[],
      list:[]
    }
  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
      getNewest({}).then((res)=>{
        this.newBooks=res.data.newest
      })
      getBanners({}).then(res=>{
        this.banner=res.data.banners
      })
      getHot({}).then(res=>{
        this.hots=res.data.hots
      })
      getEnds({}).then(res=>{
        this.endBooks=res.data.ends
      })
      getTops({}).then(res=>{
        this.tops=res.data.tops
      })
      
      getList({}).then(res=>{
        this.boks_tag=res.data.tags
      })
      getmostcharged({}).then(res=>{
        this.recharges=''
      })
    },
    toClass(data,index){
      this.selectTag=index
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