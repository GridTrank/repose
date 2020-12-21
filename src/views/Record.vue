<template>
    <div class="record-wrap bodyCon">
        <userInfo></userInfo>
        <div class="mybook">
            <div class="top">
                <div class="btn">我的书架</div>
                <span :class="queryType=='history'?'show-query':''" @click="switchRecord('history')">阅读记录</span>
                <span :class="queryType=='collect'?'show-query':''" @click="switchRecord('collect')">我的收藏</span>

                <div class="clear" @click="cleaInfo">
                    <img src="../assets/logo.png" alt="" srcset="">
                    清空记录
                </div>
            </div>
            <div class="lists">
                <productList :item="dataList" :type="'typeThere'"></productList>
            </div>
        </div>
    </div>
</template>

<script>
import userInfo from '@/components/userInfo.vue'
import productList from '@/components/productList.vue'
import {getHot} from '@/utils/api.js'
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
        this.getData()
    },
    methods:{
        switchRecord(type){
            this.$router.push({
                path:'/Record',
                query:{
                    type:type
                }
            })
        },
        getData(){
            getHot({}).then(res=>{
                this.dataList=res.data.data.hot_books
            })
        },
        cleaInfo(){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
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
    margin-top: 50px;
    display: flex;
    .mybook{
        margin-left: 20px;
        width: 1000px;
        .top{
            position: relative;
            .btn{
                display: inline-block;
                padding:10px 40px;
                border: 1px solid #ddd;
                border-radius: 8px;
                cursor: pointer;
            }
            .show-query{
                color: red;
            }
            span{
                margin-left: 30px;
                cursor: pointer;
            }
            .clear{
                display: flex;
                align-items: center;
                position: absolute;
                top:0;
                right: 0;
                cursor: pointer;
                img{
                    width: 40px;
                    height: 40px;
                }
            }
        }
    }
}
</style>