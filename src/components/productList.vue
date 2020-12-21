<template>
    <div class="productList-wrap">
        <div v-if="type=='typeOne'" class="p-lists">
            <router-link target="_blank" :to="'/Catalog?id='+data.id" class="type-one" v-for="(data,index) in item" :key="index">
                <div class="imgBox">
                    <img class="p-img" :src="data.cover_url" >
                </div>
                <p class="p-status">{{data.end==0?'连载':'已完结'}}</p>
                <p class="p-name oneHidden">{{data.book_name}}</p>
                <p class="p-class" v-if="data.taglist && data.taglist.length>0">
                    <span class="" v-for="(tag,i) in data.taglist" :key="i">{{tag}}</span>
                </p>
                <p class="p-class" v-else>{{data.tags}}</p>
            </router-link>
        </div>

        <div v-if="type=='typeTwo'" class="p-lists">
            <router-link target="_blank"  :to="'/Catalog?id='+data.id" class="type-two" :class="from=='ranklist'?'rank':''" v-for="(data,index) in item" :key="index">
                <div class="index-one" v-if="index==0">
                    <div class="imgBox" >
                        <img class="p-img" :src="data.cover_url" >
                        <span class="p-num">{{index+1}}</span> 
                    </div>
                    <div class="p-brief" >
                        <p class="p-name ">{{data.book_name}}</p>
                        <p class="p-info twoHidden mt20">{{data.summary}}</p>
                        <div class="p-tags"  >
                            <p >已更 <span class="p-u">{{data.last_chapter_id}}</span></p>
                            <div class="p-count" >
                                <div class="p-p">
                                    <img src="../assets/logo.png" >
                                    <p>123</p>
                                </div>
                                <div class="p-p">
                                    <img src="../assets/logo.png" >
                                    <p>123</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="other-index" v-else >
                    <p class="p-name " > 
                        <span class="p-num" :class="index<3 && 'fcolor'">{{index+1}}</span> 
                        {{data.book_name}}
                    </p>
                    <p class="p-u">更新至 <span class="p-u-c">{{data.last_chapter_id}}</span> </p>
                </div>
            </router-link >
        </div>

        <div v-if="type=='typeThere'" class="p-lists">
            <div class="type-there" v-for="(data,index) in item" :key="index">
                <div class="imgBox">
                    <img class="p-img" :src="imgurl+data.cover_url" >
                </div>
                <p class="p-status">{{data.tags}}</p>
                <p class="p-name oneHidden">{{data.book_name}}</p>
                <p class="p-class" v-if="data.taglist && data.taglist.length>0">
                    <span class="" v-for="(tag,i) in data.taglist" :key="i">{{tag}}</span>
                </p>
                <p class="p-class" v-else>{{data.tags}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import configUrl from '@/utils/config.js'
export default {
    props:{
        type:String,
        item:Array,
        from:String
    },
    data(){
        return{
            data:12,
            imgurl:configUrl
        }
    }
}
</script>

<style scoped lang="less">
.productList-wrap{
    .p-lists{
        display: flex;
        flex-wrap: wrap;
        color: #333;
        .type-one{
            position: relative;
            margin-top:20px;
            cursor: pointer;
            width: 184px;
            margin-right: 15px;
            &:nth-child(6){
                margin-right: 0px;
            }
            .imgBox{
                width: 100%;
                height: 244px;
                border-radius: 8px;
                overflow: hidden;
                .p-img{
                    width: 100%;
                    height: 100%;
                }
            }
            .p-status{
                position: absolute;
                top:8px;
                right: 8px;
                background: #FCE13D;
                padding:5px 10px;
                border-radius: 2px;
                font-size: 12px;
            }
            .p-name{
                margin-top: 16px;
                margin-bottom: 10px;
                width: 100%;
                font-size: 16px;        
            }
            .p-class{
                color:#999;
                font-size: 14px;
            }
            
        }
        
        .type-two{
            cursor: pointer;
            position: relative;
            margin-top:20px;
            width: 100%;
            color: #333;
            .index-one{
                display: flex;
                .imgBox{
                    width: 120px;
                    height: 159px;
                    flex-shrink: 0;
                    position: relative;
                    margin-right: 20px;
                    border-radius: 2px;
                    overflow: hidden;
                    .p-img{
                        width: 100%;
                        height: 100%;
                    }
                    .p-num{
                        width: 31px;
                        height: 25px;
                        text-align: center;
                        line-height: 25px;
                        border-bottom-right-radius: 4px;
                        position: absolute;
                        top:0;
                        left:0;
                        background:#F5A623 ;
                        color: #fff;
                        font-size: 14px;
                    }
                }
                .p-brief{
                    width: 230px;
                    .p-name{
                        color: #fff;
                        font-size: 18px;
                        
                    }
                    .p-info{
                        color: #999999;
                        font-size: 14px;
                    }
                    .p-tags{
                        display: flex;
                        font-size: 12px;
                        margin-top: 44px;
                        p{
                            color: #fff;
                        }
                        .p-u{
                            color: #F56C6C;
                        }
                        .p-count{
                            display: flex;
                            .p-p{
                                display: flex;
                                margin-left: 20px;
                            }
                        }
                        img{
                            width: 14px;
                            height: 17px;
                        }
                    }
                }
                
            }
            
            .other-index{
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                .p-name{
                    color: #fff;
                    .p-num{
                        color: #999;
                        margin-right: 10px;
                    }
                    .fcolor{
                        color:#F5A623;
                    }
                }
                
                .p-u{
                    color: #999;
                    .p-u-c{
                        color: #F56C6C
                    }
                }
            }
            
               
        }
        
        .type-there{
            position: relative;
            margin-top:20px;
            cursor: pointer;
            width: 185px;
            margin-right: 15px;
            &:nth-child(5){
                margin-right: 0px;
            }
            .imgBox{
                width: 100%;
                height: 244px;
                border-radius: 8px;
                overflow: hidden;
                .p-img{
                    width: 100%;
                    height: 100%;
                }
            }
            .p-status{
                position: absolute;
                top:0;
                right: 0;
                background: rgba(1, 1, 1, .3);
                padding:2px 5px;
                border-radius: 8px;
            }
            .p-name{
                margin-top: 5px;
                width: 100%;
                color: #6F93BD;
                font-size: 14px;
                
            }
            .p-class{
                color:#999;
                font-size: 12px;
            }
        }
        
    }
}
</style>