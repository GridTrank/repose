<template>
    <div class="title-wrap">
        <div class="back" v-if="titleOptions.back" @click="$router.back()">
            <i class="el-icon-back"></i>
        </div>
        <div class="title">{{titleOptions.name}}</div>
        <div class="tool">
            <p v-if="titleOptions.remark" class="remark">备注：以下数据不包括找飞友及图片类主题的文章</p>
            <el-input v-if="titleOptions.search" class="search-input" style="width:300px" v-model="searchData" placeholder="搜索文章">
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        titleOptions:Object
    },
    data(){
        return{
            searchData:''
        }
    },
    methods:{
        search(){
            console.log(this.searchData)
            this.$emit("titleSearch",this.searchData)
        }
    }
}
</script>

<style  lang="less">
.title-wrap{
    border: 1px solid #ccc;
    border-radius: 8px;
    margin: 20px 0;
    background-color: #fff;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    height: 100px;
    position: relative;
    .back{
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        border-right:1px solid #ccc;
        cursor: pointer;
    }
    .title{
        font-size: 16px;
        font-weight: 600;
        margin-left: 30px;
    }
    .tool{
        display: flex;
        align-items: center;
        position: absolute;
        right: 30px;
        .remark{
            color: #666;
        }
        .search-input{
            margin-left: 60px;
            position: relative;
            border-radius: 20px;
            // overflow: hidden;
            .el-input__inner{
                background-color: #ddd;
                border: none;
                border-radius: 20px;
            }
             &::after{
                display: block;
                content: '';
                position: absolute;
                width: 1px;
                height: 100%;
                background: #f8f8f8;
                left: -30px;
                top: 0;
            }
        }
    }
    .el-input-group__append{
        background: transparent;
        border: none;
        position: absolute;
        right: 10px;
        bottom: 10px;
        font-size:18px;
        color: #000;
    }
}
</style>