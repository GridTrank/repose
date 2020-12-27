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
                <p class="name "> {{detail.book_name}}</p>
                <p class="author mt20">{{detail.author_name}}</p>
                <p class="label mt20">{{detail.tags}}</p>
                <p class="brief threeHiddens mt20">{{detail.summary}}</p>
                <div class="info-cs" @click="collection">
                    <img v-if="!isfavor" src="../assets/images/sch.png" >
                    <img v-else src="../assets/images/ysc.png" >
                    <p>{{isfavor?'已收藏':'收藏'}}</p>
                </div>
            </div> 
        </div>
        <div class="catalog-wrap">
            <div class="catalog-left">
                <div class="cata-top">
                    <div class="cata-txt">
                        <span>{{detail.end==0?'连载中':'已完结'}} /</span>
                        <span>已更{{detail.last_chapter}}</span>
                    </div>
                    <div class="sort">
                        <span class="sort-o" :class="selectSort==1?'select':''" @click="changeSort(1)">正序</span>
                        <span class="sort-d" :class="selectSort==2?'select':''" @click="changeSort(2)">倒序</span>
                    </div>
                </div>
                <div class="cata-list" v-if="list.length>30">
                    <router-link target="_blank"  :to="'/Detail?id='+item.id" class="cata-item" v-for="(item,index) in list" :key="index">
                        <img class="cata-img" :src="detail.cover_url" >
                        <div class="cata-info">
                            <p class="cata-name oneHidden" >{{item.chapter_name}}</p>
                            <div class="cata-spec">
                                <p class="cata-mf" v-if=" (sort=='asc' && index+1<detail.start_pay) || (sort=='rev') && index> (list.length-detail.start_pay) ">免费</p>
                                <p v-else>
                                    <span class="cata-g">{{Number(detail.money).toFixed(0)*10}}金币</span>
                                    <span class="cata-v">VIP会员免费</span>
                                </p>
                            </div>
                        </div>
                    </router-link>
                </div>
                <div class="cata-column" v-else>
                    <router-link target="_blank"  :to="'/Detail?id='+item.id" class="cata-item" v-for="(item,index) in list" :key="index">
                        <img class="cata-img" :src="detail.cover_url" alt="">
                        <div class="cata-info">
                            <p class="cata-name oneHidden" >{{item.chapter_name}}</p>
                            <div class="cata-spec">
                                <p class="cata-mf" v-if=" (sort=='asc' && index+1<detail.start_pay) || (sort=='rev') && index> (list.length-detail.start_pay) ">免费</p>
                                <p v-else>
                                    <span class="cata-g">{{Number(item.chapter_order).toFixed(0)}}金币</span>
                                    <span class="cata-v">VIP会员免费</span>
                                </p>
                            </div>
                        </div>
                        <div class="upgrade" v-if="(sort=='asc' && index+1>=detail.start_pay) || (sort=='rev') && index<= (list.length-detail.start_pay)">
                            <p>提前看更新章节</p>
                            <p>升级为VIP</p>
                        </div>
                    </router-link>
                </div>

            </div>
            <div class="catalog-right">
                <div class="list">
                    <p class="item-t">最新更新</p>
                    <router-link target="_blank"  :to="'/Catalog?id='+data.id" class="item-info mt20" v-for="(data,index) in newList" :key="index">
                        <img :src="data.cover_url" alt="">
                        <div class="info">
                            <p class="i-name">{{data.book_name}}</p>
                            <p class="i-sum twoHidden">{{data.summary}}</p>
                            <div class="count">
                                <span>已更 <span class="gx">{{data.last_chapter.split("话")[0]}}</span> </span>
                                <span>
                                    <img src="../assets/images/hr.png" alt="">
                                    <span>123</span>
                                </span>
                                <span>
                                    <img src="../assets/images/dz.png" alt="">
                                    <span>123</span>
                                </span>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getChapList,getBookDetail,getNewest,getFavor,switchFavor,getRecommend} from '@/utils/api.js'
