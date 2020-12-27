<template>
    <div class="detail-wrap bodyCon">
        <div class="detail">
            <div class="chapters-wrap" :class="showList?'show-list':'no-list'">
                <p class="chapters-name">{{detail.book.book_name}}</p>
                <div class="chap-list" >
                    <p  class="chap-item"  @click="toDetail(item.id)" v-for="(item,index) in dataList" :key="index">{{item.chapter_name}}</p>
                </div>
            </div>
            <div class="con">
                <div class="cont-tit">
                    <img class="con-sig" src="../assets/images/sign.png" alt="">
                    <p class="con-name">作品：{{detail.chapter_name}}</p>
                </div>
                <div class="switch">
                    <span class="prev" @click="changeLog(1)">上一话</span>
                    <span class="br">|</span>
                    <span class="next"  @click="changeLog(2)"> 下一话</span>
                </div>
                <div  class="con-imgs">
                    <img :src="img.img_url" v-for="(img,ii) in detail.photos" :key="ii">
                </div>
                <div v-if="noMoneyDetail.money" class="con-imgs">
                    <img :src="noMoneyDetail.pic.img_url" alt="" srcset="">
                </div>
                <div class="switch">
                    <span class="prev" @click="changeLog(1)">上一话</span>
                    <span class="br">|</span>
                    <span class="next"  @click="changeLog(2)"> 下一话</span>
                </div>
            </div>
            
        </div>
        <div class="nomoney" v-if="noMoneyDetail.money || getUserInfo.vip_expire_time>0">
            <div class="money">
                <p>本章价格：<span>{{Number(noMoneyDetail.money)*10 }}</span> 金币 <span class="mf">VIP会员免费</span> </p>
                <p>金额：<span>{{balance}}</span>金币</p>
                <div class="buy-gold">
                    <p v-if="balance>0" class="sure" @click="buy">确认购买</p>
                    <p v-else class="dh">余额不足，兑换金币</p>
                    <el-checkbox v-model="autoBuy">以后自动购买，不再提示</el-checkbox>
                </div>
            </div>
            <div class="explain">
                <i class="el-icon-warning-outline"></i>
                <span >本章节为付费章节</span>
                <router-link to="/Recharge" class="ex">您可以使用金币购买，也可以升级为VIP会员免费查看</router-link>
            </div>
        </div>
        <div class="close" @click="closeChap">
            <img src="../assets/images/show-close.png" alt="">
            <span>章节</span>
        </div>
    </div>
</template>

<script>
import chapters from '@/components/chapters.vue'
import {getChapDetail,buyChapter} from '@/utils/api.js'
import { mapActions, mapGetters } from "vuex";
export default {
    components:{
        chapters
    },
    
    computed: {
        ...mapGetters(["getUserInfo"])
    },
    data(){
        return{
            autoBuy:false,
            showList:true,
            dataList:[],
            detail:{
                book:{

                }
            },
            orderId:'',
            noMoneyDetail:{},
            balance:localStorage.getItem("balance")
        }
    },
    mounted(){
        this.getDetail()
    },
    methods:{
        changeLog(val){
            let order=''
            if(val==1){
                order=(Number(this.detail.chapter_order)-1).toFixed(2)
            }else{
                 order=(Number(this.detail.chapter_order)+1).toFixed(2)
            }
            this.dataList.forEach(item=>{
                if(item.chapter_order==order){
                    this.bid=item.id
                    this.$router.push({
                        path:'/Detail',
                        query:{
                            id:item.id
                        }
                    })
                }else{

                    return
                }
            })
            this.getDetail()
        },
        toDetail(id){
            this.$router.push({
                path:'/Detail',
                query:{
                    id:id
                }
            })
            this.getDetail()
        },
        getDetail(){
            getChapDetail({id:this.$route.query.id}).then(res=>{
                if(res.data.success==1){
                    this.dataList=res.data.chapters
                    this.detail=res.data.chapter
                    this.orderId=Number(res.data.chapter.chapter_order).toFixed(0) 
                }else{
                    this.noMoneyDetail=res.data
                }
            })
        },
        buy(){
            let balance=this.balance
            let price=Number(this.noMoneyDetail.money)*10
            let money=balance-price
            localStorage.setItem("balance",money)
            this.balance=localStorage.getItem("balance")
            this.getDetail()
            buyChapter({
                chapter_id:this.noMoneyDetail.pic.chapter_id,
                utoken:localStorage.getItem("utoken")
            }).then(res=>{
                if(res.data.success==1){

                }else{
                    this.$message.error(res.data.msg)
                }
            })

        },
        closeChap(){
           this.showList=!this.showList 
        }
    }
}
</script>

