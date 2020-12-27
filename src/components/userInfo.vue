<template>
  <div class="userinfo-wrap bfg">
      <div class="user-head">
        <img class="head-img" src="../assets/images/tx.png" >
      </div>
      <div class="user-name mt20">
          <p class="name" >{{getUserInfo.username}}</p>
          <router-link to="/UserCenter?type=changeName" class="edit" @click="isEdit=true">编辑昵称</router-link>
      </div>
      <div class="gold-num mt20">
          <div class="g-n">
              <img class="g-n-i" src="../assets/images/tyx.png" alt="">
              <div class="g-n-d">
                  <p>金币</p>
                  <p class="g-n-dd">{{balance}}</p>
              </div>
          </div>
          <div class="g-b">
              充值
          </div>
      </div> 
      <div class="gold-get mt20">
            <div class="gold-btn ">
                <img class="gbi" src="../assets/images/lq.png" alt="">
                <p class="gbt">登录领金币</p>
                <p class="gbb">今日已领取50金币</p>
            </div>
            <router-link to="/Upload" class="gold-btn ">
                <img class="gbi" src="../assets/images/fx.png" alt="">
                <p class="gbt">分享赚金币</p>
                <p class="gbb">今日已获得50金币</p>
            </router-link>  
      </div>
      <div class="vip-buy mt20">
          <img class="v-i" src="../assets/images/sxvip.png" alt="">
          <div class="v-t">
              <p>VIP</p>
              <p class="v-st">剩余{{getUserInfo.vip_expire_time}}天</p>
          </div>
          <div class="v-b">购买</div>
      </div>
      <div class="menus mt20">
            <router-link to="/Record?type=collect" class="menu-item">
                <img src="../assets/images/wdsch.png" alt="">
                <span>我的收藏</span>
            </router-link>
            <router-link to="/Record?type=history" class="menu-item">
                <img src="../assets/images/ydjlh.png" alt="">
                <span>阅读记录</span>
            </router-link>
            <router-link to="/UserCenter?type=consumption" class="menu-item">
                <img src="../assets/images/xfjlh.png" alt="">
                <span>消费记录</span>
            </router-link>
            <router-link to="/UserCenter?type=recharge" class="menu-item">
                <img src="../assets/images/czjlh.png" alt="">
                <span>充值记录</span>
            </router-link>
            <router-link to="/UserCenter?type=vip" class="menu-item">
                <img src="../assets/images/dhviph.png" alt="">
                <span>兑换vip</span>
            </router-link>
            <router-link to="/UserCenter?type=password" class="menu-item">
                <img src="../assets/images/xgmmh.png" alt="">
                <span>修改密码</span>
            </router-link>
            <div  class="menu-item" @click="logout">
                <img src="../assets/images/tcdlh.png" alt="">
                <span>退出登录</span>
            </div>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    data(){
        return{
            username:'1231321',
            isEdit:false,
            balance:localStorage.getItem("balance")
        }
    },
    computed: {
        ...mapGetters(["getUserInfo"])
    },
    methods:{
        ...mapActions(['upDataUserInfo']),

        logout(){
            this.$confirm('确认是否退出登录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '已退出登录!'
                    });
                    localStorage.clear()
                    this.upDataUserInfo('')
                }).catch((err)=>{
                    console.log(err)
                })              
        },
    }
}
</script>

<style scoped lang="less">
.userinfo-wrap{
    text-align: center;
    padding: 50px 20px;
    width:318px;
    .user-head{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: #fff;
        margin: 0 auto;
        .head-img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
    .user-name{
        .name{
            font-size: 18px;
        }
       .edit{
           cursor: pointer;
           color:#57390F;
           font-size: 14px;
       }
    }
    .gold-num{
        display: flex;
        background: #FCE13D;
        border-radius:8px;
        padding:20px;
        justify-content: space-between;
        align-items: center;
        .g-n{
            display: flex;
            align-items: center;
            .g-n-i{
                width: 30px;
                height: 30px;
                margin-right: 10px;
            }
            .g-n-d{
                text-align: center;
                color: #57390F;
                font-size: 12px;
                .g-n-dd{
                    font-size: 18px;
                }
            }
        }
        .g-b{
            width: 67px;
            height: 26px;
            text-align: center;
            line-height: 26px;
            background: #57390F;
            border-radius: 13px;
            color: #FFFFFF;
            font-size: 12px;
            cursor: pointer;
        }
    }
    .gold-get{
        padding: 20px;
        border: 1px solid #DDDFE6;
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        .gold-btn{
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
            .gbi{
                width: 30px;
                height: 30px;
                margin-bottom: 10px;
            }
            .gbt{
                color: #666666;
                font-size: 12px;
            }
            .gbb{
                font-size: 12px;
            }
        }
    }
    .vip-buy{
        padding: 20px;
        border: 1px solid #DDDFE6;
        border-radius: 8px;
        display: flex;
        justify-content: center; 
        align-items: center;
        .v-i{
            width: 30px;
            height: 30px;
        }
        .v-t{
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 0 20px;
            p{
                color: #666666;
                font-size: 12px;  
            }
            .v-st{
               font-size: 18px; 
               color: #000; 
            }
        }
        .v-b{
            width: 67px;
            height: 26px;
            background: #FDE13D;
            border-radius: 13px;
            text-align: center;
            line-height: 26px;
            color: #000;
            font-size: 12px;
            cursor: pointer;
        }
    }
    .gold-vip{
        display: flex;
        justify-content: space-between;
        .gold{
            padding: 10px 15px;
            background: #fff;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            border-radius: 8px;
            border: 1px solid #ddd;
            justify-content: space-around;
            margin-right: 10px;
 
            .recharge{
                padding: 2px 5px;
                border-radius: 8px;
            }
        }
        .get-btn {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            .login-btn{
                border-radius: 8px;
                width: 120px;
                padding: 8px;
                .gbt{
                    font-size: 18px;
                }
                .gbb{
                    font-size: 14px;
                }
            }
        }
    }
   
    .menus{
        .menu-item{
            display: flex;
            margin-left: 20px;
            padding: 10px;
            cursor: pointer;
            img{
                width: 20px;
                height: 20px;
                margin-right: 10px;
            }
            span{
                font-size: 14px;
                border-bottom: 1px solid #ddd;
                display: inline-block;
                width: 100%;
                text-align: left;
                height: 30px;
                
            }
            &:last-child{
                span{
                    border:none;
                }
            }
        }
        
    }
}

</style>