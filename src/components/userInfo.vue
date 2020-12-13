<template>
  <div class="userinfo-wrap">
      <div class="user-head">
        <img class="head-img" src="../assets/logo.png" >
      </div>
      <div class="user-name mt20">
          <el-input style="width:100px" v-model="username" v-if="isEdit"></el-input>
          <p class="name" v-else>{{username}}</p>
          <router-link to="/UserCenter?type=changeName" class="edit" @click="isEdit=true">编辑</router-link>
      </div>
      <div class="gold-vip mt20">
          <div class="gold">
              <p >金币</p>
              <p>20</p>
              <p class="finger recharge">充值</p>
          </div>
          <div class="gold">
              <p>金币</p>
              <p>20</p>
              <p class="finger recharge">充值</p>
          </div>
      </div>
      <div class="get-gold mt20">
          <div class="get-btn finger">
              <p class="gbt">登录领金币</p>
              <p class="gbb">登录领金币</p>
          </div>
          <div class="get-btn finger">
              <p class="gbt">登录领金币</p>
              <p class="gbb">登录领金币</p>
          </div>
      </div>
      <div class="menus mt20">
          <router-link to="/Record?type=collect" class="menu-item">我的收藏</router-link>
          <router-link to="/Record?type=history" class="menu-item">阅读记录</router-link>
          <router-link to="/UserCenter?type=consumption" class="menu-item">消费记录</router-link>
          <router-link to="/UserCenter?type=recharge" class="menu-item">充值记录</router-link>
          <router-link to="/UserCenter?type=vip" class="menu-item">兑换VIP</router-link>
          <router-link to="/UserCenter?type=password" class="menu-item">修改密码</router-link>
          <div  class="menu-item" @click="loginOut">退出登录</div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            username:'1231321',
            isEdit:false
        }
    },
    methods:{
        //登出
        loginOut(){
            this.$confirm('退出登录？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '退出成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });          
            });
        } 
    }
}
</script>

<style scoped lang="less">
.userinfo-wrap{
    text-align: center;
    padding: 20px;
    background: rgba(1,1,1,.1);
    border: 1px solid #ddd;
    width:200px;
    .user-head{
        width: 120px;
        height: 120px;
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
       .edit{
           cursor: pointer;
           color:#539FFF ;
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
            .recharge{
                width: 100%;
                padding: 2px 5px;
                border-radius: 8px;
            }
        }
    }
    .get-gold{
        .get-btn{
            margin-bottom: 20px;
            display: flex;
            height: 60px;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
        }
    }
    .menus{
       .menu-item{
           text-align: left;
           border-top: 1px solid #ddd;
           border-left: 1px solid #ddd;
           border-right: 1px solid #ddd;
           padding:5px 5px;
           cursor: pointer;
           display: block;
       }
       &:last-child{
           border-bottom: 1px solid #ddd;
       }
    }
}

</style>