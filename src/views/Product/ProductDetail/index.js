
import { mapActions, mapGetters } from 'vuex'
import http from '@/utils/httpUtil.js'

export default{
    data(){
        return{
            formData:{
                is_sale:'1'
            },
            pageType:this.$route.query.type,
            fileList:[],
            imgList:[],
            imgListDetail:[],
            fileListDetail:[],
            fileData:{},
            fileDetail:{},
            dialogVisibleBanner:false,
            dialogImageUrlBanner:'',
            storeList:[]
        }
    },
    components:{
       
    },
    computed: {
        ...mapGetters([
            'getUserInfo',
        ])
      },
    created(){
        let query=this.$route.query
        if(query.type=='edit'){
            this.getData(query.pid)
        }
        this.getStoreList()
    },
    watch:{
        
    },
    methods:{
        getData(pid){
            http.post('/product/detail',{pid},(res=>{
                if(res){
                    this.formData=res
                    // 主图
                    if(res.banners && res.banners.length>0){
                        res.banners.forEach(el=>{
                            this.imgList.push({
                                img_type:'banner',
                                img_src:el.split('uploads/')[1],
                                url:el
                            })
                            this.fileList.push({
                                status: "uploadings",
                                percentage: 100,
                                img_src:el.split('uploads/')[1],
                                url:el
                            })
                        })
                    }
                    // 详情
                    if(res.detail_imgs && res.detail_imgs.length>0){
                        res.detail_imgs.forEach(el=>{
                            this.imgListDetail.push({
                                img_type:'detail',
                                img_src:el.split('uploads/')[1],
                                url:el
                            })
                            this.fileListDetail.push({
                                status: "uploadings",
                                percentage: 100,
                                img_src:el.split('uploads/')[1],
                                url:el
                            })
                        })
                    }
                }
            }))
        },
        // 主图
        beforeUpload(file){
            this.fileData.img_type='banner'
        },
        fileSuccess(res,file, fileList){
            this.imgList.push(res)
        },
        fileRemove(file,fileList){
            console.log(file,fileList)
            let img=file.url
            this.fileList=fileList
            this.imgList.forEach((item,index)=>{
                if(item.url==img ){
                    this.imgList.splice(index,1)
                }
            })
        },
        handleBannerPreview(file){
            this.dialogImageUrlBanner = file.url;
            this.dialogVisibleBanner = true;
        },
        // 详情图
        detailBeforeUpload(file){
            this.fileDetail.img_type='banner'
        },
        detailSuccess(res,file, fileList){
            this.imgListDetail.push(res)
        },
        detailRemove(file,fileList){
            let img=file.url
            this.fileListDetail=fileList
            this.imgListDetail.forEach((item,index)=>{
                if(item.url==img ){
                    this.imgListDetail.splice(index,1)
                }
            })
        },
        getStoreList(){
            http.post('/store/storeList',{},(res)=>{
                if(res){
                    this.storeList=res
                }
            })
        },
        save(){
            let list=[]
            let listDetail=[]
            // 超级管理员不能添加和编辑
            let store_id=this.getUserInfo.userInfo.store_id
            let store_name=this.storeList.filter(item=>{
                return item.store_id==store_id
            })
            this.imgList.forEach(el=>{
                list.push(el.img_src)
            })
            this.imgListDetail.forEach(el=>{
                listDetail.push(el.img_src)
            })

            let data={
                ...this.formData,
                banners:list.join(','),
                detail_imgs:listDetail.join(','),
                store_id:store_id,
                store_name:store_name[0].store_name,
                product_type:this.getUserInfo.userInfo.role_level
            }

            if(this.pageType=='add'){
                http.post('/product/addProduct',data,(res)=>{
                    this.$message({
                        type: 'success',
                        message: '保存成功!'
                    });
                    this.$router.push({
                        path:'/Product/list'
                    })
                })
            }else{
                data.pid=this.$route.query.pid
                http.post('/product/editProduct',data,(res)=>{
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    });
                    this.$router.push({
                        path:'/Product/list'
                    })
                })
            }
            
            
        }
        
    }
}