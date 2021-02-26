<!--login.vue-->

<template>
  <div class="login">

    <div class="loginMain">

      <div class="logo">
        <!-- <img src="../../assets/images/logo.png" alt="" srcset=""> -->
      </div>

      <div class="formItem">
        <el-input v-model="account" placeholder="帐户"></el-input>
        <div class="el-input"><input  v-model="password" placeholder="密码" type="password" @keyup.enter="commit" class="el-input__inner"></div>
        <span class="tip">{{ tip }}</span>
        <el-button type="primary" @click="commit">登录</el-button>
      </div>

      <div class="text">
        <!-- © 2018 名创优选科技（广州）有限公司 -->
      </div>
    </div>


  </div>
</template>

<style lang="less" src="./index.less"></style>
<script type="text/javascript" src="./index.js"></script>