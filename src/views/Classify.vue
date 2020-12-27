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
      <productList :item="dataList" :type="'typeOne'"></productList>
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
        {tag_name:'全部',value:''},
        {tag_name:'连载中',value:0},
        {tag_name:'已完结',value:1},

      ],
      dataList:[],
      tag:'',
      end:'',
      pager:{
        startItem:1,
        pageSize:20,
      }
    }
  },
  created(){
    this.getData()
    this.getBooks()
  },
  methods:{
    getData(){
      getList({}).then(res=>{
        if(res.data.success==1){
          this.tagList=res.data.tags
        }
      })
    },
    getBooks(){
      let data={
        tag:this.tag,
        end:this.end,
        area:'',
        ...this.pager
      }
      getBookList(data).then(res=>{
        console.log(res)
      })
    },
    selectTag(data){
      this.tag=data.id
      this.getBooks()
    },
    selectStatus(data){
      this.end=data.value
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
  }
}

</style>