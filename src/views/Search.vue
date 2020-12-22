<template>
    <div class="search-wrap bodyCon" >   
        <div class="search-btn">
            <el-input placeholder="搜索作品，作者名" style="width:400px;" v-model="name">
            </el-input>
            <el-button style="background:yello" slot="append" icon="el-icon-search" @click="getData">搜索</el-button>
        </div>
        <div class="s-res">共找到 <span>{{count || 0}}</span> 个相关内容</div>
        <div class="res-list" v-if="data && data.length>0">
            <productList :type="'typeOne'" :item="data"></productList>
        </div>
        <div class="no-list" v-else>
            <img src="../assets/images/zw.png" alt="" srcset="">
            <p>暂无数据</p>
        </div>
    </div>
     
</template>
<script>
import configUrl from '@/utils/config.js'
import {getSearchResult} from '@/utils/api.js'
import productList from '@/components/productList.vue'
export default {
    data(){
        return{
            imgUrl:configUrl,
            name:this.$route.query.searchData || '',
            loading:true,
            data:[],
            count:''
        }
    },
    components:{
        productList
    },
    created(){
        this.getData()
    },

    watch:{
        
    },
    methods:{
        getData(){
            let data={
                keyword:this.name
            }
            // if(!data.keyword)return
            getSearchResult(data).then(res=>{
                console.log(res)
                    this.data=res.data.books
                    this.count=res.data.count
            })
        },
        search(){

        }
    }
}
</script>

<style scoped lang="less">
.search-wrap{
    margin-top: 50px;
    .search-btn{
        text-align: center
    }
    .s-res{
        margin-top: 20px;
        font-size: 14px;
        span{
            color: #F5A623;
        }
    }
    .no-list{
        margin-top: 100px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img{
            width: 143px;
            height: 143px;
        }
        p{
            color: #666;
            font-size: 14px;
            margin-top: 20px;
        }
    }
}
</style>