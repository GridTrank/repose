<template>
    <div class="head-wrap page-wrap">
        <img class="head-logo" src="@/assets/images/logo.png" >
        <div class="head-menus">
            <div class="menus-list">
                <div class="menus-item" 
                :class="active==index && 'active'"
                v-for="(item,index) in menusList" :key="index" 
                @click="toPage(item,index)">
                    <i :class="item.icon"></i>
                    <p>{{item.name}}</p>
                </div>
            </div>
        </div>
        <div class="head-user">
            <el-dropdown trigger="click">
                <div class="user-info">
                    <img class="" :src="userInfo.avatar" alt="">
                    <p>{{userInfo.nickname}}</p>
                </div>

                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <p  @click="loginOut">退出</p>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            
        </div>
    </div>
</template>

<script>
import http from '@/utils/httpUtil'
export default {
    data(){
        return{
            active:0,
        }
    },
    computed:{
        userInfo(){
            return this.$store.state.common.userInfo
        },
        menusList(){
            return this.$store.state.common.menusList
        }

    },
    watch:{
        "$route":function(val){
            this.menusList.forEach((item,index)=>{
                if(item.router==val.path){
                    this.active=index
                }
            })
        }

    },
    mounted(){
        if(sessionStorage.getItem('routerIndex')){
            this.active=sessionStorage.getItem('routerIndex')
        }
    },
    
    methods:{
        toPage(item,index){
            this.active=index
            sessionStorage.setItem('routerIndex',index)
            this.$router.push({
                path:item.router
            })
        },
        loginOut(){
            this.$confirm('是否退出账户','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                http.post("/yifangPC/quit",{},(res=>{
                    if(res.code==200){
                        this.$message({
                            message:'已退出当前账号',
                            type:'success'
                        })
                        localStorage.clear()
                        setTimeout(()=>{
                            this.$router.push('/Login')
                        },1000)
                    }
                }))
            }).catch(() => {
                this.$message({
                type: 'info',
                message: '已取消删除'
                });
            })
        }
    }
}
</script>

<style scoped lang="less">
.head-wrap{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    position: relative;
    .head-logo{
        width: 200px;
    }
    .head-menus{
        position: absolute;
        left: 400px;
        .menus-list{
            display: flex;
            .menus-item{
                display: flex;
                align-items: center;
                margin-right: 45px;
                cursor: pointer;
                color: #999;
                font-size:18px;
                p{
                    margin-left:10px;
                }
            }
            .active{
                color:#333;
            }
        }
    }
    .head-user{
        .user-info{
            display: flex;
            align-items: center;
            cursor: pointer;
            img{
                width: 40px;
                border-radius: 50%;
                margin-right: 10px;
            }
        }
        
    }
}
</style>