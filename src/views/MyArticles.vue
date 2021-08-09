<template>
    <div class="myarticle-wrap">
        <commonTitle :titleOptions="titleOptions" />
        <div class="myarticle-table">
            <el-table :data="tableData">
                <el-table-column prop="title" label="标题"></el-table-column>
                <el-table-column prop="fbz" label="发布者"></el-table-column>
                <el-table-column prop="time" label="发布时间"></el-table-column>
                <el-table-column prop="zhuti" label="主题"></el-table-column>
                <el-table-column prop="yuedu" label="阅读"></el-table-column>
                <el-table-column prop="dianzan" label="点赞"></el-table-column>
                <el-table-column prop="share" label="分享"></el-table-column>
                <el-table-column prop="" label="编辑">
                    <template slot-scope="scope">
                        <p class="opera" @click="handle(scope.row,'edit')"> <i class="el-icon-edit"></i> </p>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="删除">
                    <template slot-scope="scope">
                        <p class="opera" @click="handle(scope.row,'del')"> <i class="el-icon-delete"></i> </p>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
// 我的文章
import commonTitle from '@/components/common/commonTitle.vue'
export default {
    name:'MyArticles',
    components:{commonTitle},
    data(){
        return{
            titleOptions:{
                name:'我的文章',
                search:true,
                remark:true,
            },
            tableData:[
                {
                    title:'标题',
                    fbz:'123',
                    time:'123123',
                    zhuti:'123123',
                    yuedu:'123123',
                    dianzan:'123123',
                    share:'123123',
                }
            ],
        }
    },
    methods:{
        handle(data,type){
            if(type=='edit'){
                this.$router.push({
                    path:'/EditArticles',
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
.myarticle-wrap{
    /deep/.el-table{
        border-radius: 12px;
        padding: 20px;
    }
    .opera{
        cursor: pointer;
    }
}
</style>