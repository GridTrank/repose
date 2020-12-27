<template>
  <div class="header-wrap">
        <div class="nav-wrap">
            <img  class="logobg" src="../assets/images/logo.png" >
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
                    <img src="../assets/images/cz.png" >
                    <p>充值</p>
                </router-link>
                <router-link to="/Record?type=history" class="nav-tab">
                    <img src="../assets/images/ls.png" >
                    <p>历史</p>
                </router-link>
                <router-link to="/Record?type=collect" class="nav-tab">
                    <img src="../assets/images/sc.png" >
                    <p>收藏</p>
                </router-link>
            </div>
            <div class="no-login" v-if="!getUserInfo">
                <router-link to="/Login?type=login" class="l-btn" >登录</router-link>
                <router-link to="/Login?type=register" class="l-btn">注册</router-link>
            </div>
            <div v-else class="user-info" 
            :class="showdown?'btr':''"
             @mouseenter="mouseEnter" 
             @mouseleave="mouseLeave"
             >
                <img class="user-img" src="../assets/images/tx.png" alt="">
                <p class="user-name">{{getUserInfo.level==1?'游客':''}}{{getUserInfo.username}}</p>
                <div class="user-down" v-if="showdown">
                    <div class="item">
                        <p v-if="getUserInfo.level==1">当前用户为游客登录，建议尽快注册正式账号</p>
                    </div>
                    <div class="btns mt20" v-if="getUserInfo.level==1">
                        <router-link class="btn" to="/Login?type=register">注册</router-link>
                        <router-link class="btn" to="/Login?type=login">登录</router-link>
                    </div>
                    <router-link to="/Record?type=collect" class="menu-item">
                        <img src="../assets/images/wdsc.png" alt="">
                        <span>我的收藏</span>
                    </router-link>
                    <router-link to="/Record?type=history" class="menu-item">
                        <img src="../assets/images/ydjl.png" alt="">
                        <span>阅读记录</span>
                    </router-link>
                    <router-link to="/UserCenter?type=consumption" class="menu-item">
                        <img src="../assets/images/xfjl.png" alt="">
                        <span>消费记录</span>
                    </router-link>
                    <router-link to="/UserCenter?type=recharge" class="menu-item">
                        <img src="../assets/images/czjl.png" alt="">
                        <span>充值记录</span>
                    </router-link>
                    <router-link to="/UserCenter?type=vip" class="menu-item">
                        <img src="../assets/images/dhvip.png" alt="">
                        <span>兑换vip</span>
                    </router-link>
                    <router-link to="/UserCenter?type=password" class="menu-item">
                        <img src="../assets/images/xgmm.png" alt="">
                        <span>修改密码</span>
                    </router-link>
                    <div  class="menu-item" @click="logout">
                        <img src="../assets/images/tcdl.png" alt="">
                        <span>退出登录</span>
                    </div>
                </div>
            </div>
                
        </div>
  </div>
</template>

<script>

import { mapActions, mapGetters } from "vuex";
import {
    userLogout,
}from '@/utils/api.js'
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
    computed: {
        ...mapGetters(["getUserInfo"])
    },
    created(){
        this.init()
    },
    methods:{
        ...mapActions(['upDataUserInfo']),
        init(){
            if(!this.getUserInfo && localStorage.getItem("userInfo")){
                this.upDataUserInfo(JSON.parse(localStorage.getItem("userInfo")))
            }
        },
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
        logout(){
            this.$confirm('确认是否退出登录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '已退出登录!'
                    });
                    localStorage.clear()
                    this.upDataUserInfo('')
                }).catch((err)=>{
                    console.log(err)
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
                    width: 14px;
                    height: 14px;
                }
                p{
                    color: #fff;
                    font-size: 14px;
                }
            }
        }
        .no-login{
            display: flex;
            .l-btn{
                padding: 6px 13px;
                border:1px solid #FCE13D;
                border-radius: 16px;
                color: #FCE13D;
                font-size: 14px;
                margin-right: 30px;
                cursor: pointer;
            }
        }
        .user-info{
            width: 175px;
            display: flex;
            align-items: center;
            padding: 5px 10px;
            border-radius: 12px;
            position: relative;
            background: #2E2E2E;
            cursor: pointer;
            .user-img{
                width: 33px;
                height: 33px;
                border-radius: 50%;
                border: 1px solid #ddd;
                margin-right: 10px;
            }
            .user-name{
                font-size: 14px;
                color: #fff;
            }
            .user-down{
                position: absolute;
                top:45px;
                background: #2E2E2E;
                overflow: hidden; 
                width: 100%;
                left: 0;
                padding-top: 30px;
                padding-bottom: 30px;
                border-top:none;
                .item{
                    padding:10px 30px;
                    font-size: 12px;
                    p{
                        color: #999;
                    }
                }
                .btns{
                    display: flex;
                    justify-content: space-around;
                    margin-bottom: 20px;
                   .btn{
                        color: #FCE13D;
                        padding: 6px 13px;
                        border-radius: 16px;
                        border: 1px solid #FCE13D;
                        font-size: 14px;
                        cursor: pointer;
                    }
                }
                .menu-item{
                    display: flex;
                    align-items: center;
                    margin-left: 20px;
                    padding: 10px;
                    img{
                        width: 20px;
                        height: 20px;
                        margin-right: 10px;
                    }
                    span{
                        color: #fff;
                        font-size: 14px;
                    }
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