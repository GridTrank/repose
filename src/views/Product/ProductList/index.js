import commonInput from '@/components/commonInput.vue'
import exportDialog from '@/components/exportDialog.vue'
import commonTable from '@/components/commonTable.vue'
import { mapActions, mapGetters } from 'vuex'
import {
    getProductList
}from '@/utils/api'
export default{
    data(){
        return{
            diaTitle:'批量修改',
            dialogTableVisible:false,
            isBatch:true, 
            editData:{
                condition:1,
                costPrice:1,
                productType:'',
                costNum:'',
            },
            conditions:[
                {name:'按条件查询',value:1},
                {name:'按当前页',value:2},
                {name:'按勾选条件',value:3},
            ],
            ruleForm:{
                costNum:[
                    {required: true, message: '请输入修改值', trigger: 'blur'}
                ]
            },
            //商品成本
            goodCost:[
                {label:'不更改',value:0},
                {label:'固定值=',value:1},
                {label:'商品原价+',value:2},
                {label:'商品原价*',value:3},
                {label:'商品成本+',value:4},
                {label:'商品成本*',value:5},
            ],
            //商品类型
            goodType:[],
            queryData:{},
            pager:{
                page:1,
                rows:20
            },
            searchFrom:[
                {
                    label:'商品编码:',
                    type:'textarea',
                    search:'in',
                    split:/[\n\r]/,
                    value:'goodsBn',
                    clear:true,
                    placeholder:'请输入商品编码，多个编码换行',
                    style:'width:250px'
                },
                {
                    label:'商品规格编码:',
                    type:'textarea',
                    search:'in',
                    split:/[\n\r]/,
                    value:'productBn',
                    clear:true,
                    placeholder:'请输入商品规格编码，多个编码换行',
                    style:'width:250px'
                },
                {
                    type:'textarea',
                    search:'in',
                    split:/[\n\r]/,
                    value:'productName',
                    label:'商品名称:',
                    clear:true,
                    placeholder:'请输入商品名称，多个名称换行',
                    style:'width:250px'
                },

                {
                    type:'select',
                    value:'productType',
                    search:'eq',
                    label:'商品类型',
                    placeholder:'请选择',
                    selectFrom:[]
                },
                {
                    type:'date',
                    name:'createTime',
                    search:'between',
                    label:'创建时间',
                },
                {
                    type:'btn',
                    btntxt:'搜索',
                    btnType:'primary',
                    value:'search'
                },
                {
                    type:'btn',
                    btntxt:'添加',
                    btnType:'primary',
                    value:'add'
                },
                {
                    type:'btn',
                    btntxt:'重置条件',
                    btnType:'primary',
                    value:'reset'
                },
         
            ],
            
            tableData:[],
            columnData:[
                {
                    prop:'goodsBn',
                    label:'商品编码',
                },
                {
                    prop:'productBn',
                    label:'商品规格编码',
                },
                {
                    prop:'productName',
                    label:'商品名称',
                },
                {
                    prop:'originalPrice',
                    label:'商品原价',
                },
                {
                    prop:'costPrice',
                    label:'商品成本',
                },
                {
                    prop:'priceRadio',
                    label:'成本/原价',
                },
                {
                    prop:'productType',
                    label:'商品类型',
                },
                {
                    prop:'createTime',
                    label:'创建时间',
                },
                {
                    prop:'updateTime',
                    label:'更新时间',
                },
                {
                    prop:'lastUserLogin',
                    label:'最后操作人员',
                },
            ],
            count:0,
            options:{
                selection:true,
                width:300,
                operation:[
                    {type:'primary',name:'变更日志',value:'redirect'},
                    {type:'primary',name:'编辑',value:'edit'},
                    {type:'danger',name:'删除',value:'del'}
                ]
            },
            isVisible:false,
            //表单选择数据
            selectOption:[],
            //修改条件数据
            changeEditData:[],

        }
    },
    components:{
        commonInput,
        exportDialog,
        commonTable
    },
    computed: {
        ...mapGetters([
            'getUserInfo',
        ])
      },
    created(){
        // this.getData({})
        getProductList().then(res=>{
            console.log(res)
        })
    },
    watch:{
        "dialogTableVisible":function(val){
            if(!val){
                this.editData={
                    condition:1,
                    costPrice:1,
                    productType:'',
                    costNum:'',
                }
            }
        },
        "editData.costPrice":function(val){
            if(val===0){
                this.ruleForm.costNum[0].required=false
            }
        }
    },
    methods:{
        //搜索
        search(data){
            let query=data
            this.queryData= data 
            this.pager.page=1
            this.pager.rows=20
            this.getData(query)
        },
        getData(data){
            const loading = this.$loading({
				lock: true,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
            });
            data.page=this.pager.page
            data.rows=this.pager.rows
            http.post('/warn_product/index',data,(res)=>{
                loading.close();
                this.count=res.count
                this.tableData=res.items
            }) 
        },
        //获取操作人员
        getUser(){
            const loading = this.$loading({
				lock: true,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			});
            var option = {
                page:1,
                rows:999
            }
            http.post('/User/index',option, (result) => {
                loading.close();
                result.items.forEach(item=>{
                    item.label=item.userName
                    item.value=item.userId
                })
                this.searchFrom.forEach(item=>{
                    if(item.value=='userId'){
                        item.selectFrom = result.items;  
                    } 
                }) 
            })
        },
        getProductType(){
            http.post("/warn_product/productTypeOption",{},(res)=>{
                res.forEach(item=>{
                    item.label=item.optionValue
                    item.value=item.optionLabel
                })
                let result=JSON.parse(JSON.stringify(res))
                this.searchFrom.forEach(item=>{
                    if(item.value=='productType'){
                        item.selectFrom=result
                    }
                })
                res.unshift({optionValue:'不更改',optionLabel:''})
                this.goodType=res
            })
        },
        //单个修改
        edit(data){
            this.isBatch=false
            this.dialogTableVisible=true
            this.diaTitle='单个商品修改'
            let arr=[]
            arr.push(data)
            this.changeEditData=arr
        },
        //批量修改
        batchModify(data){
            this.isBatch=true
            this.dialogTableVisible=true
            this.diaTitle='批量修改'
            this.changeCondition(0)
        },
        //切换修改条件
        changeCondition(val){
            let condition=this.editData.condition
            let data=JSON.parse(JSON.stringify(this.queryData)) 
            if(condition===1){
                data.page=1
                data.rows=9999
                this.getProductCost(data)
            }else if(condition===2){
                data.page=this.pager.page
                data.rows=this.pager.rows
                this.getProductCost(data)
            }else{
                if(this.selectOption.length<=0){
                    this.$message.error("请至少选择一个条件")
                    this.editData.condition=1
                    return
                }else{
                    this.changeEditData=this.selectOption
                }
            }
        },
        //获取修改数据
        getProductCost(data){
            http.post('/warn_product/index',data,(res)=>{
                this.changeEditData=res.items              
            })
        },
        //确认修改
        change(formName){
            let changeEditData=this.changeEditData
            let editData=this.editData
            if(!editData.costPrice && !editData.productType){
                this.dialogTableVisible=false
                return
            }
            this.$refs[formName].validate((valid)=>{
                if(valid){
                    let data=[]
                    changeEditData.forEach(item=>{
                        let obj={}
                        let costPrice = 0;
                        let costNum = Number(editData.costNum);
                        switch (editData.costPrice){
                            case 0:
                                costPrice=item.costPrice
                                break;
                            case 1:
                                costPrice=costNum
                                break;
                            case 2:
                                costPrice=Number(item.originalPrice) + costNum
                                break;
                            case 3:
                                costPrice=Number(item.originalPrice) * costNum
                                break;
                            case 4:
                                costPrice=Number(item.costPrice) + costNum
                                break;
                            case 5:
                                costPrice=Number(item.costPrice) * costNum
                                break;
                        }
                        obj.costPrice=costPrice
                        obj.originalPrice=item.originalPrice
                        editData.productType?obj.productType=editData.productType:delete obj.productType
                        obj.warnProductId=item.warnProductId
                        data.push(obj)
                    })
                    const loading = this.$loading({
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    http.post("/warn_product/edit",data,(res)=>{
                        loading.close()
                        if(res){
                            this.$message({
                                message:'修改成功',
                                type:'success'
                            })
                            this.dialogTableVisible=false
                            this.getData({})
                        }
                    })
                }else{
                    return false
                }
            })
        },
        closeDia(formName){
            this.dialogTableVisible=false
            this.$refs[formName].resetFields();
        },
        // 跳转变更日志
        redirect(data){
            this.$router.push({
                path:'/ChangeLog',
                query:{
                    productBn:data.productBn
                }
            })
        },
        //选择
        select(data){
            this.selectOption=data
        },
        //删除
        del(data,type){
            //批量删除
            if(type=='all' && this.selectOption.length<=0){
                this.$message.error("请至少选择一个条件")
                return
            }
            this.$confirm('删除后数据无法恢复，请确认是否执行该操作','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let ids=[]
                if(type=='all'){
                    this.selectOption.forEach(item=>{
                        ids.push(item.warnProductId)
                    })
                }else{
                    ids[0]=data.warnProductId
                }

                let query={
                    warn_product_id:['in',ids]
                }
                http.post("/warn_product/remove",query,res=>{
                    if(res){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getData({})
                    }
                })
                
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });
            })
        },

        //导出
        exportReport(val){
            this.isVisible=true
        },
        
        //分页页码
        currentChange(val){
            this.pager.page=val
            this.getData(this.queryData)
        },
        //页数
        sizeChange(val){
            this.pager.rows=val
            this.getData(this.queryData)
        }
    }
}