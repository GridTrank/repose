<template>
  <div class="header-wrap">
      <div class="nav-wrap">
          <img class="logo" src="../assets/logo.png" alt="">
          <div class="nav-lists">
            <div class="nav-item" href="#" target="_blank" v-for="(item,index) in navList" :key="index" @click="selectNav(index)">{{item.label}}</div>
          </div>
          <div >
                <el-input placeholder="搜索作品，作者名" style="width:200px" v-model="searchData"></el-input>
                <el-button type="primary" @click="search">搜索</el-button>
          </div>
          
          <div class="nav-right">
              <router-link to="/Recharge" class="nav-tab">
                  <img src="../assets/logo.png" >
                  <p>充值</p>
              </router-link>
              <router-link to="/Record?type='history'" class="nav-tab">
                  <img src="../assets/logo.png" >
                  <p>历史</p>
              </router-link>
              <router-link to="/Record?type='collect'" class="nav-tab">
                  <img src="../assets/logo.png" >
                  <p>收藏</p>
              </router-link>

          </div>
          <div class="user-info">
              <img class="user-img" src="../assets/logo.png" alt="">
              <p class="user-name">游客123123131</p>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            searchData:'',
            navList:[
                {label:'首页',value:0,url:'/Home'},
                {label:'分类',value:1,url:'/Classify'},
                {label:'今日更新',value:2,url:'/UpdateToday'},
                {label:'排行榜',value:3,url:'/RankList'},
            ],
            showIndex:0,
        }
    },
    watch:{
        '$route':function(to,from){

        }
    },
    methods:{
        selectNav(index){
            this.$router.push({
                path:this.navList[index].url
            })
        },
        search(){
            this.$router.push({
                path:'/Search',
                query:{
                    searchData:this.searchData
                }
            })
        }
    },
    mounted(){
    },
   
}
</script>

<style scoped lang="less">
.header-wrap{
    width: 100%;
    .nav-wrap{
        display: flex;
        background: #282828;
        position: relative;
        z-index: 100;
        height: 64px;
        align-items: center;
        justify-content: center;
        .logo{
            width: 70px;
            height: 40px
        }
        .nav-lists{
            margin: 0 30px;
            .nav-item{
                display: inline-block;
                color: #fff;
                font-size: 14px;
                padding: 2px 20px;
                text-align: center
            }
        }
        .nav-right{
            display: flex;
            margin: 0 30px;
            .nav-tab{
                text-align: center;
                padding: 0 20px;
                img{
                    width: 20px;
                    height: 20px;
                }
                p{
                    color: #ddd;
                    font-size: 14px;
                }
            }
        }
        .user-info{
            display: flex;
            margin: 0 30px;
            align-items: center;
            .user-img{
                width: 50px;
                height: 50px;
            }
            .user-name{
                color: #ddd;
                font-size: 14px;
            }
        }
    }
}
</style>