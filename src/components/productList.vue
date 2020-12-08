<template>
    <div class="productList-wrap">
        <div v-if="type=='typeOne'" class="p-lists">
            <div class="type-one" v-for="(item,index) in data" :key="index">
                <div class="imgBox">
                    <img class="p-img" src="../assets/logo.png" >
                </div>
                <p class="p-status">已完结</p>
                <p class="p-name">漫画名称</p>
                <p class="p-class">
                    <span >分类1</span>
                    <span>分类2</span>
                </p>
            </div>
        </div>

        <div v-if="type=='typeTwo'" class="p-lists">
            <div class="type-two" v-for="(item,index) in 4" :key="index">
                <div class="imgBox">
                    <img class="p-img" src="../assets/logo.png" >
                    <p class="p-status">已完结</p>
                </div>
                <div class="p-brief">
                    <p class="p-name">漫画名称</p>
                    <p class="p-info twoHidden">漫画简介漫画简介漫画简介漫画简介漫画简介漫画简介漫画简介漫画简介漫画简介漫画简介漫画简介</p>
                    <p class="p-class">
                        <span>已更111</span>
                        <span>分类2</span>
                        <span>分类2</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        type:String
    },
    data(){
        return{
            data:12,
        }
    }
}
</script>

<style scoped lang="less">
.productList-wrap{
    .p-lists{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        .type-one{
            position: relative;
            margin-top:20px;
            cursor: pointer;
            .imgBox{
                width: 184px;
                height: 244px;
                border: 1px solid #ddd;
                .p-img{
                    width: 100%;
                    height: 100%;
                }
            }
            .p-status{
                position: absolute;
                top:0;
                right: 0;
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
                border: 1px solid #ddd;
                position: relative;
                margin-right: 20px;
                .p-img{
                    width: 100%;
                    height: 100%;
                }
                .p-status{
                    position: absolute;
                    top:0;
                    right: 0;
                }
            }
            .p-brief{

            }
            
            
        }
    }
}
</style>