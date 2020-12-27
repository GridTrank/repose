<template>
    <div class="login-wrap bodyCon">
        
        <div class="login-reg">
            <img src="../assets/images/reg.png" alt="" srcset="">
            <div class="input">
                <div class="login-m">
                    <p class="l-t" @click="loginMethod('unserName')" :class="showInput=='unserName'?'use':''">
                        {{loginResgister=='login'?'用户名登录':'用户名注册'}}
                    </p>
                    <p class="l-t" @click="loginMethod('phone')" :class="showInput=='phone'?'use':''">
                        {{loginResgister=='login' ?'手机号登录':'手机号注册'}}
                    </p>

                </div>
                <!-- 注册 -->
                <div class="name-world mt40" v-if="loginResgister=='register' && showInput!='phone'">
                    <el-input class="lginput" style="width:300px;" placeholder="输入用户名（6-20位数字和字母组成）" v-model="regUserName"></el-input>
                    <el-input class="lginput mt20" type="password" style="width:300px;" placeholder="请输入密码" v-model="regPassWorld"></el-input>
                    <el-input class="lginput mt20" type="password" style="width:300px;" placeholder="请确认密码" v-model="aginPassWorld"></el-input>
                </div>
                
                <!-- 用户名登录 -->
                <div class="name-world mt40" v-if="showInput=='unserName' && loginResgister=='login'">
                    <el-input class="lginput" style="width:300px;" placeholder="请输入用户名" v-model="loginUserName"></el-input>
                    <el-input class="lginput mt20" style="width:300px;" type="password" placeholder="请输入密码" v-model="loginPassWorld"></el-input>
                </div>
                
                <!-- 手机号登录 -->
                <div class="phone mt40" v-if="showInput=='phone' ">
                    <div class="phone-num">
                        <span class="add">+86</span>
                        <el-input class="lginput"  style="width:240px;"  placeholder="请输入手机号" v-model="phone" maxlength="11"></el-input>
                    </div>
                    <div class="pbone-code mt20">
                        <el-input class="lginput" style="width:180px;" placeholder="输入短信验证码" v-model="phoneCode"></el-input>
                        <el-button style="width:120px;" class="codebtn" type="primary" :disabled="codeState.length<=3" @click="getCode">{{codeState}}</el-button>
                    </div>
                </div>

                <span class="ts" >
                    {{tip}}
                </span>
                <el-button class="lgbtn mt20" v-if="loginResgister=='login'" style="width:300px;"   @click="login(0)">登录</el-button>
                <el-button class="lgbtn mt20" v-else style="width:300px;"   @click="register" >注册</el-button>

                <div class="login-m mt20" v-if="loginResgister=='login'">
                    <p class="l-t"  >找回密码</p>
                    <p class="l-t"  @click="toResgister('register') ">立即注册</p>
                </div>
                <div class="login-m mt20" v-else>
                    <p class="tologin" @click="toResgister('login') ">已有账号，去登录</p>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import {mapActions,mapGetters,mapMutations} from 'vuex'
