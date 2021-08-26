<template>
    <div class="page-wrap">
        <el-dialog 
        :title="diaTitle" 
        width="60%"
        @close="$store.commit('updateShowQuote',false)"
        :visible.sync="showQuote">
            <div v-if="!isSelectArticle">
                <p class="dia-tit">发布文章时，可以在文中引用你或他人发布的文章。发布后，浏览者点击文中的相关链接，即可查看被引用的文章。</p>
                <div class="dia-wrap">
                    <div class="dia-left">
                        <div class="left-list">
                            <div class="left-item" 
                            :class="selectLeft == index && 'select-left'"
                            @click="selectItem(item,index)"
                            v-for="(item,index) in list" :key="index">
                                <img class="item-img" :src="item.image">
                                <p class="item-tit">{{item.name}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="dia-right">
                        <div class="search">
                            <el-input placeholder="搜索文章" v-model="keyword"  @keyup.enter.native="diaSearch">
                                <el-button slot="append" icon="el-icon-search"  @click="diaSearch"></el-button>
                            </el-input>
                        </div>
                        <div class="lables" v-if="showType=='label'">
                            <span class="l-i" :class="type=='lately' && 'article-type' " @click="type='lately'">最近引用</span>
                            <span class="l-i" :class="type=='mine' && 'article-type'"  @click="type='mine'">我发布的</span>
                        </div>
                        <div class="res-wrap" v-else-if="showType=='search'">
                            <div>共找到{{total}}条结果：</div>
                            <div class="fly" @click="checkFly" v-if="shwoFlyContent">
                                <img v-if="showFly" src="@/assets/images/close.png">
                                <img v-else src="@/assets/images/open.png">
                                <span class="fly-tip">{{showFly?'屏蔽找飞友':'显示找飞友'}}</span>
                            </div>
                        </div>
                        <div class="dia-list" v-if="quoteList.length>0 || publishList.length>0 ">
                            <div class="dia-item" v-for="(item,index) in (type=='lately'?quoteList:publishList)" :key="index">
                                <articlesList :item="item" @selectArticle='selectArticle' />
                            </div>
                            <div v-if="showMore" class="more" @click="searchMore">{{!noMore?'点击加载更多~':'暂无更多~'}}</div>
                        </div>
                        <div v-if="(type=='lately' && quoteList.length<=0) || (type=='mine' && publishList.length<=0)" class="no-data">
                            暂无数据
                        </div>
                    </div>
                </div>

            </div>
            <div v-else class="child-item">
                <p class="reset"  @click="reset"> <i class="el-icon-back"></i> 重新选择</p>
                <articlesList :item="childItem" @selectArticle='selectArticle' :isSelect="true" />
                <div class="set-title">
                    <p class="s-p">将在文中插入引用对象，请为其设置标题</p>
                    <el-input v-model="setTitle" :maxlength="25">
                        <template slot="append">{{25-setTitle.length}}</template>
                    </el-input>
                    <div class="sub" @click="submitTitle">确定</div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import commonTitle from '@/components/common/commonTitle.vue'
import articlesDetail from '@/components/common/articlesDetail.vue'
import articlesList from '@/components/common/articlesList.vue'
import http from '@/utils/httpUtil'
export default {
    name:'PublishArticles',
    components:{articlesDetail,commonTitle,articlesList},
    data(){
        return{
            selectLeft:0,
            type:'lately',
            diaTitle:'引用',
            isSelectArticle:false,
            childItem:{},
            setTitle:'',
            list:[],
            publishList:[],
            quoteList:[],
            appid:'',
            keyword:'',
            showType:'label',
            total:0,
            shwoFlyContent:true,
            showFly:true,
            page:1,
            noMore:false,
            showMore:false
        }
    },
    computed:{
        showQuote:{
            get(){
                return this.$store.state.common.showQuote
            },
            set(val){
                return val
            }
            
        },

    },
    watch:{
       keyword:function(val){
           if(!val){

           }
       } 
    },
    mounted(){
        this.getQuoteList()
    },
    methods:{
        // 初始化
        getQuoteList(){
            http.post('/yifangPC/quote',{},(res=>{
                if(res.code==200){
                    this.list=res.data.miniprogramList
                    this.publishList=res.data.miniprogramList[0].publishList
                    this.quoteList=res.data.miniprogramList[0].quoteList
                    this.appid=res.data.miniprogramList[0].appid
                }
            }))
        },
        // 选择小程序
        selectItem(item,index){
            this.appid=item.appid
            this.selectLeft=index
            this.publishList=item.publishList
            this.quoteList=item.quoteList
            this.showType='label'
            this.shwoFlyContent=index==0?true:false
            this.keyword=''
            this.page=1
        },
        // 搜索
        diaSearch(type){
            if(type!='more'){
                this.quoteList=[]
                this.page=1
            }
            let data={
                keyword:this.keyword,
                appid:this.appid,
                page:this.page,
                limit:10,
                blockflyingfriend:this.showFly?'':1
            }
            http.post('/yifangPC/quote/search',data,(res=>{
                if(res.code==200){
                    this.type='lately'
                    this.quoteList=this.quoteList.concat(res.data.data) 
                    this.total=res.data.count
                    this.showType='search'
                    if(this.total<=0){
                        this.showMore=false
                    }else{
                        this.showMore=true
                    }
                    if(res.data.data.length<=0){
                        this.noMore=true
                    }else{
                        this.noMore=false
                    }
                }
            }))
        },
        searchMore(){
            if(this.noMore)return
            this.page+=1
            this.diaSearch('more')
        },
        // 选择文章
        selectArticle(val){
            if(val.title || val.subject){
                this.setTitle=val.title.substring(25,3)+'...' ||  val.subject.substring(25,3)+"..."
            }
            this.childItem=val
            if(val){
                this.isSelectArticle=true
                this.diaTitle=''
            }
        },
        // 提交标题
        submitTitle(){
            let data={
                title:this.setTitle,
                token:this.childItem.token
            }
            http.post('/yifangPC/quote/submit',data,(res=>{
                res.data.token=this.childItem.token
                if(res.code==200){
                    this.$emit('getSetTitle',this.setTitle,{...res.data})
                    this.$message({
                        message:'引用成功',
                        type:'success'
                    })
                    this.setTitle=''
                    this.isSelectArticle=false
                    this.$store.commit('updateShowQuote',false)
                }
            }))
        },
        // 屏蔽找飞友
        checkFly(){
            this.showFly=!this.showFly
            let data={
                keyword:this.keyword,
                appid:this.appid,
                blockflyingfriend:this.showFly?'':1
            }
            http.post('/yifangPC/quote/search',data,(res=>{
                console.log(res)
                if(res.code==200){
                    this.type='lately'
                    this.quoteList=res.data.data
                    this.total=res.data.count
                    this.showType='search'
                }
            }))
        },
        reset(){
            this.setTitle=''
            this.isSelectArticle=false
            this.diaTitle='引用'
        }
        
    }
}
</script>

<style scoped lang="less">
.page-wrap{
   /deep/.el-dialog{
       background-color: #f8f8f8;
       border-radius: 12px;
       .el-dialog__body{
           padding: 0;
       }
   }
   .dia-tit{
       padding: 20px;
   }
   .dia-wrap{
        display: flex;
        border-top: 1px solid #ccc;
        margin-top: 20px;
        min-height: 500px;
        max-height: 700px;
       .dia-left{
           width: 20%;
           border-right: 1px solid #ccc;
           overflow-y: auto;
           .left-list{
               .left-item{
                   display: flex;
                   align-items: center;
                   padding: 20px 30px;
                   cursor: pointer;
                   .item-img{
                       width: 40px;
                       margin-right: 20px;
                   }
               }
               .select-left{
                   background: #000;
                   color: #fff;
               }
           }
       }
       .dia-right{
           padding: 30px;
           width: 70%;
            /deep/.el-input__inner{
                background-color: #fff;
                border-radius: 20px;
            }
            /deep/.el-input-group__append{
                background: transparent;
                border: none;
                position: absolute;
                right: 10px;
                bottom: 10px;
                font-size:18px;
                color: #000;
            }
            .lables{
                span{
                    display: inline-block;
                    padding: 20px 0;
                    color: #999;
                    font-size: 16px;
                    margin-right: 30px;
                    position: relative;
                    cursor: pointer;
                    &:first-child{
                        &::after{
                            content: '';
                            display: block;
                            position: absolute;
                            right: -15px;
                            width: 1px;
                            height: 25px;
                            top: 20px;
                            background: #999;
                        }
                    }
                }
                .article-type{
                    color: #333;
                    font-weight: 600;
                }
                
            }
            .res-wrap{
                display: flex;
                justify-content: space-between;
                padding: 20px 10px;
                .fly{
                    cursor: pointer;
                    color: #000;
                    display: flex;
                    align-items: center;
                    img{
                        width:18px;
                        margin-right: 7px;
                    }
                }
            }
            .dia-list{
                overflow-y: auto;
                max-height: 500px;
                .dia-item{
                    background: #fff;
                    
                    margin-bottom: 10px;
                    border-radius: 12px;
                    box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.101960784313725);
                }
                .more{
                    padding: 10px;
                    text-align: center;
                    cursor: pointer;
                }
            }
            .no-data{
                padding: 100px;
                text-align: center;
                background: #fff;
                border-radius: 12px;
                font-size: 20px;
                color: #999;
            }
       }
   }
   .child-item{
       padding:30px 60px;
       .reset{
           cursor: pointer;
           color: #333;
           margin: 20px ;
           text-align: center;
           font-size: 20px;
           font-weight: 600;

       }
       .set-title{
           background: #fff;
           border-radius: 12px;
           padding: 40px 25%;
           margin-top: 20px;
           display: flex;
           flex-direction: column;
           align-items: center;
           .s-p{
               margin-bottom: 40px;
               font-size: 16px;
               color: #333;
           }
           .sub{
               margin-top: 50px;
               width: 200px;
               height: 50px;
               background: #000;
               color: #fff;
               font-size: 20px;
               font-weight: 600;
               border-radius: 24px;
               text-align: center;
               line-height: 50px;
               cursor: pointer;
           }
       }
   }
}
</style>