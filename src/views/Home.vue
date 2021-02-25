<template>
  <div class="home-wrap">
    
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
    }
  },
  created(){
  },
  methods:{
 

  }
}
</script>

<style scoped lang="less">
.home-wrap{
  width: 100%;
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