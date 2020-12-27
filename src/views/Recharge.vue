<template>
    <div class="recharge-wrap ">
        <div class="heard">
            <img src="../assets/images/rechard.png" alt="">
            <div class="user bodyCon">
                <img src="../assets/images/tx.png">
                <div class="username">
                    <p class="un">{{getUserInfo.username}}</p>
                    <p class="uu">尊敬的VIP用户</p>
                </div>
                <img class="vipimg" src="../assets/images/yktvip.png" >
            </div>
        </div>
        <div class="con bodyCon"> 
            <div class="gold mt40">
                <div class="cz-gold">
                    <img src="../assets/images/czjb.png">
                    <div class="gb-num">
                        <p class="num1">金币</p>
                        <p class="num2">1200</p>
                    </div>
                    <p class="czbtn">充值</p>
                </div>
                <div class="cz-gold">
                    <img class="vip" src="../assets/images/sxvip.png">
                    <div class="gb-num">
                        <p class="num1">VIP</p>
                        <p class="num2">剩余10天</p>
                    </div>
                    <p class="czbtn">购买</p>
                </div>
            </div>
            <div class="rec-con mt20">
                <div class="rec-t">
                    <p class="fwsix">充值金币/开通VIP会员</p>
                </div>
                <div class="rec-list">
                    <div class="rec-item" :class="slectIndex==index?'slect':''" v-for="(item,index) in recData" :key="index" @click="recharge(item,index)">
                        <p class="g-n">{{item.goldNum}}</p>
                        <p class="g-p">¥{{item.price}}</p>
                        <p class="g-d" v-if="item.average">约¥{{item.average}}/天</p>
                    </div>
                </div>
                <p class="rec-s">开通VIP会员，可以免费阅读所有收费章节，不再有额外消费。</p>
            </div>
            <div class="pay mt20">
                <p class="pay-t fwsix">支付方式</p>
                <div class="pay-method">
                    <div class="pay-btn">
                        <img src="../assets/images/zfb.png" >
                        <p>支付宝</p>
                    </div>
                    <div class="pay-btn">
                        <img src="../assets/images/wx.png" >
                        <p>微信</p>
                    </div>
                </div>
                <div class="submit" >确认充值</div>
            </div>
            <div class="blem">充值遇到问题？请<span class="kf">联系客服</span> <span class="share" @click="share">分享网站领100金币</span></div>
        </div>

        
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
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
            ],
            slectIndex:0
        }
    },
    computed: {
        ...mapGetters(["getUserInfo"])
    },
    methods:{
        recharge(data,index){
            this.slectIndex=index
        },
        share(){
            this.$router.push({
                path:'/Upload'
            })
        }
    }
}
</script>

<style scoped lang="less">
.recharge-wrap{
    padding-bottom: 50px;
    .heard{
        width: 100%;
        height: 177px;
        img{
            width: 100%;
            height: 100%;
        }
        .user{
            display: flex;
            align-items: center;
            margin-top: -65px;
            padding-left: 40px;
            img{
                width: 33px;
                height: 33px;
                border-radius: 50%;
            }
            .username{
                margin-left: 10px;
                margin-right: 10px;
                .un{
                    font-size: 18px;
                }
                .uu{
                    color: #666;
                    font-size: 12px;
                }
            }
            .vipimg{
                width: 48px;
                height: 21px;;
            }
        }
    }
    .gold{
        padding-left: 20px;
        display: flex;
        .cz-gold{
            display: flex;
            align-items: center;
            margin-right:80px;
            img{
                width: 40px;
                height: 40px;
                margin-right: 15px;
            }
            .vip{
                height: 26px;
            }
            .gb-num{
                text-align: center;
                padding: 0 10px;
                .num1{
                    color: #666;
                    font-size: 12px;
                }
            }
            .czbtn{
                margin-left: 10px;
                width: 67px;
                height: 26px;
                background: #FDE13D;
                border-radius: 13px;
                font-size: 12px;
                text-align: center;
                line-height: 26px;
            }
        }
    }
    .rec-con{
        width: 100%;
        padding: 20px;
        .rec-t{
            color: #333;
            font-size: 16px;
            font-weight: 400;
        }
        .rec-list{
            display: flex;
            height: 180px;
            .rec-item{
                text-align: center;
                width: 110px;
                cursor: pointer;
                padding: 30px 10px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                border-radius: 8px;
                // border: 1px solid #ddd;
                margin:30px 20px;
                .g-n{
                    font-size: 12px;
                    color: #666;
                }
                .g-p{
                    font-size: 20px;
                }
                .g-d{
                    color: #999999;
                    font-size: 10px;
                    border-radius: 7.5px;
                    border: 1px solid #E9E9E9;
                    padding: 2px;
                    margin-top: 10px;
                }
            }
            .slect{
                border:2px solid #A960FF;
            }
        }
        .rec-s{
            color: #999;
            font-size: 12px;
        }
    }
    .pay{
        .pay-t{
            font-size: 16px;
            font-weight: 600;
        }
       .pay-method{
           margin-top:30px;
           margin-bottom: 30px;
           display: flex;
           .pay-btn{
                width: 166px;
                height: 42px;
                text-align: center;
                border: 1px solid #DBDBDB;
                border-radius: 21px;
                margin-right: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                img{
                    width: 30px;
                    height: 30px;
                    margin-right: 10px;
                }
           }
           
       } 
       .submit{
           width: 350px;
           height: 44px;
           text-align: center;
           line-height: 44px;
           color: #57390F;
           font-size: 16px;
           background: #FDE23D;
           border-radius: 22px;
       }
    }
    .blem{
        margin-top: 30px;
        font-size: 12px;
        color: #999;
        cursor: pointer;
        .kf{
            color: #F7B500;
        }
        .share{
            color: #999;
            margin-left: 30px;
        }
    }
}
</style>