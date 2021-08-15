<template>
    <div class="article-wrap" >
        <div class="article">
            <div class="article-left">
                <el-form :data="formData">
                    <el-form-item>
                        <p class="f-t">主题</p>
                        <el-select v-model="formData.tid">
                            <el-option 
                                v-for="(item,index) in initDetail.topicalList"
                                :key="index"
                                :value="item.id" 
                                :label="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <p class="f-t">附件</p>
                        <el-upload
                            :action="domain+'/yifangPC/upload/file'" 
                            :file-list="fileList"
                            :multiple="true"
                            :headers="headers"
                            name="files"
                            :on-success="updateSuccess"
                            :on-remove="removeFile"
                        >
                            <el-button >
                                <i class="el-icon-upload"></i>
                                上传附件
                            </el-button>
                        </el-upload>
                    </el-form-item>

                    <el-form-item>
                        <p class="f-t">标签(非必填)</p>
                        <div class="label-wrap">
                            <div 
                            class="label-btn" 
                            :class="btn.isSelect && 'select-btn'"
                            @click="selectLabel(btn)" 
                            v-for="(btn,bIndex) in initDetail.hottags" :key="bIndex">
                                {{btn.name}} 
                            </div>
                        </div>
                        <el-select 
                            class="more-label"
                            v-model="moreLabel" 
                            multiple 
                            filterable 
                            allow-create 
                            :popper-append-to-body="false"
                            default-first-option 
                            @change="changeLabel"
                            placeholder="自定义标签，按回车键确认">
                            <el-option v-for="(item,index) in moreLabel_" :key="index" :label="item" :value="item"></el-option>
                        </el-select>

                    </el-form-item>

                    <el-form-item>
                        <p class="f-t">摘要</p>
                        <el-input type="textarea" v-model="formData.description"></el-input>
                    </el-form-item>

                    <el-form-item class="cover">
                        <p class="f-t">封面(非必填)</p>
                        <div class="img-wrap">
                            <el-upload
                                :action="domain+'/yifangPC/upload'" 
                                class="upload-demo"
                                :headers="headers"
                                name="files"
                                list-type="picture-card"
                                ref="imgUpload"
                                :file-list="imageList"
                                :on-success="updateSuccessImg"
                                :on-remove="removeImg"
                                :on-change="HFhandleChangeImg"
                            >   
                                <i class="el-icon-plus"></i>
                            </el-upload>
                           
                        </div>
                        
                        <el-button class="s-btn" v-if="hasImage" @click="dialogChooseImage=true">从文中选择封面图</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="article-right">
                <div class="r-top">
                    <el-input class="tit-input" v-model="formData.title" placeholder="请输入标题"></el-input>
                </div>
                <quill-editor
                    ref="myQuillEditor"
                    v-model="formData.content"
                    :options="editorOption"
                    class='editor'
                /> 

                <el-upload 
                    class="quill-upload"
                    :action="domain+'/yifangPC/upload'" 
                    :headers="headers"
                    name="files"
                    id="upload" 
                    multiple
                    :on-success="quillUploadImage"
                    :on-change="quillChangeImage"
                    style="display:none;" 
                ></el-upload>
            </div>
        </div>
        <div class="foot-btns">
            <div class="f-btn bg1" @click="submit(0)" v-if="initDetail.status!==1">
                存为草稿
            </div>
            <div class="f-btn bg2" @click="submit(1)">
                发布
            </div>
        </div>
        
        <!-- 选取图片弹窗 -->
        <el-dialog
            title="选择图片"
            :visible="dialogChooseImage" 
            width="50%"
        >
            <div class="image-wrap">
                <div class="image-item" 
                    v-for="(item,index) in contentImage" 
                    @click="chooseImage(item,index)"
                    
                    :key="index">
                    <img :class="selectImageIndex==index && 'select-image'"  :src="item" >
                </div>
                
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogChooseImage = false">取 消</el-button>
                <el-button type="primary" @click="selectImage">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import { Message,Loading  } from 'element-ui';
import config from '@/utils/config.js'
import http from '@/utils/httpUtil'
import Quill from "quill";
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";
Quill.register('modules/ImageExtend', ImageExtend)

