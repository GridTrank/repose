<template>
    <div class="search-wrap bodyCon" 
     v-loading.fullscreen.lock="loading"
     element-loading-text="加载中"
     element-loading-spinner="el-icon-loading"
     element-loading-background="rgba(0, 0, 0, 0.8)"
    >   
        <div class="search-btn">
            <el-input placeholder="搜索作品，作者名" style="width:400px;" v-model="name">
            </el-input>
            <el-button style="background:yello" slot="append" icon="el-icon-search" @click="getData">搜索</el-button>
        </div>
        <div class="s-res">共找到6个相关内容</div>
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
            data:[]
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
                bookname:this.name
            }
            if(!data.bookname)return
            this.loading=true
            getSearchResult(data).then(res=>{
                this.loading=false
                this.data=res.data.data.searchbook.splice(0,10)
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