<template>
    <div class="detail-wrap bodyCon">
        <div class="detail-top">
            <div class="switch">上一话</div>
            <div class="detail-name">漫画名称-章节名称</div>
            <div class="switch">下一话</div>
        </div>
        <div class="info">

        </div>
        <div class="foot">
            <div class="sm">
                <p>本章节为付费章节</p>
                <p>您可以使用金币购买</p>
                <p>也可以升级为VIP会员免费查看</p>
            </div>
            <p class="sf">本章价格：50金币</p>
            <p class="sf">VIP会员免费</p>
            <p class="sf">余额：10000金币</p>
            <div class="buy">
                <p class="submit">确认购买</p>
                <el-checkbox v-model="autoBuy">以后自动购买，不再提示</el-checkbox>
            </div>
        </div>
        <chapters></chapters>
    </div>
</template>

<script>
import chapters from '@/components/chapters.vue'
import {getChapDetail} from '@/utils/api.js'
export default {
    components:{
        chapters
    },
    data(){
        return{
            autoBuy:''
        }
    },
    created(){
        this.getDetail()
    },
    methods:{
        getDetail(){

            getChapDetail({id:this.$route.query.id}).then(res=>{
                console.log(res)
            })
        }
    }
}
</script>

<style scoped lang="less">
.detail-wrap{
    .detail-top{
        width: 100%;
        position: absolute;
        height: 80px;
        background: #ddd;
        left:0;
        display: flex;
        align-items: center;
        justify-content: center;
        .switch{
            padding: 20px 30px;
            background: #fff;
            border-radius: 8px;
            cursor: pointer;
        }
        .detail-name{
            margin: 0 100px;
        }
    }
    .info{
        width:500px;
        height: 2000px;
        border:1px solid #ddd;
        margin: 0px auto;
    }
    .foot{
        width: 100%;
        height: 100px;
        background: #ddd;
        display: flex;
        position: absolute;
        left:0;
        padding: 20px;
        justify-content: center;
        align-items: center;
        .sm{
            margin-right: 50px;
        }
        .sf{
            margin: 0 50px;
        }
        .buy{
            margin-left: 50px;
            .submit{
                text-align: center;
                padding: 20px 30px;
                background: #fff;
                border-radius: 8px;
            }
        }
    }
}
</style>