let Inline = Quill.import('blots/inline');
let Parchment = Quill.import("parchment");
class lineHeightAttributor extends Parchment.Attributor.Style {}
const lineHeightStyle = new lineHeightAttributor("lineHeight", "line-height", {
  scope: Parchment.Scope.INLINE,
  whitelist: ["initial", '1', '1.5', '1.75', '2', '3', '4', '5' ]
});
Quill.register({'formats/lineHeight':lineHeightStyle},true);
class LinkBlot extends Inline {
  static create(data) {
    let node = super.create();
    node.setAttribute("onclick", `javascript:window.open("${data.url}");` );
    node.setAttribute('href', data.url);
    node.setAttribute('target', '_blank');
	node.innerHTML = data.value
    return node;
  }
  static formats(node) {
    return node.getAttribute('href');
  }
}
LinkBlot.blotName = 'link';
LinkBlot.tagName = 'a';
Quill.register(LinkBlot);

const toolbarOptions = [
  ["bold", "italic", "underline",],
  [{ 'size': ["13px","14px","15px","18px","20px","24px","48px"] }],
  [{ color: [] }], // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
  [{ align: 'justify' },{ align: 'center' },{ align: 'right' }], // 对齐方式-----[{ align: [] }]

  [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]

  [{ lineheight: [ '1.5', '1.75', '2', '3', '4', '5'] }],

  ["blockquote"], // 引用  
  ["image"] // 链接、图片、视频

]
export default {
    components:{quillEditor},
    props:{
        setTitle:String,
        type:String,
        initDetail:Object
    },

    data(){
        return{
            domain:config.Domain,
            formData:{},
            fileList:[],
            labels:[
                {
                    name:'标签1',
                    value:1,
                    isSelect:0,
                },
                {
                    name:'标签1',
                    value:2,
                    isSelect:0,
                },
                {
                    name:'标签1',
                    value:3,
                    isSelect:0,
                },
                {
                    name:'标签1',
                    value:4,
                    isSelect:0,
                },
                {
                    name:'标签1',
                    value:5,
                    isSelect:0,
                },
                {
                    name:'标签1',
                    value:6,
                    isSelect:0,
                },
                {
                    name:'标签1',
                    value:7,
                    isSelect:0,
                },
                {
                    name:'标签1',
                    value:8,
                    isSelect:0,
                },
                {
                    name:'标签1',
                    value:9,
                    isSelect:0,
                },
                {
                    name:'标签1',
                    value:10,
                    isSelect:0,
                },
            ],
            moreLabel:[],
            moreLabel_:[],
            selectBtn:0,
            content:'',
            editorOption:{
                modules: {
                    toolbar: {
                        container:toolbarOptions,
                        handlers: {
                            lineheight:  (value)=> {
                                if (value) {
                                    this.editor.format('lineHeight', value);
                                } else {
                                    console.log(value);
                                }
                            },
                            // 重写引用
                            blockquote:(val)=>{
                                this.$store.commit('updateShowQuote',true)
                            },
                            image:(value)=>{
                                if (value) {
                                    // upload点击上传事件
                                    document.querySelector('.quill-upload input').click()
                                } else {
                                    this.quill.format('image', false)
                                }

                            }
                        }
                    }
                },
                //主题
                theme: "snow",
                placeholder: "请输入正文"
            },
            uploadData:{},
            imageList:[],
            initSelectTags:[],
            hasImage:false,
            contentImage:[],
            chooseImageSrc:'',
            dialogChooseImage:false,
            selectImageIndex:0
        }
    },
    computed: {
        showQuote(){
            return this.$store.state.common.showQuote
        },
        editor(){
            return this.$refs.myQuillEditor.quill
        },
        headers() {
            return {
                Authorization: localStorage.getItem("authorization") || ''
            };
        },
    },
    watch:{
        imageList:(val)=>{
            if(val.length>0){
                document.getElementsByClassName("el-upload--picture-card")[0].style.display='none'
            }
        }
    },
    created(){
        this.init() 
    },
    methods:{
        init(){
            this.formData=this.initDetail.info  
            let initTag=[]
            this.initDetail.hottags.forEach(item=>{
                initTag.push(item.name)  
            })
            // 处理标签
            this.formData.tags.forEach(item=>{
                if(initTag.indexOf(item)==-1){
                    this.moreLabel.push(item)
                    this.moreLabel_.push(item)
                }
                this.initDetail.hottags.forEach(el=>{
                    if(item==el.name){
                        el.isSelect=1
                        // 获取热门标签中已选择的标签
                        this.initSelectTags.push(el.name)
                    }
                })
            })

            // 有附件时
            this.formData.files.forEach(item=>{
                this.fileList.push({
                    name:item.original,
                    url:item.url
                })
            })
            // 有封面时
            if(this.formData.image){
                this.imageList.push({
                    name:'11',
                    url:this.formData.image
                })
            }
            // 是否有图片
            
            if(this.formData.content && this.formData.content.indexOf('img')!=-1){
                this.hasImage=true
                var reg = /(?<=(src="))[^"]*?(?=")/ig;
                var allSrc = this.formData.content.match(reg);
                for(var i = 0; i<allSrc.length;i++){
                    this.contentImage.push(allSrc[i])
                }
            }
        },
        // 附件上传
        updateSuccess(res,file){
            if(res.code==200){
                this.formData.files.push(res.data.aid)
            }else{
                this.$message.error(res.message)
                this.fileList=[]
                this.formData.files=[]
            }
        },
        // 附件移出
        removeFile(res){
            if(res.status=='success'){
                this.fileList=[]
                this.formData.files=[]
            }
        },
        // 封面上传
        updateSuccessImg(res,file){
            document.getElementsByClassName("el-upload-list--picture-card")[0].style.display='block'
            if(res.code==200){
                document.getElementsByClassName("el-upload--picture-card")[0].style.display='none'
                this.formData.aid=res.data.aid
                this.formData.image=res.data.url
            }else{
                document.getElementsByClassName("el-upload-list--picture-card")[0].style.display='none'
                this.$message.error(res.message)
                this.imageList=[]
            }
        },
        // 封面移除
        removeImg(res,file){
            if(res.status=='success'){
                document.getElementsByClassName("el-upload--picture-card")[0].style.display='block'
                this.imageList=[]
            }
        },  
        // 监听封面上传
        HFhandleChangeImg(file, fileList) {
            if (fileList.length > 0) {
                this.imageList = [fileList[fileList.length - 1]]; 
            }
        },
        // 富文本上传图片
        quillUploadImage(res){
            var data = res.data
            let quill = this.editor
            if (res.code==200) {
                let length = quill.getSelection().index
                quill.insertEmbed(length, 'image',  data.url)
                quill.setSelection(length + 1)
            } else {
                this.$message.error(res.message)
            }
        },
        // 监听富文本上传图片
        quillChangeImage(res){
             const loading =  Loading.service({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
                fullscreen: true,
            });
            if(res.response && res.response.code==200){
                loading.close()
            }
        },
        // 改变标签输入框数据
        changeLabel(val){
            val.forEach((el,index)=>{
                this.initDetail.hottags.forEach((i)=>{
                    if(el==i.name){
                        val.splice(index,1)
                    }
                }) 
            })
            this.moreLabel=val
        },
        // 选择标签
        selectLabel(data){
            data.isSelect=!data.isSelect
            // 热门标签选中
            if(data.isSelect && this.initSelectTags.indexOf(data.name)==-1){
                this.initSelectTags.push(data.name)
            }
            if(!data.isSelect && this.initSelectTags.indexOf(data.name)!==-1){
                this.initSelectTags.splice(this.initSelectTags.indexOf(data.name),1)
            }
        },
        // 选择图片
        chooseImage(item,index){
            this.chooseImageSrc=item
            this.selectImageIndex=index
        },
        // 选中
        selectImage(){
            console.log(this.imageList)
            this.imageList[0].url=this.chooseImageSrc
            this.formData.image=this.chooseImageSrc
            this.dialogChooseImage=false
        },
        submit(status){
            let tags=this.moreLabel.concat(this.initSelectTags)
            let data={
                status,
                token:this.initDetail.token,
                info:{
                    ...this.formData,
                    tags
                }
            }
            console.log(data)
            http.post("/yifangPC/publish/submit",data,(res=>{
                if(res.code==200){
                    this.$message({
                        message:status==1?'发布成功':'保存成功',
                        type:'success'
                    })
                    setTimeout(()=>{
                        if(status==1){
                            this.$router.push('/MyArticles')
                        }else if(status==0){
                            this.$router.push('/Drafts')
                        }
                        
                    },1000)
                }
            }))
        },
    }
}
</script>

<style  lang="less" >
.article-wrap{
    display: flex;
    flex-direction: column;
    
}
.article{
    display: flex;
    justify-content: space-between;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    border-bottom: none;
    .article-left{
        width: 46%;
        background-color: #fff;
        padding: 30px;
        .el-select{
            width: 100%;
        }
        /deep/.el-upload{
            width: 100%;
            .el-button{
                width: 100%;
            }
        }
        .more-label{
            /deep/.is-multiple{
                display: none;
            }
            /deep/.el-select .el-input .el-select__caret.is-reverse{
                    display: none;
            }
            /deep/.el-input__icon:after{
                 display: none;
            }
            /deep/.el-icon-arrow-up:before{
                display: none;
            }
            .el-select .el-input .el-select__caret{
                display: none;
            }
        }
        
        .cover{
            /deep/.el-upload{
                width: 150px;
            } 
            .s-btn{
                float: right;
                margin-right: 400px;
                margin-top: -50px
            }
            .img-wrap{
                display: flex;
                height: 150px;
                .fengmian{
                    width: 150px;
                    height: 150px;
                    margin-right:10px;
                    border-radius: 6px;
                }
                .noshow{
                    display: none !important;
                }
                .upload-demo {
                    display: flex;
                }
                /deep/ .el-list-enter-active,
                /deep/ .el-list-leave-active {
                    transition: none;
                }
            
                /deep/ .el-list-enter,
                /deep/ .el-list-leave-active {
                    opacity: 0;
                }
                /deep/ .el-upload-list {
                    height: 40px;
                }

            }
            
        }
        
        .label-wrap{
            display: flex;
            flex-wrap: wrap;
            .label-btn{
                width: 110px;
                margin-right: 20px;
                margin-bottom: 10px;
                border: 1px solid #ddd;
                border-radius: 12px;
                text-align: center;
                cursor: pointer;
            }
            .select-btn{
                border-color: #26d79f;
                color: #26d79f;
            }
        }
    }
    .article-right{
        width: 48%;
        background: #fff;
        .r-top{
            height: 100px;
            background: #fff;
            .tit-input{
                .el-input__inner{
                    border: none;
                }
            }
        }
    }
}
.foot-btns{
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    height: 100px;
    background: #fff;
    border:1px solid #ccc;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    margin-top: -10px;
    justify-content: flex-end;
    .f-btn{
        margin-right: 30px;
        width: 150px;
        height: 40px;
        line-height: 40px;
        border-radius: 24px;
        text-align: center;
        color: #fff;
        font-size: 18px;
        cursor: pointer;
    }
    .bg1{
        background-color: #26d79f;
    }
    .bg2{
        background-color: #000;
    }
}
.image-wrap{
    max-height: 800px;
    overflow-y: scroll;
    &::-webkit-scrollbar { width: 0 !important }
    .image-item{
        display: inline-block;
        padding: 10px;
        width: 200px;
        height: 200px;
        cursor: pointer;
        img{
            border-radius: 12px;
            display: block;
            width: 100%;
            height: 100%;
            
        }
    }
    .select-image{
        border:1px solid #26d79f;
    }  
}
.editor {
  line-height: normal !important;
  min-height: 400px;
  background-color: #fff;
  border: none;
  max-height: 700px;
overflow-y: scroll;

  .ql-toolbar.ql-snow{
    background-color: #f8f8f8;
  }
  .ql-toolbar.ql-snow,.ql-container.ql-snow{
    border: none;
  }
  
  .ql-editor{
    min-height: 500px;
  }
 
}
//配置编辑器行高
.ql-snow .ql-picker.ql-lineheight .ql-picker-label::before {
  content: '行高';
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value='initial']::before {
  content: '默认';
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value='1']::before {
  content: '1';
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value='1.5']::before {
  content: '1.5';
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value='1.75']::before {
  content: '1.75';
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value='2']::before {
  content: '2';
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value='3']::before {
  content: '3';
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value='4']::before {
  content: '4';
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value='5']::before {
  content: '5';
}
.ql-snow .ql-picker.ql-lineheight {
  width: 70px;
}

</style>