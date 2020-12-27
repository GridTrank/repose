<template>
  <div class="classify-wrap bodyCon">
    <div class="tags">
        <div class="tag-list">
          <p>分类</p>
          <tabs :item="tagList" :showMore="false" @selectTag="selectTag" ></tabs>
        </div>
        <div class="tag-list">
          <p>状态</p>
          <tabs :item="statusList" :showMore="false" @selectTag="selectStatus"></tabs>
        </div>
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
import tabs from '@/components/tabs.vue'
import productList from '@/components/productList.vue'
import {getList,getBookList} from '@/utils/api.js'
export default {
  components:{
    tabs,
    productList,
    
  },
  data(){
    return{
      tagList:[
        {tag_name:'全部',id:'0'},
      ],
      statusList:[
        {tag_name:'全部',value:-1},
        {tag_name:'连载中',value:0},
        {tag_name:'已完结',value:1},
      ],
      dataList:[],
      tag:'全部',
      end:-1,
      pager:{
        startItem:0,
        pageSize:12,
      },
      total:0,
    }
  },
  created(){
    this.tag=this.$route.query.tag

    this.getTags()
    this.getBooks()
  },
  methods:{
    getTags(){
      getList({}).then(res=>{
        if(res.data.success==1){
          let tt={tag_name:'全部',id:'0'}
          res.data.tags.unshift(tt)
          this.tagList=res.data.tags
        }
      })
    },
    getBooks(){
      let data={
        tag:this.tag,
        end:this.end,
        area_id:'-1',
        ...this.pager
      }
      getBookList(data).then(res=>{
        this.dataList=res.data.books
        this.total=res.data.count
      })
    },
    selectTag(data){
      this.tag=data.tag_name
      this.getBooks()
    },
    selectStatus(data){
      this.end=data.value
      this.getBooks()
    },
    handleSizeChange(val){
      this.pager.pageSize=val
      this.getBooks()
    },
    handleCurrentChange(val){
      this.pager.startItem=val-1
      this.getBooks()
    }
  }
}
</script>

<style scoped lang="less">
.classify-wrap{
  width: 100%;
  padding-top: 50px;
  min-height: 800px;
  padding-bottom: 50px;
  .tags{
    .tag-list{
      display: flex;
      margin-top: 20px;
      p{
        width: 50px;
        margin-right: 20px;
      }
    }
  }
  .lists{
    margin-top: 50px;
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