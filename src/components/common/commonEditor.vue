<template>
    <div>
        <quill-editor
        ref="myQuillEditor"
        v-model="content"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
        @change="onEditorChange($event)"
        class='editor'
        /> 
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
    components: {
        quillEditor
    },
   computed: {
     showQuote(){
       return this.$store.state.common.showQuote
     },
   } ,
    data(){
        return{
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
    methods:{
        //失去焦点事件
        onEditorBlur(quill) {
            console.log('editor blur!', quill)
        },
        //获得焦点事件
        onEditorFocus(quill) {
            console.log('editor focus!', quill)
        },
        // 准备富文本编辑器
        onEditorReady(quill) {
            Quill.register({ 'formats/lineHeight': lineHeightStyle }, true);
        },
        //内容改变事件
        onEditorChange({ quill, html, text }) {
            this.content = html
            console.log('正文',html)

        }
    }
}
</script>

<style  lang="less">
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