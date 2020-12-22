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
        {label:'全部',value:'0'},
        {label:'分类1',value:'1'},
        {label:'分类2',value:'2'},
        {label:'分类3',value:'3'},
        {label:'分类4',value:'4'},
      ],
      statusList:[
        {label:'全部',value:'0'},
        {label:'连载中',value:'1'},
        {label:'完结',value:'2'},

      ],
      dataList:[]
    }
  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
      getBookList({}).then(res=>{
        console.log(res.data.tags)
        if(res.data.success==1){
          this.dataList=res.data.tags
        }
      })
    },
    selectTag(data){
      console.log(data)
    },
    selectStatus(data){
      console.log(data)
    }
  }
}
</script>

<style scoped lang="less">
.classify-wrap{
  width: 100%;
  padding-top: 50px;
  min-height: 800px;
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