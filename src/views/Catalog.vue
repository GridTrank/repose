<template>
    <div class="catalog-wrap bodyCon" >
        <div class="catalog-left">
            <div class="info">
                <img src="../assets/images/11.png" alt="" srcset="">
                <div class="detail">
                    <p class="name"> 漫画名称</p>
                    <p class="author">作者：111</p>
                    <p class="status">状态：连载中</p>
                    <p class="label">标签 
                        <span v-for="(tags,ti) in 2" :key="ti">分类</span>
                    </p>
                    <p class="brief threeHiddens">简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介</p>
                </div>
                
            </div>
            <div class="record mt20">
                <div class="re-name">
                    <img src="../assets/images/logo.png" alt="">
                    <span>上次看到 章节名称</span>
                </div>
                <p class="read">继续阅读</p>
            </div>
            <div class="cata mt20">
                <div class="cata-top">
                    <span class="cata-txt">已完结 / 已更139话</span>
                    <div class="sort">
                        <span>正序</span>
                        <span>倒序</span>
                    </div>
                </div>
                <div class="cata-list">
                    <div class="cata-item" v-for="(item,index) in 8" :key="index">
                        <img src="../assets/images/logo.png" alt="">
                        <div class="cata-info">
                            <p>章节名称</p>
                            <p>免费</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="catalog-right">
            <div class="collec">
                <div class="co-cs">
                    <div class="co-count" v-for="(dd,ii) in 2" :key="ii">
                        <img src="../assets/images/logo.png" alt="" srcset="">
                        <p class="cc">123</p>
                    </div>
                </div>
                <p class="btn">收藏</p>
            </div>
            <div class="advertisement mt20"></div>
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
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.catalog-wrap{
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    .catalog-left{
        width: 900px;
        padding: 20px;
        .info{
            display: flex;
            img{
                width: 230px;
                height: 330px;
                margin-right: 40px;
                border: 1px solid #ddd;
            }
            .detail{
                p{
                    margin-top: 20px;
                }
            }
        }
        .record{
            background:#ddd;
            display: flex;
            padding: 20px 30px;
            justify-content: space-between; 
            align-items: center;
            .re-name{
                display: flex;
                align-items: center;
                img{
                    width: 50px;
                    height: 50px;
                    margin-right: 20px;
                }
            }
            .read{
                border-radius: 8px;
                padding: 10px 20px;
                background: #539FFF;
                color: #fff;
            }
        }
        .cata{
            width: 100%;
            .cata-top{
                position: relative;
                .cata-txt{
                    position: absolute;
                    left: 10px;
                }
               .sort{
                   width: 100%;
                   text-align: center;
               } 
            }
            .cata-list{
                display: flex;
                flex-wrap: wrap;
                .cata-item{
                    width: 250px;
                    display: flex;
                    margin-top: 10px; 
                    margin-right: 70px; 
                    &:nth-child(3n+3){
                        margin-right: 0;
                    } 
                    img{
                        width: 100px;
                        height: 70px;
                    }
                }
            }
        }
    }
    .catalog-right{
        width: 300px;
        .collec{
            border: 1px solid #ddd;
            width: 100%;
            padding-bottom: 50px;
            .co-cs{
                display: flex;
                justify-content: space-between;
                padding: 50px;
                .co-count{
                    width: 100px;
                    display: flex;
                    padding-left: 20px;
                    img{
                        width: 30px;
                        height: 30px;
                    }
                    .cc{
                        height: 30px;
                        line-height: 30px;
                    }
                }
            }
            .btn{
                padding: 10px 30px;
                background: #539FFF;
                border-radius: 8px;
                text-align: center;
                color: #fff;
                width: 50%;
                margin: auto;
            }
            
        }
        .advertisement{
            width: 100%;
            height: 400px;
            border: 1px solid #ddd;
        }
        .list{
           .item-t{
               border: 1px solid #ddd;
               padding: 10px 40px;
               width: 100px;
               text-align: center;
               border-radius: 8px;
           } 
           .item-info{
               display: flex;
               img{
                   width: 50px;
                   height: 100px;
                   margin-right: 10px;
               }
               .info{
                   .count{
                        display: flex;
                        .co-count{
                            display: flex;
                            padding-left: 20px;
                            img{
                                width: 20px;
                                height: 20px;
                            }
                            .cc{
                                height: 20px;
                                line-height: 20px;
                            }
                        }
                    }
               }
           }
        }
    }
}
</style>