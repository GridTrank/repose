<template>
    <div style="padding: 30px;">
        <div>登录日志</div>
        <editor
           :api-key="apiKey"
           :init="editConfig"
           v-model="content"
         />
         <div v-html="content"></div>
    </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
export default {
    components: {
      'editor': Editor
    },
    data() {
        return {
            content: "",
            apiKey: "fmpe10wgtn5cy4tq0quwhxd21a2mb6z7pwuf0zsut09xk039", //key值从官网注册申请来的
            editConfig: {
              height: 500, //富文本高度
              language_url: '/static/tinymce/zh_CN.js', //中文包
              language: 'zh_CN', //中文
              browser_spellcheck: true, // 拼写检查
              branding: false, // 去水印
              elementpath: true, //禁用编辑器底部的状态栏
              statusbar: false, // 隐藏编辑器底部的状态栏
              paste_data_images: true, // 是否允许粘贴图像
              menubar: false, // 显示最上方menu
              fontsize_formats: '14px 16px 18px 20px 24px 26px 28px 30px 32px 36px', //字体大小
             
              images_upload_credentials: true,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount',
              ],
              toolbar: ' bold italic underline |  fontsizeselect |forecolor | orecoloralignleft aligncenter alignright alignjustify |  numlist bullist | link lineheight',
              
            }
        }
    }
}
</script>

<style>

</style>