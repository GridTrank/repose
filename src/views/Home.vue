<template>
  <div class="home-wrap">
    <userInfo></userInfo>
    <recharge></recharge>
    <chapters></chapters>
    <productList></productList>
    <carousel></carousel>

    <div class="tabs">
      <tabs></tabs>
    </div>
    
    <div class="container">
      <div class="con-top">
        <div class="con-l">
          <img class="con-i" src="../assets/logo.png" alt="">
          <p class="con-t">上升最快</p>
        </div>
        <div class="con-more">更多</div>
      </div>
      <div class="con-pro">
          <productList :type="'typeOne'"></productList>
      </div>
    </div>


    <div class="container">
      <div class="con-top">
        <div class="con-l">
          <img class="con-i" src="../assets/logo.png" alt="">
          <p class="con-t">热门漫画</p>
        </div>
        <div class="con-more">更多</div>
      </div>
      <div class="con-pro">
          <productList :type="'typeOne'"></productList>
      </div>
    </div>


    <div class="rank-box">
      <div class="container rank">
        <div class="con-top">
          <div class="con-l">
            <img class="con-i" src="../assets/logo.png" alt="">
            <p class="con-t">热门漫画</p>
          </div>
          <div class="con-more">更多</div>
        </div>
        <div class="con-pro">
            <productList :type="'typeTwo'"></productList>
        </div>
      </div>
      <div class="container rank">
        <div class="con-top">
          <div class="con-l">
            <img class="con-i" src="../assets/logo.png" alt="">
            <p class="con-t">热门漫画</p>
          </div>
          <div class="con-more">更多</div>
        </div>
        <div class="con-pro">
            <productList :type="'typeTwo'"></productList>
        </div>
      </div>
      <div class="container rank">
        <div class="con-top">
          <div class="con-l">
            <img class="con-i" src="../assets/logo.png" alt="">
            <p class="con-t">热门漫画</p>
          </div>
          <div class="con-more">更多</div>
        </div>
        <div class="con-pro">
            <productList :type="'typeTwo'"></productList>
        </div>
      </div>
    </div>

    


  </div>
  
</template>

<script>
import userInfo from '@/components/userInfo.vue'
import recharge from '@/components/recharge.vue'
import chapters from '@/components/chapters.vue'
import productList from '@/components/productList.vue'
import carousel from '@/components/carousel.vue'
import tabs from '@/components/tabs.vue'
export default {
  components:{
    userInfo,
    recharge,
    chapters,
    productList,
    carousel,
    tabs
  }
}
</script>

<style scoped lang="less">
.home-wrap{
  width: 100%;
  height: auto;
  display: none;
  .tabs{
    margin: auto;
    width: 95%;
  }
  
  .rank-box{
    display: flex;
    width: 1200px;
    margin: auto;
    justify-content: space-between;
    .rank{
      width: 350px !important;
      padding: 0px  !important;
      margin: 0px  !important;
    }
  }
  .container{
    padding: 10px;
    width: 1200px;
    margin: 10px auto;
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
      }
      .con-more{
        // margin-right: 50px;
      }
    }
  }
}
</style>