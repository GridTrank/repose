<template>
    <div class="page-wrap">
        <commonTitle :titleOptions="titleOptions" />
        <articlesDetail ref="detail" />
        <el-dialog 
        :title="diaTitle" 
        width="70%"
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
                            v-for="(item,index) in 5" :key="index">
                                <img class="item-img" src="@/assets/images/icon_default.png">
                                <p class="item-tit">寄托一方</p>
                            </div>
                        </div>
                    </div>
                    <div class="dia-right">
                        <div class="search">
                            <el-input placeholder="搜索文章">
                                <el-button slot="append" icon="el-icon-search" @click="diaSearch"></el-button>
                            </el-input>
                        </div>
                        <div class="lables">
                            <span class="l-i" :class="articleType=='lately' && 'article-type' " @click="articleType='lately'">最近引用</span>
                            <span class="l-i" :class="articleType=='mine' && 'article-type'"  @click="articleType='mine'">我发布的</span>
                        </div>
                        <div class="dia-list">
                            <div class="dia-item" v-for="(item,index) in list" :key="index">
                                <articlesList :item="item" @selectArticle='selectArticle' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="child-item">
                <p class="reset" @click="reset"> <i class="el-icon-back"></i> 重新选择</p>
                <articlesList :item="childItem" @selectArticle='selectArticle' :isSelect="true" />
                <div class="set-title">
                    <p class="s-p">将在文中插入引用对象，请为其设置标题</p>
                    <el-input v-model="setTitle" :maxlength="25">
                        <template slot="append" >{{25-setTitle.length}}</template>
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
export default {
    name:'PublishArticles',
    components:{articlesDetail,commonTitle,articlesList},
    data(){
        return{
            titleOptions:{
                name:'发布文章',
            },
            selectLeft:0,
            articleType:'lately',
            diaTitle:'引用',
            list:[
                {id:1},
                {id:2},
            ],
            isSelectArticle:false,
            childItem:{},
            setTitle:'',
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
    methods:{
        selectItem(item,index){
            this.selectLeft=index
        },
        diaSearch(){
            console.log('搜索文章')
        },
        selectArticle(val){
            console.log('选中文章',val)
            this.childItem=val
            if(val){
                this.isSelectArticle=true
                this.diaTitle=''
            }
        },
        submitTitle(){
            this.$refs.detail.content+=this.setTitle
            
            this.$store.commit('updateShowQuote',false)
        },
        reset(){
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
            .dia-list{
                overflow-y: auto;
                max-height: 500px;
                .dia-item{
                    background: #fff;
                    
                    margin-bottom: 10px;
                    border-radius: 12px;
                    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.101960784313725);
                }
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