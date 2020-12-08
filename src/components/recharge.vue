<template>
  <div class="recharge-wrap">
      <div class="item">客服</div>
      <div class="item">客服</div>
      <div v-if="show" class="item" @click="toTop">回到顶部</div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            show:false,
        }
    },
    methods:{
        toTop(){
             window.scrollTo(0, 0);
        }
    },
    mounted(){
        this.$nextTick(() => {
            window.onscroll = () => {
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                this.show = scrollTop > 500 ? true : false;
            };
        });
    }
}
</script>

<style scoped lang="less">
.recharge-wrap{
    position: fixed;
    top: 300px;
    right: 10px;
    .item{
        cursor: pointer;
        width: 80px;
        height: 80px;
        text-align: center;
        border: 1px solid #ddd;
        line-height: 80px;
        &:nth-child(1){
            border-bottom:none ;
        }
        &:nth-child(3){
            border-top:none ;
        }
    }
    
}

</style>