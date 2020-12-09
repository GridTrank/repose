<template>
    <div class="sildeBox">
        <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide v-for="(item,index) in list" :key="index" >
                <img src="../assets/11.png" >
            </swiper-slide>
			<div class="swiper-button-prev icon-image" slot="button-prev"></div>
    	    <div class="swiper-button-next icon-image" slot="button-next"></div>
            <div class="swiper-pagination"  slot="pagination"></div>

        </swiper>
        
    </div>
</template>

<script>
export default {
    data(){
        return{
            list:[1,1,1,1,1,1,1,1],
            swiperOptions: {
                // autoplay:true,
                // speed:2000,
                prevButton:'.swiper-button-prev',
                nextButton:'.swiper-button-next',
                pagination : '.swiper-pagination',
                paginationClickable :true,
                observer: true, //修改swiper自己或子元素时，自动初始化swiper
                observeParents: true, //修改swiper的父元素时，自动初始化swiper
                coverflowEffect: {
                    rotate: 28, // slide做3d旋转时Y轴的旋转角度。默认50。
                    stretch: 3, // 每个slide之间的拉伸值，越大slide靠得越紧。
                    depth: 100, // slide的位置深度。值越大z轴距离越远，看起来越小。
                    modifier: 1, // depth和rotate和stretch的倍率，相当于depth*modifier、rotate*modifier、stretch*modifier，值越大这三个参数的效果越明显。默认1。
                    slideShadows: false, // 开启slide阴影。默认 true。
                },
            }
        }
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper
        },
        newData: function (index) {
			return function (index) {
				return this.list.slice(index, index + 3)
			}
	    },
    },
    mounted() {
		
	},
    watch:{

    },
    methods:{
       
    }
}
</script>

<style scoped lang="less">
.sildeBox{
    .swiper-container{
        position: relative;
        width: 100%;
        // height: 200px;
        .swiper-slide{
            width: 100%;
            //   line-height: 200px;
            color: #000;
            font-size: 16px;
            text-align: center;
        }
    } 
    
}


</style>