<template>
    <div class="list-wrap">
        <div class="top">
            <div class="top-left">
                <img :src="item.avatar" >
                <span class="tl-s1">{{item.nickname}}</span>
                <span class="tl-s2">{{item.relativedate}} <span class="tl-s3">{{item.topicalname}}</span> </span>
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
                <i class="el-icon-date"></i>
            </div>
            <div class="b-bottom">
                <p>{{item.message}}</p>
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

        }
    }
    .fly{
        flex-direction: column;
        
    }
}
</style>