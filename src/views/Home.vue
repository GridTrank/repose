<template>
  <div>
    <!-- <userInfo></userInfo> -->
    <!-- <recharge></recharge> -->
    <!-- <chapters></chapters> -->
    <productList></productList>
  </div>
  
</template>

<script>
import userInfo from '@/components/userInfo.vue'
import recharge from '@/components/recharge.vue'
import chapters from '@/components/chapters.vue'
import productList from '@/components/productList.vue'
export default {
  components:{
    userInfo,
    recharge,
    chapters,
    productList
  }
}
</script>

<style scoped >

</style>