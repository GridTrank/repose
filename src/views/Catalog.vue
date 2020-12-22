<template>
    <div class="catalog-wrap bodyCon" >
        <div class="info">
            <div class="info-left">
                <img :src="detail.cover_url" alt="" srcset="">
                <div class="record mt20">
                    <div class="re-name">
                        <img src="../assets/images/sckd.png" alt="">
                        <span>上次看到 <span class="dd oneHidden">{{detail.last_chapter}}</span> </span>
                    </div>
                    <p class="read">继续阅读</p>
                </div>
            </div>
            <div class="info-right">
                <p class="name"> {{detail.book_name}}</p>
                <p class="author">{{detail.author_name}}</p>
                <p class="label">标签 
                    <span v-for="(tags,ti) in 2" :key="ti">分类</span>
                </p>
                <p class="brief threeHiddens">{{detail.summary}}</p>
            </div> 
        </div>
        <div class="catalog-left">
            <div class="cata mt20">
                <div class="cata-top">
                    <span class="cata-txt">已完结 / 已更139话</span>
                    <div class="sort">
                        <span>正序</span>
                        <span>倒序</span>
                    </div>
                </div>
                <div class="cata-list">
                    <router-link target="_blank"  :to="'/Detail?id='+item.id" class="cata-item" v-for="(item,index) in list" :key="index">
                        <img src="../assets/images/logo.png" alt="">
                        <div class="cata-info">
                            <p>{{item.chapter_name}}</p>
                            <p>免费</p>
                        </div>
                    </router-link>
                </div>
            </div>
            <div class="catalog-right">
                <div class="list mt20">
                    <p class="item-t">最新更新</p>
                    <div class="item-info mt20" v-for="(data,index) in 5" :key="index">
                        <img src="../assets/images/11.png" alt="">
                        <div class="info">
                            <p>漫画名称</p>
                            <p class="twoHidden">介简介简介简介介简介简介简介介简介简介简介</p>
                            <div class="count">
                                <div class="co-count" v-for="(dd,ii) in 2" :key="ii">
                                    <img src="../assets/images/logo.png" alt="" srcset="">
                                    <p class="cc">123</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getChapList,getBookDetail} from '@/utils/api.js'
import { mapActions, mapGetters } from "vuex";
export default {
    data(){
        return{
            list:[],
            detail:{}
        }
    },
    computed: {
        ...mapGetters(["getUserInfo"])
    },
    created(){
        this.getList()
        this.getDetail()
    },
    methods:{
        getList(){
            let data={
                book_id:this.$route.query.id
            }
            getChapList(data).then(res=>{
                this.list=res.data.chapters
            })
        },
        getDetail(){
            let data={
                id:this.$route.query.id,
            }
            getBookDetail(data).then(res=>{
                console.log(res)
                this.detail=res.data.book
            })
        }
    }
}
</script>

<style scoped lang="less">
.catalog-wrap{
    padding-top: 50px;
    .info{
        display: flex;
        .info-left{
            img{
                width: 347px;
                height: 210px;
                border-radius: 6px;
            }
            .record{
                display: flex;
                height: 44px;
                border: 1px solid #D8D8D8;
                border-radius: 4px;
                line-height: 44px;
                padding: 0 10px;
                justify-content: space-between;
                align-items: center;
                .re-name{
                    display: flex;
                    align-items: center;
                    img{
                        width: 23px;
                        height: 23px;
                    }
                    span{
                        color: #999;
                        font-size: 13px;
                        font-weight: 400;
                        margin-left: 10px;
                        .dd{
                            width: 120px;
                            color: #000;
                            font-size:14px;
                            margin-left: 10px;
                            font-weight: 400;
                        }
                    }
                }
                .read{
                    width: 74px;
                    height: 26px;
                    text-align: center;
                    line-height: 26px;
                    background: #FDE23D;
                    border-radius: 13px;
                    color: #57390F;
                    font-size: 12px;
                    font-weight: 400;
                    cursor: pointer;
                }
            }   
        }
    }
}
</style>