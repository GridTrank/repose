<template>
  <div class="chapters-wrap">
        <div class="chap-list">
            <p class="chap-item" v-for="(item,index) in dataList" :key="index">{{'菜单'}}</p>
        </div>
        <div class="close" @click="closeChap">
            <img src="../assets/images/show-close.png" alt="">
            <span>章节</span>
        </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            show:true,
            dataList:15
        }
    },
    methods:{
        closeChap(){

        }
    }
}
</script>

<style scoped lang="less">
.chapters-wrap{
    width: 200px;
    height: 450px;
    background: rgba(1, 1, 1, .2);
    padding: 10px;
    // overflow: hidden;
    .chap-tit{
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
    }
    .chap-list{
        height: 90%;
        padding-bottom: 10px;
        overflow-y: scroll;
        scrollbar-width: none; 
        -ms-overflow-style: none;
        .chap-item{
            cursor: pointer;
            margin-top: 10px;
            background: #fff;
            padding: 10px 10px; 
            border-radius: 8px;
        }
        
    }
    .close{
        cursor: pointer;
        width: 40px;
        height: 100px;
        position: absolute;
        left: -42px;
        top:0;
        border-top-left-radius: 14px;
        border-bottom-left-radius: 14px;
        border:1px solid #E2E2E2;
        background: #fff;
    }
}
</style>