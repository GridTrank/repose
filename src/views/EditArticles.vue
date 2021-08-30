<template>
    <div class="dedkit-wrap page-wrap">
        <commonTitle :titleOptions="titleOptions"/>
        <articlesDetail @changeValue="changeValue" v-if="initDetail.token" :initDetail="initDetail" ref="detail" type='edit' />
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
            initDetail:{},
            canNext:false,
            originData:{}
        }
    },
    created(){
        let token=this.$route.query.token
        let type=this.$route.query.type
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
                    this.originData=JSON.parse(JSON.stringify(res.data.info))
                }
            }))
        },
        changeValue(){
            this.canNext=true
        }
    },
    // beforeRouteLeave(to,form,next){
    //     if(this.canNext){
    //         next()
    //         return
    //     }
    //     let data=JSON.stringify(this.$refs.detail.formData) 
    //     let leave=data==JSON.stringify(this.originData)
    //     if(!leave){
    //         this.$confirm('当前信息尚未保存，离开页面将会放弃所有数据，是否保存为草稿？','提示',{
    //                 confirmButtonText: '确定',
    //                 cancelButtonText: '取消',
    //                 type: 'warning'
    //             }).then(()=>{
    //                 this.$refs.detail.submit(0,'next')
    //                 next()
    //             }).catch(() => {
    //                 next()
    //             })
    //     }else{
    //         next()
    //     }
    // },
}
</script>

<style>

</style>