<style scoped lang="less">
.detail-wrap{
    position: relative;
    padding-bottom: 50px;
    .detail{ 
       width: 1100px;
       height: auto;
       border: 1px solid #E2E2E2;
       border-radius: 4px; 
       margin: 30px auto;
       position: relative;
       overflow: hidden;
        .chapters-wrap{
            width: 230px;
            height: 612px;
            position: absolute;
            overflow: hidden;
            border: 1px solid #E5E5E5;
            border-top: none;
            border-left: none;
            background: #fff;
            .chapters-name{
                color: #333333;
                font-size: 16px;
                padding-top: 20px;
                padding-left: 20px; 
                font-weight: bold;
            }
            .chap-list{
                height: 90%;
                padding-bottom: 10px;
                overflow-y: scroll;
                // scrollbar-width: none; 
                // -ms-overflow-style: none;
                padding: 10px;
                .chap-item{
                    cursor: pointer;
                    margin-top: 10px;
                    background: #fff;
                    padding: 10px; 
                    color: #666;
                    font-size: 14px;
                    border-radius: 8px;
                }
                
            }
            
        }
        .show-list{
            transform: translateX(-240px);
            transition-duration: 500ms;
        }
        .no-list{
            transform: translateX(0px);
            transition-duration: 500ms; 
        }
        .con{
            padding: 20px 0;
            .cont-tit{
                display: flex;
                margin-left: 20px;
                align-items: center;
                .con-sig{
                    width: 5px;
                    height: 16px;
                }
                .con-name{
                    margin-left: 20px;
                    color: #666666;
                    font-size: 16px;
                }
            }
            .switch{
                width: 100%;
                text-align: center;
                span{
                    cursor: pointer;
                    font-size: 14px;
                }
                .br{
                    margin-left: 20px;
                    margin-right: 20px;
                    color: #666;
                }
                .prev{
                    color: #999;
                }
                .next{
                    color: #666;
                }
            }
            .con-imgs{
                width: 650px;
                margin: 40px auto;
                img{
                    width: 100%
                }
            }
            
        }    
    }
    .nomoney{
        width: 100%;
        text-align: center;
        margin-top: 30px;
        .money{
            display: flex;
            justify-content: center;
            p{
                font-size: 16px;
                font-weight: 500;
                position: relative;
                padding: 0 80px;
                span{
                    font-size: 32px;
                    color: #F7B500;
                }
                .mf{
                    position: absolute;
                    display: block;
                    width: 98px;
                    height: 29px;
                    text-align: center;
                    line-height: 29px;
                    font-size: 14px;
                    border-radius: 15px;
                    background: #FA6400;
                    color: #fff;
                    top: -11px;
                    right: -11px;
                }
            }
            .buy-gold{
                width: 325px;
                
                p{
                    width: 200px;
                    height: 50px;
                    background: #F4F4F4;
                    color: #666666;
                    font-size: 16px;
                    border-radius: 25px;
                    text-align: center;
                    line-height: 50px;
                    cursor: pointer;
                }
                .sure{
                    background: #FCE13D;
                    color: #57390F;
                }
            }
        }
        .explain{
            margin-top: 20px;
            span{
                font-size: 12px;
                color: #666;
            }
            .ex{
                font-size: 12px;
                color: #999;        
            }
        }
    }
    .close{
        cursor: pointer;
        width: 40px;
        height: 100px;
        position: absolute;
        left: 8px;
        top:0;
        border-top-left-radius: 14px;
        border-bottom-left-radius: 14px;
        border:1px solid #E2E2E2;
        background: #fff;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        img{
            width: 25px;
        }
        span{
            display: inline-block;
            width: 20px;
        }
    }
    
}

</style>