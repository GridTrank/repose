<template>
    <div class="productList-wrap">
        <div v-if="type=='typeOne'" class="p-lists">
            <div class="type-one" v-for="(data,index) in item" :key="index">
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

        <div v-if="type=='typeTwo'" class="p-lists">
            <div class="type-two" :class="from=='ranklist'?'rank':''" v-for="(data,index) in item" :key="index">
                <div class="imgBox">
                    <img class="p-img" :src="imgurl+data.cover_url" >
                    <p class="p-status">{{data.tags}}</p>
                </div>
                <div class="p-brief">
                    <p class="p-name ">{{data.book_name}}</p>
                    <p class="p-info twoHidden mt20">漫画简介漫画简介漫画简介漫画简介漫画简介漫画简介漫画简介漫画简介漫画简介漫画简介漫画简介</p>
                    <div class="p-tags mt20" >
                        <!-- <p class="p-class" v-if="data.taglist && data.taglist.length>0">
                            <span class="" v-for="(tag,i) in data.taglist" :key="i">{{tag}}</span>
                        </p>
                        <p class="p-class" v-else>{{data.tags}}</p> -->
                        <p>标签</p>
                        <p>标签</p>
                        <p>标签</p>
                    </div>
                </div>
            </div>
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
        // justify-content: space-around;
        .type-one{
            position: relative;
            margin-top:20px;
            cursor: pointer;
            width: 200px;
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
        
        .type-two{
            cursor: pointer;
            position: relative;
            margin-top:20px;
            display: flex;
            width: 100%;
            .imgBox{
                width: 100px;
                height: 150px;
                flex-shrink: 0;
                position: relative;
                margin-right: 20px;
                border-radius: 8px;
                overflow: hidden;
                .p-img{
                    width: 100%;
                    height: 100%;
                }
                .p-status{
                    position: absolute;
                    top:0;
                    right: 0;
                    background: rgba(1, 1, 1, .3);
                    padding:2px 5px;
                    border-radius: 8px;
                }
            }
            .p-brief{    
                .p-name{

                }
               .p-tags{
                   display: flex;
               } 
               
            }   
        }
        .rank:nth-child(1){
            .imgBox{
                width: 200px;
                height: 300px;
            }
            .p-tags{
                display: flex;
                flex-direction: column
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