<template>
<div class="rank-wrap bodyCon">
    <div class="rank-tit">排行榜</div>
    <div class="rank-list">
        <div class="rank-con">
            <div class="rank-head">新书总榜</div>
            <div class="item">
                <productList :item="dataList" :type="'typeTwo'" :from="'ranklist'"></productList>
            </div>
        </div>
        <div class="rank-con">
            <div class="rank-head">人气总榜</div>
            <div class="item">
                <productList :item="dataList" :type="'typeTwo'" :from="'ranklist'"></productList>
            </div>
        </div>
        <div class="rank-con">
            <div class="rank-head">完结总榜</div>
            <div class="item">
                <productList :item="dataList" :type="'typeTwo'" :from="'ranklist'"></productList>
            </div>
        </div>
    </div>

</div>
</template>

<script>
import productList from '@/components/productList.vue'
import {getIndex} from '@/utils/api.js'
export default {
    components:{
        productList
    },
    data(){
        return{
            dataList:[]
        }
    },
    created(){
        this.getData()
    },
    methods:{
        getData(){
            getIndex({}).then(res=>{
                this.dataList=res.data.data.hot_books
            })
        },

    }
}
</script>

<style scoped lang="less">
.rank-wrap{
    margin-top: 20px;
    .rank-tit{
        width: 100%;
        border:1px solid #ddd;
        text-align: center;
        padding: 50px;
    }
    .rank-list{
        margin-top: 50px;
        display: flex;
        justify-content: space-between;
        .rank-con{
            width: 350px;
        }
    }
}
</style>