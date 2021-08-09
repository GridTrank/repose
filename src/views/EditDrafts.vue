<template>
    <div class="dedkit-wrap">
        <commonTitle :titleOptions="titleOptions"/>
        <articlesDetail/>
    </div>
</template>

<script>
import commonTitle from '@/components/common/commonTitle.vue'
import articlesDetail from '@/components/common/articlesDetail.vue'
export default {
    components:{commonTitle,articlesDetail},
    data(){
        return{
            titleOptions:{
                name:'编辑草稿',
                back:true,
            },
        }
    }
}
</script>

<style>

</style>