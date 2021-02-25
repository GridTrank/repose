<template>
    <div class="input-wrap">
        <el-form :model="searchData" :inline="true" size="mini">
            <el-form-item v-for="(item,index) in searchFrom" :key="index" :label="item.label">
                <el-input
                    v-model="searchData[item.value]"
                    v-if="item.type=='text' || item.type == 'textarea'"
                    :type="item.type"
                    :placeholder="item.placeholder"
                    :clearable="item.clear"
                    :autosize="{ minRows: 1, maxRows: 4}"
                    :style="item.style">
                </el-input>
                <el-select
                    v-else-if="item.type=='select'"
                    v-model="searchData[item.value]">
                    <el-option
                        v-for="(sd,si) in item.selectFrom"
                        :key="si"
                        :label="sd.label"
                        :value="sd.value"
                    ></el-option>
                </el-select>

                <div v-else-if="item.type=='date'">
                    <datePicker
                    @getLineData='getCreatedData'
                    :name="item.name"
                    ref="date"
                    :from="'commonInput'"
                    :selectDateData="selectDateData"></datePicker>
                </div>

                <el-button
                    v-else-if="item.type=='btn'"
                    @click="btnClick(item)"
                    :type="item.btnType">
                    {{item.btntxt}}
                </el-button>

                <div v-else-if="item.type=='export'">
                    <el-upload
                        ref='upload'
                        style="display:inline-block"
                        class=" ml10"
                        :action="domain + item.action"
                        :with-credentials="true"
                        name="file"
                        :data="importData"
                        :file-list="fileList"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        :on-success="FileSuccess"
                        :on-error="FileFail"
                    >
                        <el-button icon="el-icon-upload2"   type="primary">导入</el-button>
                    </el-upload>
                </div>

                <div v-else-if="item.type=='upload'">
                    <span>仅支持.xlsx格式 </span>
                    <a class="upload" :href="item.href" target="_blank">下载商品数据导入模板</a>
                </div>

            </el-form-item>

        </el-form>

    </div>
</template>

<script>
import datePicker from './datePicker'
import {getDate} from '@/utils/index'
import config from '@/utils/config.js'
export default {
    props:{
        searchFrom:Array,
        from:String,
    },
    data(){
        return{
            domain:config.Domain,
            importData:{
            },
            fileList:[],
            searchData:{},
            selectDateData:[
                {label:'按天查询',value:'day'},
            ],
        }
    },

    components:{
        datePicker
    },
    created(){
        
    },
    methods:{
        getCreatedData(type,value,name){
            this.searchData[name]={}
            this.searchData[name].type=type;
            this.searchData[name].opt=getDate(this,type,value);
            if(this.searchData[name].opt){
                this.searchData[name].opt[0]= this.searchData[name].opt[0] +' 00:00:00'
                this.searchData[name].opt[1]= this.searchData[name].opt[1] +' 23:59:59'
            }
            console.log(this.searchData)
        },
        //导入成功
        FileSuccess(res){
            if(res.code==200){
                this.$message({
                    message:'导入成功',
                    type:'success'
                })
                this.$emit("search",this.searchData)
                this.fileList=[]
            }else{
               this.$message.error(res.message?res.message:'导入失败')
               this.fileList=[]
            }
        },
        //导入失败
        FileFail(res){
            console.log(res)
        },
        //按钮点击事件
        btnClick(data){
            switch (data.value){
                //搜索
                case 'search':
                    var searchData = {};
                    var that = this;
                    that.searchFrom.forEach((item,index)=>{
                        for(name in that.searchData){
                            if(!that.searchData[name]){
                                delete that.searchData[name]
                            }else{
                                if(item.value == name || item.name == name ){
                                    switch(item.search){
                                        case 'in' :
                                            searchData[name] = ['in',that.searchData[name].split(item.split)];
                                            searchData[name][1]=searchData[name][1].filter(ele=>{
                                                return ele!=''
                                            })
                                        break;
                                        case 'between' :
                                            if(item.type=='date'){
                                                searchData[name] = ['between',that.searchData[name].opt];
                                            }else{
                                                if(item.value=='originalPricemin' || item.value=='originalPricemax'){
                                                    searchData['originalPrice'] = ['between',[that.searchData.originalPricemin || '' , that.searchData.originalPricemax || '']];
                                                }else if(item.value=='costPricemin' || item.value=='costPricemax'){
                                                    searchData['costPrice'] = ['between',[that.searchData.costPricemin || '' , that.searchData.costPricemax || '']];
                                                }else if(item.value=='priceRadiomin' || item.value=='priceRadiomax'){
                                                    searchData['priceRadio'] = ['between',[that.searchData.priceRadiomin || '' , that.searchData.priceRadiomax || '']];
                                                }else{
                                                    searchData[name] = ['between',that.searchData[name]];
                                                }
                                            }

                                        break;
                                        case 'eq' :
                                            searchData[name]=['eq',that.searchData[name] ]
                                            break;
                                        case 'like':
                                            searchData[name] = ['like',`%${that.searchData[name]}%`];
                                        break;
                                        default: searchData[name] = that.searchData[name]
                                    }
                                }
                            }

                        }
                    })
                    this.$emit("search",searchData)
                    break;
                //重置
                case 'reset':
                    this.searchData={}
                    if(!this.$refs.date )return
                    this.$refs.date.forEach(item=>{
                        item.selectDate=['','']
                    })
                    break;
                //批量修改
                case 'batchChange':
                    this.$emit('batchModify',this.searchData)
                    break;
                //导出
                case 'export':
                    this.$emit('exportReport',true)
                    break;
                //批量删除
                case 'batchDel':
                    this.$emit("del",this.searchData,'all')
                    break;
                //添加
                case 'add':
                    this.$emit("add",this.searchData,'all')
                    break;
            }
        }
    }
}
</script>

<style scoped lang="less">
.upload{
    color: #539FFF;
    margin-left: 10px;
}
</style>
