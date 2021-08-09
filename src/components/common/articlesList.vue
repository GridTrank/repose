<template>
    <div class="list-wrap">
        <div class="top">
            <div class="top-left">
                <img src="@/assets/images/icon_default.png" >
                <span class="tl-s1">多多</span>
                <span class="tl-s2">6天前发布于 <span class="tl-s3">主题名称</span> </span>
            </div>
            <div class="top-right" @click="selectArticle" :class="isSelect && 'sel'">
                <i class="el-icon-circle-check"></i>
            </div>
        </div>
        <div class="bottom">
            <p class="b-p1">注意了，香港转飞一定要提前做好这些准备！</p>
            <p class="b-p2 towHidden">选择香港转飞到留学国的同学速看，帮你避坑！选择香港转飞到留学国的同学速看，帮你避坑！选择香港转飞到留学国的同学速看，帮你避坑！选择香港转飞到留学国的同学速看，帮你避坑！选择香港转飞到留学国的同学速看，帮你避坑！选择香港转飞到留学国的同学速看，帮你避坑！</p>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        item:Object,
        isSelect:Boolean
    },
    methods:{
        selectArticle(){
            this.$emit('selectArticle',this.item)
        }
    }
}
</script>

<style scoped lang="less">
.list-wrap{
    background: #fff;
    border-radius: 12px;
    .top{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        border-bottom: 1px solid #eee;
        .top-left{
            display: flex;
            align-items: center;
            justify-content: space-between;
            img{
                width: 28px;
            }
            .tl-s1{
                font-size: 16px;
                color: #333;
                margin: 0 15px;
            }
            .tl-s2{
                font-size: 16px;
                color: #999;
                .tl-s3{
                    color: #02A7F0;
                    cursor: pointer;
                }
            }
            
        }
        .top-right{
            font-size: 24px;
            cursor: pointer;
        }
        .sel{
            color: #26d79f
        }
    }
    .bottom{
        padding: 20px;
        .b-p1{
            color: #333;
            font-size: 18px;
            margin-bottom: 10px ;
        }
        .b-p2{

        }
    }
}
</style>