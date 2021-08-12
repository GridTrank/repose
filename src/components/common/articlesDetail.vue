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
                            clearable 
                            multiple 
                            filterable 
                            allow-create 
                            :popper-append-to-body="false"
                            default-first-option 
                            @change="changeLabel"
                            placeholder="自定义标签，按回车键确认">
                            <el-option v-for="item in moreLabel_" :key="item.value" :label="item.label" :value="item.label"></el-option>
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
                                :limit="1"
                                ref="imgUpload"
                                :file-list="imageList"
                                :on-success="updateSuccessImg"
                                :on-change="HFhandleChangeImg"
                            >   
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </div>
                        
                        <!-- <el-button class="s-btn" >从文中选择封面图</el-button> -->
                    </el-form-item>
                </el-form>
            </div>
            <div class="article-right">
                <div class="r-top">
                    <el-input class="tit-input" v-model="formData.title" placeholder="请输入标题"></el-input>
                </div>
                <div>
                    <quill-editor
                        ref="myQuillEditor"
                        v-model="formData.content"
                        :options="editorOption"
                        class='editor'
                        @blur="onEditorBlur($event)"
                        @focus="onEditorFocus($event)"
                        @ready="onEditorReady($event)"
                        /> 
                </div>
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
    </div>
</template>

<script>
import config from '@/utils/config.js'
import http from '@/utils/httpUtil'
import Quill from "quill";
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
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
  ["link"] // 链接、图片、视频

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
            customLabels:[],
            knowledge: [
                { label: "知识点1" },
                { label: "知识点2" },
                { label: "知识点3" }
            ],
            selectLabels:[],
            content:'',
            editorOption:{
                modules: {
                    //工具栏定义的
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
                            }
                        }
                    }
                },
                //主题
                theme: "snow",
                placeholder: "请输入正文"
            },
            uploadData:{},
            disabled:false,
            imageList:[],
            dialogVisible:false,
            dialogImageUrl:'',
            noshow:false
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
    created(){
        this.init() 
    },

    mounted(){
    },
    methods:{
        init(){
            this.formData=this.initDetail.info  
            this.formData.tags.forEach(item=>{
                this.initDetail.hottags.forEach(el=>{
                    if(item==el.name){
                        el.isSelect=1
                    }
                })
            })
            this.formData.files.forEach(item=>{
                this.fileList.push({
                    name:item.original,
                    url:item.url
                })
            })
            if(this.formData.image){
                this.imageList.push({
                    name:'11',
                    url:this.formData.image
                })
            }
            

        },
        updateSuccess(res,file){
            this.formData.files.push(res.data.aid)
        },
        updateSuccessImg(res,file){
            this.formData.aid=res.data.aid
            this.formData.image=res.data.url

        },
        HFhandleChangeImg(file, fileList) {
            if (fileList.length > 0) {
                this.imageList = [fileList[fileList.length - 1]]; // 这一步，是 展示最后一次选择的csv文件
            }
        },

        change(value){
            this.editor.format('link', {value:value,url:'http://www.baidu.com'});
        },
        changeLabel(val){
            val.forEach((el,index)=>{
                if(this.formData.tags.indexOf(el)!==-1){
                    val.splice(index,1)
                }
            })
            this.moreLabel=val
        },
        handleRemove(file) {
            this.$refs.imgUpload.clearFiles()
            this.noshow=false
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        selectLabel(data){
            data.isSelect=!data.isSelect
            if(data.isSelect && this.selectLabels.indexOf(data.name)==-1){
                this.selectLabels.push(data.name)
            }
            if(!data.isSelect && this.selectLabels.indexOf(data.name)!==-1){
                this.selectLabels.splice(this.selectLabels.indexOf(data.name),1)
            }
            this.formData.tags=this.selectLabels

        },
        // inputBlur(){
        //     this.formData.tag=this.formData.tag.concat(this.moreLabel.split(' '))
        // },
        submit(status){
            let tags=JSON.parse(JSON.stringify(this.formData.tags))
            this.moreLabel.forEach(el=>{
                if(tags.length>0){
                    if(tags.indexOf(el)==-1){
                        tags.push(el)
                    }
                }else{
                    tags.push(el) 
                }
            })

            let data={
                status,
                token:this.initDetail.token,
                info:{
                    ...this.formData,
                    tags
                }
            }
            console.log( data)
            http.post("/yifangPC/publish/submit",data,(res=>{
                console.log(res)
                if(res.code==200){
                    this.$message({
                        message:'发布成功',
                        type:'success'
                    })
                    setTimeout(()=>{
                        this.$router.push('/MyArticles')
                    },1000)
                }
            }))
        },
        onEditorBlur(){
        },
        onEditorFocus(){
        },
        onEditorReady(){
        }
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
                margin-right: 200px;
                margin-top: -50px
            }
            .img-wrap{
                display: flex;
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
.disabled .el-upload--picture-card {
    display: none;
}
</style>