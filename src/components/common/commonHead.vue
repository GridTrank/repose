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
            menusList:[
                {
                    router:'/PublishArticles',
                    name:'发布文章',
                    icon:'el-icon-circle-plus-outline'
                },
                {
                    router:'/MyArticles',
                    name:'我的文章',
                    icon:'el-icon-document'
                },
                {
                    router:'/Drafts',
                    name:'草稿箱',
                    icon:'el-icon-notebook-1'
                },
                {
                    router:'/ArticlesManage',
                    name:'文章管理',
                    icon:'el-icon-postcard'
                },
                {
                    router:'/AccountManage',
                    name:'账号管理',
                    icon:'el-icon-user'
                },
            ]
        }
    },
    computed:{
        userInfo(){
            return this.$store.state.common.userInfo
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
    .head-logo{
        width: 200px;
    }
    .head-menus{
        margin-left: -15%;
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