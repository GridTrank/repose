<template>
    <div class="carousel-wrap">
        <el-carousel  indicator-position="none">
            <el-carousel-item v-for="item in 4" :key="item">
                <!-- <img src="../assets/logo.png" > -->
                <p>1231231312</p>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.carousel-wrap{
    // width: 50%;
    background: #111;
    color:#fff;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 400px;
    margin: 0;
    background: #ddd;
    text-align: center
  }
</style>