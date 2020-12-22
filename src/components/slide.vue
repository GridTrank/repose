<template>
     <div class="pc-banner">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                
                <div class="swiper-slide"><a href="#"><img src="../assets/images/banner1.png" ></a></div>
                <div class="swiper-slide"><a href="#"><img src="../assets/images/banner2.png" ></a></div>
                <div class="swiper-slide"><a href="#"><img src="../assets/images/banner3.png" ></a></div>
            </div>
        </div>
        <!-- <div class="swiper-pagination"></div> -->
        <div class="button">
            <div class="swiper-button-prev">
                <img src="../assets/images/left1.png" alt="" srcset="">
            </div>
            <div class="swiper-button-next">
                <img src="../assets/images/right1.png" alt="" srcset="">
            </div>
        </div>
    </div>
</template>
<script src="../utils/swiper.min.js"></script>
<script>
import Swiper from "swiper";
import configUrl from '@/utils/config.js'

export default {
    data(){
        return{
            imgUrl:configUrl,
            name:this.$route.query.searchData || '',
            loading:false
        }
    },
    created(){
      
    },
    mounted() {
    var mySwiper = new Swiper(".swiper-container", {
            autoplay:'',
            speed:1000,
            autoplayDisableOnInteraction : false,
            loop:true,
            centeredSlides : true,
            slidesPerView:2,
            pagination : '.swiper-pagination',
            paginationClickable:true,
            prevButton:'.swiper-button-prev',
            nextButton:'.swiper-button-next',
            onInit:function(swiper){
                swiper.slides[2].className="swiper-slide swiper-slide-active";//第一次打开不要动画
                },
            breakpoints: { 
                668: {
                    slidesPerView: 1,
                 }
            }
        });
    },
    watch:{
        
    },
    methods:{
        
    }
}
</script>

<style lang="less" scoped>
.pc-banner {
	background: #33323E;
	width: 100%;
	float: left;
}
.swiper-container {
	width: 100%;
	margin: 35px 0;
}
.swiper-slide {
	-webkit-transition: transform 1.0s;
	-moz-transition: transform 1.0s;
	-ms-transition: transform 1.0s;
	-o-transition: transform 1.0s;
	-webkit-transform: scale(0.7);
	transform: scale(0.9);
}

.swiper-slide-active,.swiper-slide-duplicate-active {
	-webkit-transform: scale(1);
	transform: scale(1);
}
.none-effect {
	-webkit-transition: none;
	-moz-transition: none;
	-ms-transition: none;
	-o-transition: none;
}
.swiper-slide a {
	background: #fff;
	padding:10px;
	display: block;
	border-radius: 14px;
}

.swiper-slide-active a:after {
	background: none;
}
.swiper-slide img {
	width: 100%;
	border-radius: 14px;
	display: block;
}
.swiper-pagination {
	position: relative;
	margin-bottom: 30px;
}

.swiper-pagination-bullet {
	background: #FCE13D;
	margin-left: 4px;
	margin-right: 4px;
	width: 17px;
	height: 17px;
	opacity: 1;
	margin-bottom: 4px;
}

.swiper-pagination-bullet-active {
	width: 13px;
	height: 13px;
	background: #FFF;
	border: 6px solid #FCE13D;
	margin-bottom: 0;
}


.button {
	width: 1000px;
	margin: 0 auto;
	bottom: 230px;
	position: relative;
}

.button div:hover {
    background-color: #333236;
    opacity: .4;
}
.swiper-button-prev {
    border-radius: 50%;
    background: none;
    background-color: #333236;
    width: 66px;
    height: 66px;
    opacity: .4;
    img{
        width: 100%;
        height: 100%;
    }
}
.swiper-button-next {
    border-radius: 50%;
    background: none;
    background-color: #333236;
    width: 66px;
    height: 66px;
    opacity: .4;
    img{
        width: 100%;
        height: 100%;
    }
}

</style>