<template>
    <div class="login-wrap">
        <div class="login-imgs">
            <img src="@/assets/images/logo-bg.png" class="login-bg">
            <div class="code-wrap">
                <img class="title" src="@/assets/images/logo.png" >
                <img class="code-img" :src="this.loginLink" >
                <p class="wx">微信扫码登录</p>
            </div>
        </div>
    </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import http from '@/utils/httpUtil'
export default {
    components: { QRCode },
    data(){
        return{
            loginLink:'',
            token:''
        }
    },
    mounted(){
        if(localStorage.getItem("userInfo")){
            this.$router.push("/PublishArticles"); 
            return
        }
        this.handover()
    },
    methods:{
        handover() {
            http.post('/yifangPC/login',{},(res=>{
                this.loginLink=res.data.qrcodeurl
                this.token=res.data.token
                this.loopLook();
            }))
        },
        loopLook() {
            let data = {
                token: this.token
            };
            http.post("/yifangPC/login/monitor",data,(res=>{
                if(res.extraparam.mode=='wait' && res.code==200){
                    setTimeout(() => {
                        this.loopLook();
                    }, 1000);
                }else if(res.code==200 && res.extraparam.mode=='right'){
                    this.$message({
                        message:'登录成功',
                        type:'success'
                    })
                    localStorage.setItem("authorization",res.data.authorization)
                    this.$store.commit('updateUserInfo',res.data.user)
                    setTimeout(()=>{
                        this.$router.push("/PublishArticles"); 
                    },2000)
                }else{
                    this.$message.error(res.message)
                    localStorage.removeItem("userInfo")
                }
            }))
        },
    },
    
}
</script>

<style scoped lang="less">
.login-wrap{
    padding: 80px;
    .login-imgs{
        background-color: #fff;
        display: flex;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0px 0px 30px #bbb;
        .login-bg{
            width:65%;
        }
        .code-wrap{
            width: 35%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .title{
                width: 150px;
            }
            .code-img{
                width: 200px;   
                margin: 50px 0 20px; 
            }
        }
    }
}
</style>