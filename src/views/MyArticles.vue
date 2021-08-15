<template>
    <div class="myarticle-wrap">
        <commonTitle :titleOptions="titleOptions" @titleSearch="titleSearch" />
        <div class="myarticle-table">
            <el-table 
            @sort-change="sortChange"
            :data="tableData">
                <el-table-column prop="title" label="标题"></el-table-column>
                <el-table-column prop="nickname" label="发布者"></el-table-column>
                <el-table-column prop="timestamp" label="发布时间" sortable="custom"></el-table-column>
                <el-table-column prop="topicalname" label="主题"></el-table-column>
                <el-table-column prop="commentnum" label="阅读" sortable="custom"></el-table-column>
                <el-table-column prop="likenum" label="点赞" sortable="custom"></el-table-column>
                <el-table-column prop="sharenum" label="分享" sortable="custom"></el-table-column>
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

            <div class="pagination">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
            </div>
            
        </div>
    </div>
</template>

<script>
// 我的文章
import commonTitle from '@/components/common/commonTitle.vue'
import http from '@/utils/httpUtil'
import { Loading  } from 'element-ui';
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
            tableData:[ ],
            searchData:{},
            total:0,
            page:1,
            limit:10,
        }
    },
    created(){
        this.getData()
    },
    methods:{
        getData(){
            let data={
                page:this.page,
                limit:this.limit,
                ...this.searchData
            }
            http.post('/yifangPC/article',data,(res=>{
                if(res.code==200){
                    this.tableData=res.data.data
                    this.total=res.data.count
                }
            }))
        },
        sortChange(column ){
            this.searchData.sort=column.prop
            this.searchData.order=column.order=="descending"?'desc':column.order=="ascending"?'asc':''
            this.getData()
        },
        titleSearch(val){
            this.searchData.keyword=val
            this.getData()
        },
        handle(data,type){
            if(type=='edit'){
                this.$router.push({
                    path:'/EditArticles',
                    query:{
                        token:data.token,
                        type:'article'
                    }
                })
            }else{
                this.$confirm('删除后数据无法恢复，请确认是否执行该操作','提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    http.post("/yifangPC/article/delete",{token:data.token},res=>{
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
        },
        handleSizeChange(val){
            this.limit=val
            this.getData()
        },
        handleCurrentChange(val){
            this.page=val
            this.getData()
        }
    }
}
</script>

<style lang="less" scoped>
.myarticle-wrap{
    /deep/.el-table{
        border-radius: 12px;
        padding: 20px;
        &::before{
            display: none;
        }
    }
    
    .opera{
        cursor: pointer;
    }
    .myarticle-table{
        background-color: #fff;
        padding-bottom: 50px;
        .pagination{
            margin: 20px auto;
            text-align: center;
        }
    }
}
</style>