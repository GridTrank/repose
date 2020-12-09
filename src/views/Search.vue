<template>
    <div class="search-wrap">
        <!-- <div class="input">
            <el-input placeholder="搜索作品、作者名" v-model="name"></el-input>
            <el-button @click="getData">搜索</el-button>
        </div> -->
    </div>
</template>

<script>
import configUrl from '@/utils/config.js'
import {getSearchResult} from '@/utils/api.js'
export default {
    data(){
        return{
            imgUrl:configUrl,
            name:this.$route.query.searchData || '',
        }
    },
    created(){
        this.getData()
    },
    watch:{
        '$route':function(to,from){
            if(to.query.searchData){
                this.getData()
            }
        }
    },
    methods:{
        getData(){
            let data={
                bookname:this.name
            }
            getSearchResult(data).then(res=>{
                // console.log(res)
            })
        },
        search(){

        }
    }
}
</script>

<style>

</style>