<template>
    <div class="head-wrap">
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
            <img class="" :src="userInfo.avatar" alt="">
            <p>{{userInfo.nickname}}</p>
        </div>
    </div>
</template>

<script>
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
    mounted(){
        if(!this.$route.name){
            sessionStorage.setItem('routerIndex',1)
        }
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
        display: flex;
        align-items: center;
        img{
            width: 40px;
            border-radius: 50%;
            margin-right: 10px;
        }
    }
}
</style>