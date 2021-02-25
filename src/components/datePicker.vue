<template>
    <div class="date-wrap">
        <el-select v-model="dateType" style="width:100px;" placeholder="请选择"  @change="selectType">
            <el-option
            v-for="(date,index) in selectDateData" :key="index"
            :label="date.label"
            :value="date.value"
            ></el-option>
        </el-select>

        <el-date-picker
            v-model="selectDate"
            v-show="dateType == 'day' "
            type="daterange"
             :default-time="['00:00:00', '23:59:59']"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change='getLineData'
        >
        </el-date-picker>
             
        <el-date-picker
            v-model="selectDate"
            v-if="dateType == 'week'"
            format="yyyy 第 WW 周"
            @change='getLineData'
            :picker-options="{
                'firstDayOfWeek':1
            }"
            type="week"
            id="week"
            placeholder="选择日期">
        </el-date-picker>
        <el-date-picker
            v-model="selectDate"
            v-if="dateType == 'month'"
            @change='getLineData'
            value-format="yyyy-MM-dd"
            id="month"
            type="month"
            placeholder="选择日期">
        </el-date-picker>
  </div>
</template>

<script>
export default {
    props:{
        times:{
            type:Object
        },
        name:String,
        selectDateData:Array,
        from:String
    },
    data(){
        return{
            dateType:'day',
            selectDate:'',
        }
    },
    watch:{
        
    },
    computed: {
        timeDefault() {
            var start = new Date(
                new Date(new Date().toLocaleDateString()).getTime()-24*60*60*1000
            ); 
            var end = new Date( 
                new Date(new Date().toLocaleDateString()).getTime()-1
            );
            // var dateArr=end
            var dateArr=[start,end]
            return dateArr;
        }
    },
    mounted(){  
        if(this.times){
            this.dateType=this.times.type
            var value=this.times.value
            if(value.indexOf(',')!=-1){
                var res=value.split(',')
                res[1]=res[1]+' 23:59:59'
                res=[new Date(res[0]), new Date(res[1])]
                this.selectDate=res
            }else{
                 this.selectDate=this.times.value
            }
           
        }else{
            if(this.dateType=='day'){
                if(this.from=='commonInput'){
                    this.selectDate=''
                }else{
                    this.selectDate = this.timeDefault;
                    this.$emit('getLineData',this.dateType,this.selectDate,this.name)
                }
                
            }
        }
        
    },
    methods:{
        selectType(value){
            this.dateType=value
            this.selectDate=''
            this.$emit('changeType',value)
        },
        getLineData(){ 
            this.$emit('getLineData',this.dateType,this.selectDate,this.name)
        }
    }
}
</script>

<style>

</style>