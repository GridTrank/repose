<template>
    <div class="recharge-wrap bodyCon">
        <div class="gold">
            <p>金币：120</p>
            <p>VIP：剩余0天</p>
        </div>
        <div class="rec-con">
            <div class="rec-t">
                <p>充值金币/开通VIP会员</p>
                <p class="blem">充值遇到问题？请<span class="kf">联系客服</span></p>
            </div>
            <div class="rec-list">
                <div class="rec-item" v-for="(item,index) in recData" :key="index">
                    <p>{{item.goldNum}}</p>
                    <p>¥{{item.price}}</p>
                    <p v-if="item.average">约¥{{item.average}}/天</p>
                </div>
            </div>
            <p class="rec-s">开通VIP会员，可以免费阅读所有收费章节，不再有额外消费。</p>
        </div>
        <div class="pay mt20">
            <p>支付方式</p>
            <div class="pay-method">
                <div class="pay-btn">支付宝</div>
                <div class="pay-btn">微信支付</div>
            </div>
            <el-button type="primary" >确认充值</el-button>
        </div>
        
    </div>
</template>

<script>
export default {
    data(){
        return{
            recData:[
                {goldNum:'1200金币',price:'20'},
                {goldNum:'4000金币',price:'50'},
                {goldNum:'10000金币',price:'100'},
                {goldNum:'VIP月卡',price:'99',average:'3.3'},
                {goldNum:'VIP季卡',price:'188',average:'2.1'},
                {goldNum:'VIP年卡',price:'365',average:'1'},
            ]
        }
    }
}
</script>

<style scoped lang="less">
.recharge-wrap{
    padding-top: 50px;
    .gold{
        padding-left: 200px;
        display: flex;
        width: 500px;
        justify-content: space-around;
    }
    .rec-con{
        width: 100%;
        padding: 20px;
        .rec-t{
            display: flex;
            justify-content: space-between;
        }
        .rec-list{
            display: flex;
            .rec-item{
                text-align: center;
                width: 150px;
                cursor: pointer;
                padding: 30px 10px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                border-radius: 8px;
                border: 1px solid #ddd;
                margin:30px 20px;
            }
        }
    }
    .pay{
       .pay-method{
           margin-top:30px;
           margin-bottom: 30px;
           display: flex;
           .pay-btn{
                width: 150px;
                height: 50px;
                line-height: 50px;
                text-align: center;
                border: 1px solid #ddd;
                border-radius: 8px;
                margin-right: 20px;
           }
           
       } 
    }
}
</style>