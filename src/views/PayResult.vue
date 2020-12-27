<template>
    <div class="pay-reuslt">
        <div class="wrap">
            <img class="status-img" src="../assets/images/cg.png" alt="" srcset="">
            <p class="status-txt">支付成功</p>
            <img class="pay-img" src="../assets/images/czcg.png" alt="">
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.pay-reuslt{
    width: 100%;
    height: 100%;
    .wrap{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 400px;
        padding-top: 40px;
        .status-img{
            width: 50px;
            height: 50px;
        }
        .status-txt{
            font-size: 24px;
        }
        .pay-img{
            width: 350px;
        }
    }
    
}
</style>