<template>
    <div class="page-wrap">
        <commonTitle :titleOptions="titleOptions" />
        <articlesDetail 
            v-if="initDetail.token" 
            ref="detail" 
            :initDetail="initDetail"
            type="init" 
        />
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
            childItem:{},
            initDetail:{},
        }
    },

    created(){
        this.initData()
    },
    methods:{
        initData(){
            http.post("/yifangPC/publish/init",{},(res=>{
                if(res.code==200){
                    res.data.hottags.forEach((item,index,arr)=>{
                        arr[index]={
                            name:item,
                            isSelect:0
                        }
                    })
                    this.initDetail=res.data
                }
            }))
        },
        
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