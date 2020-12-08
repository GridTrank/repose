<template>
    <div class="tabs-wrap">
        <div class="tabs-lists">
            <div class="tabs-item" v-for="(item,index) in 6" :key="index">
                {{'分类标签'}}
            </div>
        </div>
        <div class="tabs-more">
            {{'全部分类'}}
        </div>
    </div>
</template>

<script>
export default {

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
            margin-right: 20px;
        }
        
    }
    .tabs-more{
       cursor: pointer; 
    }
}
</style>