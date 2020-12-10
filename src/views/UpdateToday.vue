<template>
    <div class="update-wrap bodyCon">
        <div class="update-btn">
            <p>今日更新</p>
        </div>
        <div class="lists">
            <productList :item="dataList" :type="'typeOne'"></productList>
        </div>
    </div>
</template>

<script>
import productList from '@/components/productList.vue'
import {getIndex} from '@/utils/api.js'
export default {
  components:{
    productList
  },
  data(){
    return{
      dataList:[]
    }
  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
      getIndex({}).then(res=>{
        this.dataList=res.data.data.hot_books
      })
    },
  }
}
</script>
<style scoped lang="less"> 
.update-wrap{
    .update-btn{
        margin-top: 50px;
        p{
            padding: 10px 0px;
            width: 150px;
            text-align: center;
            border: 1px solid #ddd;
            border-radius: 8px;
            cursor: pointer;
        }
    }
    .lists{
        margin-top:30px;
    }
}
</style>