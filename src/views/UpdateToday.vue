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
import {getUpdate} from '@/utils/api.js'
import {getFormat} from '@/utils/index.js'
export default {
  components:{
    productList
  },
  data(){
    return{
      dataList:[],
      pager:{
        startItem:1,
        pageSize:20,
      }
    }
  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
      let data={
        date:getFormat(new Date().getTime()),
        ...this.pager
      }
      getUpdate(data).then(res=>{
        this.dataList=res.data.books
      })
    },
  }
}
</script>
<style scoped lang="less"> 
.update-wrap{
  padding-bottom: 50px;
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