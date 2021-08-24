<template>
    <div class="list-wrap">
        <div class="top">
            <div class="top-left">
                <img v-if="item.type=='apartment'" class="avatar" src="https://ada.xiaoapi.com/gter/yifangPC/images/%E3%80%901_0%E3%80%91%E5%BC%95%E7%94%A8/u537.png" >
                <img v-else class="avatar" :src="item.avatar" >

                <span class="tl-s1">{{item.nickname}}</span>
                <span v-if="item.type=='article' || item.type=='flyingFriend' || item.type=='read'" class="tl-s2">
                   
                    {{item.relativedate}} <span class="tl-s3">{{item.topicalname}}</span> 
                </span>

                <span v-else-if="item.type=='renthouse' " class="tl-s2">
                    {{item.relativedate}}发表于 <span class="tl-s3">{{item.citynode}}</span>
                </span>

                <span v-else-if="item.type=='offer'" class="tl-s2">
                    {{item.relativedate}}发表于 <span class="tl-s3">Offer</span>
                </span>
                <span v-else-if="item.type=='vote'" class="tl-s2">
                    {{item.relativedate}}发表于 <span class="tl-s3">投票</span>
                </span>
                <span v-else-if="item.type=='interviewExperience'" class="tl-s2">
                    {{item.relativedate}}发表于 <span class="tl-s3">面经</span>
                </span>
                <span v-else-if="item.type=='apartment'" class="tl-s2">
                    <span class="tl-s3">香港品牌公寓</span>
                </span>
            </div>

            <div class="top-right" @click="selectArticle" :class="isSelect && 'sel'">
                <i class="el-icon-circle-check"></i>
            </div>
        </div>
        
        <div class="bottom" v-if="item.type=='article'">
            <div class="b-left">
                <p class="b-p1">{{item.title}}</p>
                <p class="b-p2 towHidden">{{item.description}}</p>
            </div>
            <div class="b-right">
                <img :src="item.image" >
            </div>
        </div>
        
        <div class="bottom fly" v-else-if="item.type=='flyingFriend'">
            <div class="b-top">
                <p>{{item.departurecityname}}</p>
                <i class="el-icon-right"></i>
                <p>{{item.destinationcityname}}</p>
            </div>
            <div class="b-center">
                <p>
                    <i class="el-icon-date"></i>
                    <span v-if="item.flightdeparturetime">{{item.flightdeparturetime}}</span>
                    <span v-else>
                        <span >{{item.startschedule}}</span>~<span>{{item.latestschedule}}</span>
                    </span>
                </p>
                <p>{{item.sex==1?'限男生':item.sex==2?'限女生':'男女皆可'}}</p>
                <p>{{item.istickets==1?'已购机票':'未购机票'}}</p>
            </div>
            <div class="b-bottom">
                <p>{{item.message}}</p>
            </div>
        </div>

        <div class="bottom " v-if="item.type=='renthouse'">
            <div class="b-left">
                <p class="b-p1">{{item.subject}}</p>
                <div class="b-c">
                    <span>{{item.location}}</span> <span>{{item.housetype}}</span> <span>{{item.gender}}</span>
                </div>
                <p class="b-b">
                    <span class="b-b-s1">{{item.currency}}</span>
                    <span class="b-b-s2">{{item.money }}<span class="b-b-s3">/{{item.rentalperiod}}</span> </span>
                </p>
            </div>
            <div class="b-right">
                <img :src="item.image" >
            </div>
        </div>

        <div class="bottom fly" v-if="item.type=='offer'">
            <p class="b-p1">{{item.schoolname}}</p>
            <p class="b-p1">{{item.professional}}</p>
            <div class="b-c">
                <span>{{item.year}}</span> 
                <span>{{item.semester}}</span> 
                <span>{{item.apply_results}}</span> 
                <span v-if="item.gpa">{{item.gpa}}</span>
                <span v-if="item.schoolgrade">{{item.schoolgrade}}</span>
            </div>
        </div>

        <div class="bottom" v-if="item.type=='apartment'">
            <div class="b-left">
                <p class="b-p1">{{item.title}}</p>
                <p class="b-p2 towHidden">{{item.propaganda}}</p>
                <p> HK$ <span class="b-b-s2">{{item.rentprice}}</span> </p>
            </div>
            <div class="b-right">
                <img :src="item.image" >
            </div>
        </div>
        
        <div class="bottom" v-if="item.type=='interviewExperience'">
            <div class="b-left">
                <p class="b-p1">{{item.subject}}</p>
                <p class="b-p2 towHidden">{{item.school}}</p>
                <p>{{item.profession}}</p>
            </div>
            <div class="b-right">
                <img :src="item.image" >
            </div>
        </div>



    </div>
</template>

<script>
export default {
    props:{
        item:Object,
        isSelect:Boolean
    },
    methods:{
        selectArticle(){
            this.$emit('selectArticle',this.item)
        }
    }
}
</script>

<style scoped lang="less">
.list-wrap{
    background: #fff;
    border-radius: 12px;
    .top{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        border-bottom: 1px solid #eee;
        .top-left{
            display: flex;
            align-items: center;
            justify-content: space-between;
            img{
                width: 28px;
                border-radius: 50%;
            }
            .tl-s1{
                font-size: 16px;
                color: #333;
                margin: 0 15px;
            }
            .tl-s2{
                font-size: 16px;
                color: #999;
                .tl-s3{
                    color: #02A7F0;
                    cursor: pointer;
                }
            }
            
        }
        .top-right{
            font-size: 24px;
            cursor: pointer;
        }
        .sel{
            color: #26d79f
        }
    }
    .bottom{
        padding: 20px;
        display: flex;
        justify-content: space-between;
        .b-left{
            width: 88%;
        }
        .b-c{
            margin: 10px 0;
            span{
                color: #666;
                font-size: 14px;
                margin-right: 15px;
            }
        }
        .b-b{
            font-size: 16px;
            .b-b-s1,.b-b-s3{
                color: #333;
            }
            .b-b-s2{
                color: #C63E3A;
            }
        }
        .b-b-s2{
                color: #C63E3A;
            }
        .b-right{
            img{
                width: 100px;
            }
        }
        .b-p1{
            color: #333;
            font-size: 18px;
            margin-bottom: 10px ;
        }
        .b-p2{
            margin: 10px 0;
        }
    }
    .fly{
        flex-direction: column;
        .b-top{
            display: flex;
            align-items: center;
            font-size: 16px;
            font-weight: bold;
            color: #000;
            i{
                margin: 0 10px;
            }
        }
        .b-center{
            display: flex;
            align-items: center;
            p{
                margin: 20px 20px 15px 0;
                font-size: 16px;
            }
        }
    }
}
</style>