<template>
    <div class="table-wrap">
        <el-table 
        size="small"
        :data="tableData" 
         @selection-change="handleSelectionChange"
        border 
        >   
            <el-table-column align="center" v-if="options && options.selection" type="selection" width="55"></el-table-column>
            <el-table-column 
                :type="item.type"
                align="center"
                v-for="(item,index) in columnData" :key="index"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
            >
                <template slot-scope="scope">
                    <!-- 商品类型 -->
                    <span v-if="item.prop=='productType'">
                        {{
                            scope.row[item.prop]==1?'非出清款':
                            scope.row[item.prop]==2?'出清款':
                            scope.row[item.prop]==3?'礼品专供款':
                            '未知类型'
                        }}
                    </span>
                    <span v-else-if="item.prop=='afterData' || item.prop=='beforeData' ">
                        <p v-for="(ss,si) in scope.row[item.prop]" :key="si">
                            <span>{{ss.optionLabel}}: {{ss.optionValue}}</span>
                        </p>
                    </span>
                    <!-- 是否商家 -->
                    <span v-else-if="item.prop=='isSale' || item.prop=='isErrAlarm' ">
                       {{scope.row[item.prop] == 0 ? '否':'是'}}
                    </span>
                    <!-- 接收状态 -->
                    <span v-else-if="item.prop=='receiveState'">
                       {{scope.row[item.prop] == 0 ? '未读':'已读'}}
                    </span>
                    <!-- 处理状态 -->
                     <span v-else-if=" item.prop == 'loggerState' || item.prop == 'messageState'">
                       {{scope.row[item.prop] == 0 ? '未处理':'已处理'}}
                    </span>
                    <!-- 最后操作时间 -->
                     <span v-else-if=" item.prop == 'updateTime' && page == 'warnLog'">
                       {{scope.row.loggerState == 0 ? '':scope.row[item.prop]}}
                    </span>
                    <!-- 商品原价 || 商品成本 -->
                     <span v-else-if="(item.prop == 'originalPrice' || item.prop == 'costPrice') && page == 'warnDetail'">
                       <span v-if="scope.row[item.prop] === null" class="red">该订单商品不在检测商品基础资料列表，相关人员请关注维护好基础商品数据</span>
                       <span v-else-if="scope.row[item.prop] <= 0" class="red">该订单商品原价为0，相关人员请关注维护好基础商品数据</span>
                       <span v-else>{{scope.row[item.prop]}}</span>
                    </span>
                    <!-- 异常报警人员列表 || 日报警人员 || 订单号 -->
                    <span v-else-if=" item.prop=='errAlarm' || item.prop=='dayAlarm' || item.prop == 'orderSn' ">
                        <span v-if="typeof(scope.row[item.prop]) != 'string'">
                           <p  v-for="(ss,si) in scope.row[item.prop]" :key="si">
                                <span>{{ss.userName || ss}}</span>
                            </p>
                        </span>
                        <span v-else>{{scope.row[item.prop]}}</span>
                    </span>
               
                    <span v-else>{{scope.row[item.prop]}}</span>
                </template>

            </el-table-column>
            <el-table-column label="操作" :width="options.width"  align="center" v-if="options && options.operation && options.operation.length>0">
                <template slot-scope="scope">
                    <span class="btns" v-for="(btn,bindex) in options.operation" :key="bindex">
                        <el-button 
                        size="small"
                        @click="submit(scope.row,btn.value,bindex)"
                        :type="btn.type"
                        >{{btn.name}}</el-button>
                    </span>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 开始 -->
        <div class="page" >
            <el-pagination
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                :current-page="pager.page"
                :page-size="pager.rows"
                :page-sizes="[20,50,100,500,1000]"
                background
                layout="total, sizes,prev, pager, next, jumper"
                :total="count">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        tableData:Array,
        count:Number,
        columnData:Array,
        options:Object,
        page:String,
        pager:{
            type:Object,
            default: function() {
                return {page:1,rows:20}
            }
        }
    },
    data(){
        return{
            more:0,
        }
    },
    methods:{
        submit(data,type,index){
            switch(type){
                case 'redirect':
                    this.$emit("redirect",data)
                    break;
                case 'edit':
                    this.$emit("edit",data,index)
                    break;
                //单个删除
                case 'del':
                    this.$emit("del",data,'one')
                    break;
                case 'remark':
                    this.$emit("remark",data,index)
                    break;
            }
        },
        //全选
        handleSelectionChange(val){
            this.$emit("select",val)
        },
        //页码
        handleCurrentChange(val){
            this.$emit('currentChange',val)
        },
        //页数
        handleSizeChange(val){
            this.$emit('sizeChange',val)
        },
        moreRemark(id){
          this.more = id;
        }
    }
}
</script>

<style scoped lang="less">
.btns{
    margin-right: 10px;
}
.remark {
  .info{
    max-height:50px;
    overflow:hidden;
    &.all{
      height:auto;
      max-height:500px;
    }
    
  }
  .none{
      display:none;
    }
 
}
</style>