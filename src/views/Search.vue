<template>
    <div class="search-wrap" 
     v-loading.fullscreen.lock="loading"
     element-loading-text="加载中"
     element-loading-spinner="el-icon-loading"
     element-loading-background="rgba(0, 0, 0, 0.8)"
    >

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
            loading:false
        }
    },
    components:{
    },
    created(){
        // this.getData()
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
                this.loading=false
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