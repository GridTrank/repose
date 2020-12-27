<template>
    <div class="record-wrap bodyCon">
        <div class="top">
                <div class="btn">我的书架</div>
                <span :class="queryType=='history'?'show-query':''" @click="switchRecord('history')">阅读记录</span>
                <span :class="queryType=='collect'?'show-query':''" @click="switchRecord('collect')">我的收藏</span>

                <div class="clear" @click="cleaInfo">
                    清空记录
                </div>
            </div>
        <div class="mybook">
            <userInfo></userInfo>
            <div class="lists">
                <productList v-if="dataList && dataList.length>0" :item="dataList" :type="'typeThere'"></productList>
                <div v-else class="nodata">
                    <img src="../assets/images/zw.png" >
                    <p>暂无数据</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import userInfo from '@/components/userInfo.vue'
import productList from '@/components/productList.vue'
import {getHot,getHistory,bookShelf,delFavors} from '@/utils/api.js'
export default {
    components:{
        userInfo,
        productList
    },
    data(){
        return{
            dataList:[],
            queryType:this.$route.query.type
        }
    },
    created(){
        let type=this.$route.query.type
        this.getData(type)
    },
    
    methods:{
        switchRecord(type){
            this.$router.push({
                path:'/Record',
                query:{
                    type:type
                }
            })
            this.getData()
        },
        getData(){
            if(this.queryType=='collect'){
                bookShelf({utoken:localStorage.getItem("utoken")}).then(res=>{
                    this.dataList=res.data.favors
                })
            }else{
                this.dataList=JSON.parse(localStorage.getItem("allBrowse"))
            }
            
        },
        cleaInfo(){
            if(this.dataList==null || this.dataList.length<=0){
                return
            }
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let ids=[]
                this.dataList.forEach(item=>{
                    ids.push(item.book_id)
                })
                if(this.queryType=='collect'){
                    delFavors({
                        ids:ids.join(','),
                        utoken:localStorage.getItem('utoken')
                    }).then(res=>{
                        if(res.data.success==1){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getData()
                        }else{
                            this.$message.error(res.data.msg)
                        }
                    })
                }else{
                    localStorage.removeItem("allBrowse")
                    this.getData()
                }
                
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        }

    }
}
</script>

<style scoped lang="less">
.record-wrap{
    margin-top: 40px;
    position: relative;
    .top{
        width: 802px;
        position: relative;
        margin-left: 378px;
        .btn{
            display: inline-block;
            padding:10px 40px;
            border: 1px solid #ddd;
            border-radius: 8px;
            cursor: pointer;
        }
        
        span{
            margin-left: 30px;
            cursor: pointer;
            color: #666666;
            font-size: 14px;
        }
        .show-query{
            color: #000;
            position: relative;
            &::after{
                content: "";
                display: block;
                position: absolute;
                width: 19px;
                height: 2px;
                background: #FCE13D;
                left: 40%;
                bottom: -30%;
            }
        }
        .clear{
            display: flex;
            align-items: center;
            position: absolute;
            top:13px;
            right: 0;
            cursor: pointer;
            img{
                width: 40px;
                height: 40px;
            }
        }
    }
    .mybook{
        display: flex;
        justify-content: space-between;
        
        .lists{
            width: 850px;
            padding: 20px;
            background: #fff;
            margin-left: 42px;
            .nodata{
                width: 100%;
                text-align: center;
                padding-top: 100px;
                p{
                    color: #999;
                    font-size: 14px;
                }
            }
        }
    }
}
</style>