import {
    userRegister,
    userLogin,
    sendcms,
    phoneReg,
    phoneLogin
}from '@/utils/api.js'
import{validateTel} from "@/utils/index.js"
export default {
    data(){
        return{
            showInput:'unserName',
            loginResgister:'login',
            noshowInput:false,
            regUserName:'',
            regPassWorld:'',
            aginPassWorld:'',
            loginUserName:'',
            loginPassWorld:'',
            phone:'',
            phoneCode:'',
            tip:'',
            time:60,
            codeState:'获取验证码',
            canTime:true
        }
    },
    created(){
        
    },
    watch:{
        $route(to,from){
            let type=to.query.type
            if(type=='register'){
                this.loginResgister='register'
            }else{
                this.loginResgister='login'
            }
        },
        
    },
    methods:{
        ...mapActions(["upDataUserInfo"]),
        //切换登录方式
        loginMethod(type){
            this.showInput=type
            this.tip=""
        },
        //切换注册
        toResgister(type){
            this.loginResgister=type
            this.showInput='unserName'
            this.tip=""
        },
        timeDown(){
            if(this.canTime){
                setTimeout(()=>{
                    if(this.time <= 0){
                        this.time = 60;
                        this.codeState = "重新获取";
                        return;
                    }
                    this.time--;
                    this.codeState = this.time+'s'
                    this.timeDown();
                },1000)
            }else{
                this.codeState = "获取验证码";
            }
			
		},
        //获取验证码
        getCode(){
            if(!validateTel(this.phone)){
                this.tip="手机号格式不正确！"
                return
            }
            sendcms({mobile:this.phone}).then(res=>{
                if(res.data.success==1){
                    this.$message({
                        message:'发送成功',
                        type:'success'
                    })
                    this.timeDown();
                    this.tip=""
                }else{
                    this.tip=res.data.msg
                    return
                }
            })  
        },
        //登录
        login(type){
            if(this.showInput=='unserName'){
                if(!this.loginUserName){
                    this.tip="请输入用户名"
                    return
                }
                if(!this.loginPassWorld){
                    this.tip="请输入密码"
                    return
                }
                let data={
                    username:this.loginUserName,
                    password:this.loginPassWorld
                }
                type=type==0?'登录':'注册'
                userLogin(data).then(res=>{
                    if(res.data.success==1){
                        localStorage.setItem("userInfo",JSON.stringify(res.data.userInfo))
                        localStorage.setItem("utoken",res.data.userInfo.utoken)
                        this.upDataUserInfo(Object.assign({},this.getUserInfo,res.data.userInfo))
                        this.$message({
                            message:type +'成功',
                            type:'success'
                        })
                        this.$router.push({
                            path:"/Home"
                        })
                    }else{
                        this.tip=res.data.msg
                        return
                    }
                })
            }else{
                if(!validateTel(this.phone)){
                    this.tip="手机号格式不正确！"
                    return
                }
                let data={
                    mobile:this.phone,
                    code:this.phoneCode
                }
                phoneLogin(data).then(res=>{
                    if(res.data.success==1){
                        localStorage.setItem("userInfo",JSON.stringify(res.data.userInfo))
                        localStorage.setItem("utoken",res.data.userInfo.utoken)
                        this.upDataUserInfo(Object.assign({},this.getUserInfo,res.data.userInfo))
                        this.$message({
                            message:type +'成功',
                            type:'success'
                        })
                        this.$router.push({
                            path:"/Home"
                        })
                    }else{
                        this.tip=res.data.msg
                        return
                    }
                })
            }
            
        },
        //注册
        register(){
            if(this.showInput=='unserName'){
                let data={
                    username:this.regUserName,
                    password:this.regPassWorld
                }
                let nameRule= /^[a-zA-Z0-9_-]{6,20}$/
                if(!nameRule.test(data.username)){
                    this.tip='请确认用户名是6-20位数字或字母组成'
                    return
                }           
                if(this.regPassWorld!=this.aginPassWorld){
                    this.tip="两次密码输入不一致"
                    return
                }
                userRegister(data).then(res=>{
                    if(res.data.success==1){
                        this.loginUserName=this.regUserName
                        this.loginPassWorld=this.regPassWorld
                        this.login(1)
                    }else{
                        this.tip=res.data.msg
                        return
                    }
                })
            }else{
                if(!validateTel(this.phone)){
                    this.tip="手机号格式不正确！"
                    return
                }
                let data={
                    mobile:this.phone,
                    code:this.phoneCode
                }
                phoneReg(data).then(res=>{
                    if(res.data.success==1){
                        this.$message({
                            message:'注册成功，请登录',
                            type:'success'
                        })
                        this.showInput='phone'
                        this.loginResgister="login"
                        this.phoneCode=''
                        this.canTime=false
                        this.tip=""
                    }else{
                        this.tip=res.data.msg
                        return
                    }
                })
            }
            

        }

    }
}
</script>

<style scoped lang="less">
.login-wrap{
    .h2{
        margin-top: 50px;
        text-align: center;
    }
    .login-reg{
        width: 100%;
        display: flex;
        justify-content: center;
        img{
            width: 425px;
            height: 483px;
        }
        .input{
            margin-left: 100px;
            width: 300px;
            padding: 20px;
            margin-top: 100px;
            .login-m{
                display: flex;
                color: #333;
                font-size: 16px;
                justify-content: space-between;
                margin-bottom: 20px;
                cursor: pointer;
                .tologin{
                    text-align: center;
                    width: 100%;
                }
                .l-t{
                    font-size:16px;
                    color:#666;
                }
                .use{
                    font-size:18px;
                    color:#000;
                    position: relative;
                    &::after{
                        content: "";
                        display: block;
                        width: 30px;
                        height: 2px;
                        border-block: 2px;
                        background: #FCE13D;
                        position: absolute;
                        bottom:-10px;
                        left:35%;
                    }
                }
            }
            .name-world{

            }
            .phone{
                .phone-num{
                    .add{
                        border:1px solid #ddd;
                        display: inline-block;
                        height: 40px;
                        width: 50px;
                        text-align: center;
                        line-height: 40px;
                        border-radius: 8px;
                    }
                    
                }
                .pbone-code{
                    display: flex;    
                    justify-content: space-between;
                }
            }
            .lgbtn{
                background: #FCE13D;
                border-radius: 25px;
                border:none;
                color: #57390F;
                font-size: 16px;
            }
            .ts{
                color:#FA6400;
                font-size: 14px;
                margin-top: 10px;
                display: inline-block;
            }
        }
    }
}
.codebtn{
    background: #FCE13D;
    color: #57390F;
    font-size: 16px;
    border:none;
}
</style>