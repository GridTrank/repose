<template>
    <div class="article-wrap">
        <div class="article">
            <div class="article-left">
                <el-form :data="formData">
                    <el-form-item>
                        <p class="f-t">主题</p>
                        <el-select v-model="formData.zhuti">
                            <el-option value="1" label="主题1"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <p class="f-t">分类</p>
                        <el-select v-model="formData.zhuti">
                            <el-option value="1" label="主题1"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <p class="f-t">附件</p>
                        <el-upload
                            action="#"
                            :file-list="fileList"
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
                            v-for="(btn,bIndex) in labels" :key="bIndex">
                                {{btn.name}} 
                            </div>
                        </div>
                        <el-input v-model="formData.otherLabel" placeholder="自定义标签，多个标签之间以空格分隔…"></el-input>
                        <!-- <el-select 
                        v-model="formData.knowledge" clearable multiple filterable allow-create default-first-option placeholder="自定义标签，多个标签之间以空格分隔…">
                            <el-option v-for="item in customLabels" :key="item.value" :label="item.name" :value="item.value"></el-option>
                        </el-select> -->
                    </el-form-item>

                    <el-form-item>
                        <p class="f-t">摘要</p>
                        <el-input type="textarea"></el-input>
                    </el-form-item>

                    <el-form-item class="cover">
                        <p class="f-t">封面(非必填)</p>
                        <el-upload
                            action="#"
                            list-type="picture-card"
                        >   
                            <i class="el-icon-plus"></i>

                        </el-upload>
                        <el-button class="s-btn">从文中选择封面图</el-button>
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
                        v-model="content"
                        :options="editorOption"
                        class='editor'
                        /> 
                </div>
            </div>
        </div>
        <div class="foot-btns">
            <div class="f-btn bg1">
                存为草稿
            </div>
            <div class="f-btn bg2">
                发布
            </div>
        </div>
    </div>
</template>

<script>
import Quill from "quill";
let Parchment = Quill.import("parchment");
class lineHeightAttributor extends Parchment.Attributor.Style {}
const lineHeightStyle = new lineHeightAttributor("lineHeight", "line-height", {
  scope: Parchment.Scope.INLINE,
  whitelist: ["initial", '1', '1.5', '1.75', '2', '3', '4', '5' ]
});
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
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
    data(){
        return{
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
            selectBtn:0,
            customLabels:[],
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
                                    this.quill.format('lineHeight', value);
                                } else {
                                    console.log(value);
                                }
                            },
                            // 重写引用
                            blockquote:(val)=>{
                                this.$store.commit('updateShowQuote',true)
                                // let str="<a class='tes'>引用的</a>"
                                // document.execCommand('insertText', true, str)
                            }
                        }
                    }
                },
                //主题
                theme: "snow",
                placeholder: "请输入正文"
            }
        }
    },
    computed: {
        showQuote(){
            return this.$store.state.common.showQuote
        },
    },
    methods:{
        selectLabel(data){
            data.isSelect=!data.isSelect
            if(data.isSelect && this.selectLabels.indexOf(data.value)==-1){
                this.selectLabels.push(data.value)
            }
            if(!data.isSelect && this.selectLabels.indexOf(data.value)!==-1){
                this.selectLabels.splice(this.selectLabels.indexOf(data.value),1)
            }
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
        .cover{
            /deep/.el-upload{
                width: 150px;
            } 
            .s-btn{
                float: right;
                margin-right: 200px;
                margin-top: -50px
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