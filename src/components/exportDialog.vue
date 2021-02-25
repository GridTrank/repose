<template>
    <div class="export-dialog" >

        <el-dialog title="信息导出" :visible.sync="isVisible" :before-close="colse" width="40%">
            <el-form :model="form" :action="domain + exportApi" post="GET" ref="export">
                <el-form-item label="文件类型：" label-width="200px">
                    <el-radio-group v-model="form.type">
                        <el-radio v-for="(ra,ri) in fileTypes" :key="ri" :label="ra.value">{{ra.name}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="导出条件：" label-width="200px">
                    <el-radio-group v-model="form.condition">
                        <el-radio v-for="(ra,ri) in exportConditions" :key="ri" :label="ra.value">{{ra.name}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="导出内容：" label-width="200px">
                    <el-checkbox-group v-model="form.fields">
                        <el-checkbox name="export_field[]" v-for="(ra,ri) in exportCondents" :key="ri" :label="ra.value">{{ra.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                
                
                <input type="hidden" name="export_condition" :value="exportValue">
                <input type="hidden" name="export_type" :value="exportType">
                <input type="hidden" v-if="from=='warnDetail'" name="type" :value="type">
                <input type="hidden" v-if="from=='warnDetail'" name="loggerId" :value="loggerId">
                <input type="hidden" v-if="from=='warnDetail' || from=='storeSet'" name="export_key" :value="queryKey">
                <input type="hidden" name="form_condition" :value="JSON.stringify(exportData) ">
                <div class="btn">
                    <el-button @click="colse" size="small ">取 消</el-button>
                    <button type="submit" class="el-button el-button--primary el-button--small" >
                        <i class="el-icon-download"></i>
                        <span>导出</span>
                    </button> 
                </div>
            </el-form>
        </el-dialog>
        
    </div>
</template>

<script>
import config from '@/utils/config.js'
export default {
    props:{
        isVisible:Boolean,
        queryData:Object,
        pager:Object,
        queryKey:String,
        exportApi:String,
        type:String,
        from:String,
        loggerId:String,
        export_key:String
    },
    data(){
        return{
            domain:config.Domain,
            exportValue:'',
            exportType:'xls',
            exportField:'',
            fileTypes:[],
            exportConditions:[],
            exportCondents:[],
            form:{
                type:'xls',
                condition:'all',
                fields:[]
            },
            exportData:{
                page:1,
                rows:9999
            },
        }
    },
    watch:{
        "isVisible":{
            deep:true,
            handler(newVal,oldVal) {
                if(newVal){
                    this.form.condition='all';
                    this.exportValue='';
                    this.getData();
                }
            }
        },
        "form.condition":function(newval,oldval){
            let that=this
             that.exportData=JSON.parse(JSON.stringify(that.queryData))
            if(newval=='all'){
                that.exportData={
                    page:1,
                    rows:9999
                }
                that.exportValue=''
            }else if(newval=='search'){
                that.exportData.page=1
                that.exportData.rows=9999
                that.exportValue=newval
            }else{
                that.exportData.page=that.pager.page
                that.exportData.rows=that.pager.rows
                that.exportValue=newval
            }
        },
        "form.fields":function(newval,oldval){
            this.exportField=newval;
        },
        "form.type":function(newval,oldval){
            this.exportType=newval;
        },
    },

    created(){
        
    },
    methods:{
        getData(){
            var data = {exportConfigKey:this.queryKey};
            if(this.type){
                data.type = this.type;
            }
            http.post('/index/exportConfig',data,(res)=>{
                this.fileTypes=this.changeData(res.type)
                this.exportConditions=this.changeData(res.condition)
                this.exportCondents=this.changeData(res.fields)
                this.form.fields=Object.keys(res.fields)
            })
        },
        changeData(data){
            let arr=[]
            let ss=Object.keys(data)
            ss.forEach(item=>{
                let obj={}
                obj.value=item
                obj.name=data[item]
                arr.push(obj)
            })
            return arr
        },
        colse(){
           this.$emit("update:isVisible",false)
        }
    }
}
</script>

<style scoped lang="less">
.btn{
    width: 100%;
    text-align: right;
    .el-button{
        margin-right: 20px;
    }
}
</style>