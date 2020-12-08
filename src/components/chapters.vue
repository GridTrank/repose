<template>
  <div class="chapters-wrap">
      <div class="chap-tit">
          <p>章节</p>
          <p>1111</p>
      </div>
      <div class="chap-list">
          <p class="chap-item" v-for="(item,index) in dataList" :key="index">{{'菜单'}}</p>
      </div>
      <div class="close" @click="show=false">收起</div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            show:true,
            dataList:15
        }
    }
}
</script>

<style scoped lang="less">
.chapters-wrap{
    width: 200px;
    height: 450px;
    background: rgba(1, 1, 1, .2);
    position: fixed;
    top: 200px;
    left: 10px;
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
        width: 50px;
        height: 100px;
        position: absolute;
        left: 220px;
        top:185px;
        text-align: center;
        line-height: 100px;
        background: rgba(1, 1, 1, .2);
    }
}
</style>