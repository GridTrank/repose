<template>
    <div class="login-wrap bodyCon">
        <h2 class="h2">
            {{loginResgister=='login'?'用户登录':'用户注册'}}
        </h2>
        <div class="login-reg">
            <img src="../assets/logo.png" alt="" srcset="">
            <div class="input">
                <div class="login-m">
                    <p class="l-t" @click="loginMethod('unserName')" :style="showInput=='unserName'?'color:red':''">
                        {{loginResgister=='login'?'用户名登录':'用户名注册'}}
                    </p>
                    <p class="l-t" @click="loginMethod('phone')" :style="showInput=='phone'?'color:red':''">手机号登录</p>
                </div>
                <!-- 注册 -->
                <div class="name-world" v-if="loginResgister=='register'">
                    <el-input style="width:300px;" placeholder="输入用户名（6-20位数字和字母组成）" v-model="regUserName"></el-input>
                    <el-input class="mt20" type="password" style="width:300px;" placeholder="输入密码（6-20位数字、字符和字母组成）" v-model="regPassWorld"></el-input>
                </div>
                
                <!-- 用户名登录 -->
                <div class="name-world" v-if="showInput=='unserName' && loginResgister=='login'">
                    <el-input style="width:300px;" placeholder="用户名" v-model="loginUserName"></el-input>
                    <el-input class="mt20" style="width:300px;" type="password" placeholder="密码" v-model="loginPassWorld"></el-input>
                </div>
                
                <!-- 手机号登录 -->
                <div class="phone" v-if="showInput=='phone' && loginResgister=='login' ">
                    <div class="phone-num">
                        <span class="add">+86</span>
                        <el-input style="width:240px;"  placeholder="请输入手机号" v-model="phone" maxlength="11"></el-input>
                    </div>
                    <div class="pbone-code mt20">
                        <el-input style="width:180px;" placeholder="输入短信验证码" v-model="phoneCode"></el-input>
                        <el-button type="primary" @click="getCode">获取验证码</el-button>
                    </div>
                </div>

                <span class="ts">账户密码错误</span>
                <el-button v-if="loginResgister=='login'" style="width:300px;" class="mt20"  type="primary" @click="login">登录</el-button>
                <el-button v-else style="width:300px;" class="mt20"  type="primary" @click="register">注册</el-button>
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
export default {
    data(){
        return{
            showInput:'unserName',
            loginResgister:'login',
            regUserName:'',
            regPassWorld:'',
            loginUserName:'',
            loginPassWorld:'',
            phone:'',
            phoneCode:'',
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
        }
    },
    methods:{
        //切换登录方式
        loginMethod(type){
            this.showInput=type
            this.loginResgister='login'
        },
        //切换注册
        toResgister(type){
            this.loginResgister=type
            this.showInput='unserName'
        },
        //获取验证码
        getCode(){},
        //登录
        login(){},
        //注册
        register(){}

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
        img{
            width: 50%;
            height: 100%;
        }
        .input{
            margin-left: 100px;
            width: 300px;
            padding: 20px;
            margin-top: 150px;
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
            .ts{
                color:red;
            }
        }
    }
}
</style>