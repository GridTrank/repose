<template>
    <div class="drafts-wrap">
        <commonTitle :titleOptions="titleOptions"/>
        <div class="dra-list">
            <div class="dra-item" v-for="(item,index) in 3" :key="index">
                <div class="dra-top">
                    <div class="dt-left">
                        <span class="dtl-left">3小时前</span>
                        <span class="dtl-right">行前攻略</span>
                    </div>
                    <div class="dt-right">
                        <span class="dtr-i" @click="handle(item,'edit')"> <i class="el-icon-edit"></i> </span>
                        <span class="dtr-i" @click="handle(item,'del')"> <i class="el-icon-delete"></i> </span>
                    </div>
                </div>
                <div class="dra-content">
                    <div class="dc-left">
                        <p class="dcl-t">通过香港转飞美国行得通吗？</p>
                        <p class="dcl-b towHidden">国内直飞美国机票价格真的飞上天了！怎么办了？ 莫怕莫怕，因为在香港中转可以优惠莫怕莫怕，因为在香港中转可以优惠莫怕莫怕，因为在香港中转可以优惠莫怕莫怕，因为在香港中转可以优惠</p>
                    </div>
                    <div class="dc-right"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 草稿箱
import commonTitle from '@/components/common/commonTitle.vue'
export default {
    name:'Drafts',
    components:{commonTitle},
    data(){
        return{
            titleOptions:{
                name:'草稿箱',
                remark:true,
            },
        }
    },
    methods:{
        handle(data,type){
            if(type=='edit'){
                this.$router.push({
                    path:'/EditDrafts',
                    query:{
                        id:1
                    }
                })
            }else{

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
            width: 49%;
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
                    .dcl-t{
                        margin-bottom: 10px ;
                    }
                    .dcl-b{
                      width: 100%; 
                    }
                }
            }
        }
    }
}
</style>