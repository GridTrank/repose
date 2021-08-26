<template>
    <div class="drafts-wrap page-wrap">
        <commonTitle :titleOptions="titleOptions"/>
        <div class="dra-list">
            <div class="dra-item" v-for="(item,index) in data" :key="index">
                <div class="dra-top">
                    <div class="dt-left">
                        <span class="dtl-left">{{item.relativedate}}</span>
                        <span class="dtl-right">{{item.topicalname}}</span>
                    </div>
                    <div class="dt-right">
                        <span class="dtr-i" @click="handle(item,'edit')"> <i class="el-icon-edit"></i> </span>
                        <span class="dtr-i" @click="handle(item,'del')"> <i class="el-icon-delete"></i> </span>
                    </div>
                </div>
                <div class="dra-content">
                    <div class="dc-left">
                        <p class="dcl-t">{{item.title}}</p>
                        <p class="dcl-b towHidden" >{{item.content}} </p>
                    </div>
                    <div class="dc-right">
                        <img :src="item.imageurl" >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 草稿箱
import commonTitle from '@/components/common/commonTitle.vue'
import http from '@/utils/httpUtil'
export default {
    name:'Drafts',
    components:{commonTitle},
    data(){
        return{
            titleOptions:{
                name:'草稿箱',
                remark:true,
            },
            data:[]
        }
    },
    created(){
        this.getData()
    },
    methods:{
        getData(){
            http.post('/yifangPC/article/draft',{},(res=>{
                if(res.code==200){
                    this.data=res.data
                }
            }))
        },
        handle(data,type){
            if(type=='edit'){
                this.$router.push({
                    path:'/EditArticles',
                    query:{
                        token:data.token,
                        type:'draft'
                    }
                })
            }else{
                this.$confirm('删除后数据无法恢复，请确认是否执行该操作','提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    http.post("/yifangPC/article/delete",{token:data.token},res=>{
                        console.log(res)
                        if(res.code==200){
                            this.$message({
                                message:'删除成功',
                                type:'success'
                            })
                            this.getData()
                        }
                    })
                }).catch(() => {
                    this.$message({
                    type: 'info',
                    message: '已取消删除'
                    });
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
.drafts-wrap{
    .dra-list{
        display: flex;
        flex-wrap: wrap;
        .dra-item{
            width: 48%;
            margin-top: 20px ;
            margin-right: 20px;
            background-color: #fff;
            border-radius: 12px;
            &:nth-child(2){
                margin-right: 0;
            }
            .dra-top{
                display: flex;
                justify-content: space-between;
                padding: 30px;
                border-bottom: 1px solid #ccc;
                .dt-left{
                    display: flex;
                    .dtl-left{
                        color: #999;
                        padding-right: 20px;
                        border-right: 1px solid #999;
                    }
                    .dtl-right{
                        margin-left:13px;
                    }
                }
                .dt-right{
                    width: 60px;
                    display: flex;
                    justify-content: space-between;
                    color: #999;
                    span{
                        cursor: pointer;
                    }
                }
            }
            .dra-content{
                padding:30px;
                display: flex;
                .dc-left{
                    width: 88%;
                    .dcl-t{
                        margin-bottom: 10px ;
                    }
                    .dcl-b{
                      width: 100%; 
                    }
                }
                .dc-right{
                    img{
                        width: 100px;
                    }
                }
            }
        }
    }
}
</style>