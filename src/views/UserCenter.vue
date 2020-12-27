<template>
    <div class="usercenter-wrap bodyCon">
        <userInfo ref="userInfo"></userInfo>
        <div class="user-info ">
            <div class="con" v-if="type=='changeName'">
                <p class="cont-t">修改昵称</p>
                <div class="change-name">
                    <el-input placeholder="请输入昵称（2-8个字符）" style="width:300px;" v-model="name"></el-input>
                    <div class="commonbtn changebtn" type="primary"  style="width:300px" @click="saveName">保存</div>
                </div>
            </div>
            <div class="con" v-else-if="type=='recharge'">
                <p class="cont-t">充值记录</p>
                <div class="czjl mt20">
                    <el-table :data="czData" border>
                        <el-table-column label="单号" prop="danhao" align="center"></el-table-column>
                        <el-table-column label="金额" prop="je" align="center"></el-table-column>
                        <el-table-column label="订单内容" prop="dd" align="center"></el-table-column>
                        <el-table-column label="下单时间" prop="xd" align="center"></el-table-column>
                        <el-table-column label="状态/操作" prop="zt" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.zt==1">待支付</span>
                                <span v-else-if="scope.row.zt==2">支付超时</span>
                                <span v-else-if="scope.row.zt==3">支付成功</span>
                                <span v-else-if="scope.row.zt==4">支付失败</span>
                                <el-button type="primary" v-if="scope.row.zt==1" @click="toPay">去支付</el-button>
                            </template>>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="con" v-else-if="type=='consumption'">
                <p class="cont-t">消费记录</p>
                <div class="czjl mt20">
                    <el-table :data="xfData" border>
                        <el-table-column label="消费时间" prop="danhao" align="center"></el-table-column>
                        <el-table-column label="消费内容" prop="je" align="center"></el-table-column>
                        <el-table-column label="消费金额" prop="dd" align="center"></el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="con" v-else-if="type=='vip'">
                <p class="cont-t">兑换vip</p>
                <div class="exchange-vip">
                    <el-input placeholder="输入兑换码" style="width:300px;" v-model="vipCode"></el-input>
                    <div class="commonbtn" type="primary"  style="width:300px" @click="exchangeVip">立即兑换</div>
                    <div class="explain">
                        <p>兑换说明</p>
                        <p>1、请在有效期内输入兑换码兑换VIP会员</p>
                        <p>2、兑换成功后，可享受包月VIP特权</p>
                        <p>3、如您已是VIP用户，兑换成功过后，VIP有效期会在原有时间上累加天数</p>
                    </div>
                </div>
            </div>
            <div class="con" v-else-if="type=='password'">
                <p class="cont-t">修改密码</p>
                <div class="change-password">
                    <el-input placeholder="请输入新密码（6-20位数字、字符和字母组成）" style="width:350px;" v-model.number="passWord" type="password"></el-input>
                    <el-input placeholder="请确认新密码）" style="width:350px;" v-model.number="newpassWord" type="password"></el-input>
                    <div class="commonbtn" type="primary"  style="width:350px" @click="submit">确认修改</div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import{
    getSpendings,
    getCharges,
    changeName,
    changePwd
}from '@/utils/api.js'
import { mapActions, mapGetters } from "vuex";
import userInfo from '@/components/userInfo.vue'
export default {
    data(){
        return{
            type:this.$route.query.type,
            name:'',
            vipCode:'',
            passWord:'',
            newpassWord:'',
            czData:[
                {
                    danhao:123,
                    je:123,
                    dd:11,
                    xd:12,
                    zt:1
                },
                {
                    danhao:123,
                    je:123,
                    dd:11,
                    xd:12,
                    zt:2
                },
                {
                    danhao:123,
                    je:123,
                    dd:11,
                    xd:12,
                    zt:3
                },
                {
                    danhao:123,
                    je:123,
                    dd:11,
                    xd:12,
                    zt:4
                },

            ],
            xfData:[]
        }
    },
    components:{
        userInfo,
    },
    created(){
        if(this.type=='consumption'){
            this.getConsumption()
        }else if(this.type=='recharge'){
            this.getRechart()
        }
    },
    methods:{
        ...mapActions(['upDataUserInfo']),
        //修改昵称
        saveName(){
            changeName({
                nickname:this.name,
                utoken:localStorage.getItem("utoken")
            }).then(res=>{
                console.log(res)
                if(res.data.success==1){
                    this.$message({
                        type:'success',
                        message:'昵称修改成功'
                    })
                }
            })

        },
        //修改密码
        submit(){
            if(this.passWord!=this.newpassWord){
                this.$message.error('两次密码输入不一致')
                return
            }
            changePwd({
                passWord: this.passWord,
                utoken:localStorage.getItem("utoken")
            }).then(res=>{
               if(res.data.success==1){
                    this.$message({
                        type:'success',
                        message:'密码修改成功'
                    })
                }else{
                    this.$message.error(res.data.msg)
                }
           }) 
        },
        //消费记录
        getConsumption(){
            getSpendings({utoken:localStorage.getItem("utoken")}).then(res=>{
                this.xfData=res.data.spendings
            })
        },
        getRechart(){
            getCharges({utoken:localStorage.getItem("utoken")}).then(res=>{
                this.czData=res.data.charges
            })
        },
        //去支付
        toPay(){

        },
        //兑换VIP
        exchangeVip(){},
        

    }
}
</script>

<style scoped lang="less">
.usercenter-wrap{
    margin-top: 50px;
    display: flex;
    .user-info{
        margin-left:20px;
        width: 1000px;
        .con{
            .cont-t{
                font-weight: bold;
                font-size: 22px;
            }
            .change-name,.exchange-vip,.change-password{
                display: flex;
                flex-direction: column;
                margin: 100px;
                align-items: center;
                height: 120px;
                justify-content: space-between;
                .changebtn{
                    background: #FCE13D;
                    color: #57390F;
                    border:none;
                }
            }
            .exchange-vip{
                height: 260px;
                .explain{
                    color: #666;
                    font-size: 12px;
                    height: 102px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
            }
            .change-password{
                height: 200px;
            }
            
        }
    }
}
.commonbtn{
    width: 344px;
    height: 40px;
    background: #FCE13D;
    border-radius: 4px;
    text-align: center;
    line-height: 40px;
    color: #57390F;
    font-size: 14px;
    cursor: pointer;
}
</style>