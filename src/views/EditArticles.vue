<template>
    <div class="dedkit-wrap page-wrap">
        <commonTitle :titleOptions="titleOptions"/>
        <articlesDetail v-if="initDetail.token" :initDetail="initDetail" type='edit' />
    </div>
</template>

<script>
import commonTitle from '@/components/common/commonTitle.vue'
import articlesDetail from '@/components/common/articlesDetail.vue'
import http from '@/utils/httpUtil'
export default {
    components:{commonTitle,articlesDetail},
    data(){
        return{
            titleOptions:{
                name:'编辑文章',
                back:true,
            },
            initDetail:{}
        }
    },
    created(){

        let token=this.$route.query.token
        let type=this.$route.query.type
        console.log(this.$route.query)
        if(token){
            this.getData(token)
        }
        this.titleOptions.name=type=='draft'?'编辑草稿':type=='article'?'编辑文章':''
    },
    methods:{
        getData(token){
            http.post("/yifangPC/publish/init",{token:token},(res=>{
                if(res.code==200){
                    res.data.hottags.forEach((item,index,arr)=>{
                        arr[index]={
                            name:item,
                            isSelect:0
                        }
                    })
                    this.initDetail=res.data
                }
            }))
        }
    }
}
</script>

<style>

</style>