import { mapActions, mapGetters } from "vuex";
export default {
    data(){
        return{
            list:[],
            detail:{},
            newList:[],
            selectSort:1,
            sort:'asc',
            isfavor:0
        }
    },
    computed: {
        ...mapGetters(["getUserInfo"])
    },
    created(){
        this.getList()
        this.getDetail()
        this.getNew()
        this.isFavor()
    },
    methods:{
        //列表
        getList(){
            let data={
                book_id:this.$route.query.id
            }
            getChapList(data).then(res=>{
                this.list=res.data.chapters
            })
        },
        //详情
        getDetail(){
            let data={
                id:this.$route.query.id,
            }
            getBookDetail(data).then(res=>{
                this.detail=res.data.book
                if(!localStorage.getItem("allBrowse")){
                    let arr=[]
                    localStorage.setItem("allBrowse",JSON.stringify(arr) )
                }
                let allBrowse=localStorage.getItem("allBrowse")?JSON.parse(localStorage.getItem("allBrowse")): []

                let result=allBrowse.some(item=>{
                    return item.id==res.data.book.id
                })
                if(!result && allBrowse.length<=30){
                    allBrowse.push(res.data.book)
                    localStorage.setItem("allBrowse",JSON.stringify(allBrowse) )
                }
            })
        },
        getNew(){
            getNewest({}).then(res=>{
                this.newList=res.data.newest
            })
        },
        //收藏
        isFavor(){
            let data={
                book_id:this.$route.query.id,
                utoken:localStorage.getItem("utoken")
            }
            getFavor(data).then(res=>{
                this.isfavor=res.data.isfavor
            })
        },
        collection(){
            let data={
                isfavor:this.isfavor,
                book_id:this.$route.query.id,
                utoken:localStorage.getItem("utoken")
            }
            switchFavor(data).then(res=>{
                this.isfavor=res.data.isfavor
            })
        },
        changeSort(val){
            this.selectSort=val
            if(val==1 && this.sort=="rev"){
                this.list=this.list.reverse()
                this.sort='asc'
            }
            if(val==2 && this.sort=='asc'){
                this.list=this.list.reverse()
                this.sort='rev'
            }
            
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
                        display:flex;
                        .dd{
                            width: 150px;
                            color: #000;
                            font-size:14px;
                            margin-left: 10px;
                            font-weight: 400;
                            display: inline-block;
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
        .info-right{
            margin-left: 40px;
            position: relative;
            .name{
                font-size: 20px;
                font-weight:400;
            }
            .author{
                color:#666;
                font-size: 14px;
            }
            .label{
                background: #F8F2E7;
                color: #BA986B;
                font-size: 12px;
                border-radius: 4px;
                padding: 2px 8px;
                display: inline-block;
            }
            .brief{
                color: #666;
                font-size: 14px;
                letter-spacing:2px;
                line-height: 25px;
            }
            .info-cs{
                position: absolute;
                top: 0;
                right: 0px;
                display: flex;
                align-items: center;
                cursor: pointer;
                img{
                    width: 18px;
                    height: 18px;
                    margin-right: 5px;
                }
            }
        }
    }
    .catalog-wrap{
        display: flex;
        .catalog-left{
            width: 950px;
            .cata-top{
                display: flex;
                justify-content: space-between;
                margin-bottom: 30px;
                .cata-txt{
                    font-size: 16px;
                    font-weight: 400;
                }
                .sort{
                    margin-right: 30px;
                    cursor: pointer;
                    span{
                        font-size: 12px;
                        margin-right: 10px;
                        font-weight: 400;
                        color: #666;
                    }
                    .select{
                        color: #000;
                    }
                }
            }
            .cata-list{
                display: flex;
                flex-wrap: wrap;
                .cata-item{
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    width: 270px;
                    margin-bottom: 30px;
                    .cata-img{
                        width: 78px;
                        height: 50px;
                        border-radius: 4px;
                    }
                    .cata-info{
                        margin-left: 16px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        .cata-name{
                            font-size: 16px;
                            font-weight: 400;
                            width: 150px;
                        }
                        .cata-spec{
                            margin-top: 7px;
                            .cata-mf{
                                font-size: 12px;
                                color: #999;
                            }
                            .cata-g{
                                font-size: 12px;
                                color: #F7B500;
                                margin-right: 14px;
                            }
                            .cata-v{
                                font-size: 12px;
                                color: #57390F
                            }
                        }
                    }
                }
            }
            .cata-column{
               display: flex;
               flex-direction: column;
               .cata-item{
                    flex-shrink: 0;
                    display: flex;
                    width: 90%;
                    margin-bottom: 30px;
                    position: relative;
                    .cata-img{
                        width: 230px;
                        height: 126px;
                        border-radius: 4px;
                    }
                    .cata-info{
                        margin-left: 16px;
                        display: flex;
                        flex-direction: column;
                        .cata-name{
                            font-size: 16px;
                            font-weight: 400;
                            width: 200px;
                        }
                        .cata-spec{
                            margin-top: 10px;
                            .cata-mf{
                                font-size: 12px;
                                color: #999;
                            }
                            .cata-g{
                                font-size: 12px;
                                color: #F7B500;
                                margin-right: 14px;
                            }
                            .cata-v{
                                font-size: 12px;
                                color: #57390F
                            }
                        }
                    }
                    .upgrade{
                        border: 1px solid #FEDC00;
                        border-radius: 27.5px;
                        width: 168px;
                        height: 45px;
                        padding-top: 8px;
                        text-align: center;
                        position: absolute;
                        right: 0;
                        top: 38%;
                        p{
                            font-size: 14px;
                            color: #57390F;
                        }
                        
                    }
                }
            }
        }
        .catalog-right{
            .list{
                .item-t{
                    font-size: 16px;

                }
                .item-info{
                    display: flex;
                    
                    img{
                        width: 120px;
                        height: 159px;
                    }
                    .info{
                        margin-left: 10px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        .i-name{
                            font-size: 18px;
                            font-weight: 400;
                        }
                        .i-sum{
                            width: 237px;
                            font-size: 14px;
                            color: #999;
                        }
                        .count{
                            span{
                                font-size: 12px;
                                color: #666;
                                img{
                                    width: 14px;
                                    height: 17px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>