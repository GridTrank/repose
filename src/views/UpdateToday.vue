<template>
    <div class="update-wrap bodyCon">
        <div class="update-btn">
            <p>今日更新</p>
        </div>
        <div class="lists">
            <productList v-if="dataList.length>0" :item="dataList" :type="'typeOne'"></productList>
            <div v-else class="nodata">
                <img src="../assets/images/zw.png" >
                <p>暂无数据</p>
            </div>
            <div class="page">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[12, 30, 60, 120]"
                :page-size="12"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>
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
        startItem:0,
        pageSize:12,
      },
      total:0
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
        this.total=res.data.count
      })
    },
    handleSizeChange(val){
      this.pager.pageSize=val
      this.getData()
    },
    handleCurrentChange(val){
      this.pager.startItem=val-1
      this.getData()
    }
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
        .nodata{
            width: 100%;
            text-align: center;
            padding-top: 100px;
            p{
                color: #999;
                font-size: 14px;
            }
        }
        .page{
          margin-top: 50px ;
          text-align: center;
        }
    }
}
</style>