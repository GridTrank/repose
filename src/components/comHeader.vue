<template>
  <div class="header-wrap">
        <div class="nav-wrap">
            <div class="logobg"></div>
            <div class="nav-lists">
                <div class="nav-item" href="#" target="_blank" v-for="(item,index) in navList" :key="index" @click="selectNav(index)">{{item.label}}</div>
            </div>
            <div v-if="showSearch">
                <el-input placeholder="搜索作品，作者名" style="width:300px" v-model="searchData">
                    <el-button slot="append" icon="el-icon-search" @click="search"> </el-button>
                </el-input>
            </div>
            
            <div class="nav-right">
                <router-link to="/Recharge" class="nav-tab">
                    <img src="../assets/logo.png" >
                    <p>充值</p>
                </router-link>
                <router-link to="/Record?type=history" class="nav-tab">
                    <img src="../assets/logo.png" >
                    <p>历史</p>
                </router-link>
                <router-link to="/Record?type=collect" class="nav-tab">
                    <img src="../assets/logo.png" >
                    <p>收藏</p>
                </router-link>
            </div>
            
           
            <div class="user-info" 
            :class="showdown?'btr':''"
             @mouseenter="mouseEnter" 
             @mouseleave="mouseLeave"
             >
                <img class="user-img" src="../assets/logo.png" alt="">
                <p class="user-name">游客123123131</p>
                <div class="user-down" v-if="showdown">
                    <div class="item">
                        <p>当前用户为游客登录，建议尽快注册正式账号</p>
                    </div>
                    <div class="btns mt20">
                        <router-link class="btn" to="/Login?type=register">注册</router-link>
                        <router-link class="btn" to="/Login?type=login">登录</router-link>
                    </div>
                    <router-link to="/Record?type=collect" class="menu-item">我的收藏</router-link>
                    <router-link to="/Record?type=history" class="menu-item">阅读记录</router-link>
                    <router-link to="/UserCenter?type=consumption" class="menu-item">消费记录</router-link>
                    <router-link to="/UserCenter?type=recharge" class="menu-item">充值记录</router-link>
                    <router-link to="/UserCenter?type=vip" class="menu-item">兑换VIP</router-link>
                    <router-link to="/UserCenter?type=password" class="menu-item">修改密码</router-link>
                </div>
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
            showSearch:true,
            showdown:false,
        }
    },
    watch:{
        '$route':function(to,from){
            if(to.path=='/Search'){
                this.showSearch=false
            }else{
                this.showSearch=true
            }
        }
    },
    methods:{
        selectNav(index){
            this.$router.push({
                path:this.navList[index].url
            })
        },
        search(){
            // if(!this.searchData)return
            this.$router.push({
                path:'/Search',
                query:{
                    searchData:this.searchData
                }
            })
        },
        mouseEnter(){
            this.showdown=true
        },
        mouseLeave(){
            this.showdown=false
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
        height: 80px;
        align-items: center;
        justify-content: center;
        .nav-lists{
            flex-shrink: 0;
            margin: 0 30px;
            .nav-item{
                display: inline-block;
                color: #fff;
                width: 80px;
                font-size: 14px;
                padding: 2px 0px;
                text-align: center;
                cursor: pointer;
            }
        }
        .nav-right{
            display: flex;
            margin: 0 30px;
            .nav-tab{
                text-align: center;
                padding: 0 20px;
                width: 45px;
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
            align-items: center;
            padding: 5px 10px;
            border-radius: 12px;
            background: #fff;
            position: relative;
            cursor: pointer;
            .user-img{
                width: 50px;
                height: 50px;
                border-radius: 50%;
                border: 1px solid #ddd;
                margin-right: 20px;
            }
            .user-name{
                font-size: 14px;
            }
            .user-down{
                position: absolute;
                top:60px;
                border:1px solid#000;
                overflow: hidden; 
                width: 100%;
                left: -1px;
                padding-top: 20px;
                border-top:none;
                background: #fff;
                .item{
                    padding:10px;
                    border-top: 1px solid #000;
                }
                .btns{
                    display: flex;
                    justify-content: space-around;
                    margin-bottom: 20px;
                   .btn{
                        color: #fff;
                        background: red;
                        padding: 2px 8px;
                        border-radius: 8px;
                        cursor: pointer;
                    }
                }
                .menu-item{
                    display: block;
                    border-top:1px solid #000; 
                    padding: 10px;
                }
            }
        }
        .btr{
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        }
    }
}
</style>