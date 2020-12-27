<template>
    <div class="tabs-wrap">
        <div class="tabs-lists">
            <div class="tabs-item" :class="activeIndex==index?'select-tab':''" v-for="(data,index) in item" :key="index" @click="selectTag(data,index)">
                {{data.tag_name}}
            </div>
        </div>
        <div class="tabs-more" v-if="showMore">
            {{moreTitle}}
        </div>
    </div>
</template>

<script>
export default {
    props:{
        item:Array,
        showMore:Boolean,
        moreTitle:String,
        // activeIndex:{
        //     type:Number,
        //     default:0
        // }
    },
    data(){
        return{
            activeIndex:0
        }
    },
    methods:{
        selectTag(data,index){
            this.activeIndex=index
            this.$emit("selectTag",data)
        }
    }
}
</script>

<style scoped lang="less">
.tabs-wrap{
    width: 100%;
    display: flex;
    justify-content: space-between;
    .tabs-lists{
        display: flex;
        .tabs-item{
            cursor: pointer;
            height: 26px;
            text-align: center;
            padding: 0 12px;
            line-height: 26px;
        }
        .select-tab{
            color: #000;
            background: #FCE13D;
            border-radius: 4px;
        }
        
    }
    .tabs-more{
       cursor: pointer; 
    }
}
</style>