<template>
    <div class="search-wrap bodyCon" >   
        <div class="search-btn">
            <el-input placeholder="搜索作品，作者名" style="width:400px;" v-model="name">
            </el-input>
            <el-button style="background:yello" slot="append" icon="el-icon-search" @click="getData">搜索</el-button>
        </div>
        <div class="s-res">共找到{{count}}个相关内容</div>
        <div class="res-list">
            <productList :type="'typeOne'" :item="data"></productList>
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
    }
}
</style>