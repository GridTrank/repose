<template>
    <div class="foot">
        <div class="left">
            <p>全部信息 油条漫画 版权所有 未经许可</p>
            <p>全部信息 油条漫画 版权所有 未经许可 严禁转载Copyright © 2016-2018  http://www.manhua6.com  All Rights Reserved </p>
        </div>
        <div class="right">
            <router-link class="to" to="/Home">首页</router-link>
            <router-link class="to" to="/Home">联系我们</router-link >
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.foot{
    width: 100%;
    height: 200px;
    background: #333;
    display: flex;
    justify-content: space-around;
    align-items: center;
    // position: fixed;
    // bottom: 0;
    // left:0;
    p{
        color: #fff;
        font-size: 14px
    }
    .right{
        display: flex;
        .to{
            color: #fff;
            font-size: 14px;
            margin-right: 50px;
        }
    }
}
</style>