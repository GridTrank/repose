<template>
  <div class="warnlist-wrap main-warp">
        <el-form :model="formData"  label-width="100px">
          <el-form-item label="商品名称" >
            <el-input style="width:300px" v-model="formData.product_name" placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品描述" >
            <el-input type="textarea" style="width:300px" v-model="formData.product_describe" placeholder="请输入商品描述"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" >
            <el-input style="width:300px" v-model="formData.product_price" placeholder="请输入商品价格"></el-input>
          </el-form-item>
          <el-form-item label="商品库存" >
            <el-input style="width:300px" v-model="formData.stock" placeholder="请输入商品库存"></el-input>
          </el-form-item>
          <el-form-item label="是否上架" >
            <el-select v-model="formData.is_sale">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="展示类型" >
            <el-select v-model="formData.type">
              <el-option label="轮播" value="banner"></el-option>
              <el-option label="品牌甄选" value="brand"></el-option>
              <el-option label="推荐" value="recommend"></el-option>
              <el-option label="猜你喜欢" value="like"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="主图">
            <el-upload
              action="http://47.112.113.38:3000/product/productBanner"
              :file-list="fileList"
              ref="upload"
              list-type="picture-card"
              :on-preview="handleBannerPreview"
              :multiple='true'
              :on-success="fileSuccess"
              :on-remove="fileRemove"
              :before-upload="beforeUpload"
              name="imgSrc"
              :data="fileData"
              :limit="5"
            >
               <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisibleBanner">
              <img width="100%" :src="dialogImageUrlBanner" alt="">
            </el-dialog>
          </el-form-item>

          <el-form-item label="详情图">
            <el-upload
              action="http://47.112.113.38:3000/product/detailImg"
              :file-list="fileListDetail"
              ref="uploads"
              list-type="picture-card"
              :on-preview="handleBannerPreview"
              :multiple='true'
              :on-success="detailSuccess"
              :on-remove="detailRemove"
              :before-upload="detailBeforeUpload"
              name="imgSrc"
              :data="fileDetail"
              :limit="6"
            >
               <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisibleBanner">
              <img width="100%" :src="dialogImageUrlBanner" alt="">
            </el-dialog>
          </el-form-item>

        </el-form>
        <el-button type="primary" :disabled="getUserInfo.userInfo.store_id==0" @click="save">保存</el-button>
  </div> 
</template>

<style lang="less" src="./index.less"></style>
<script src="./index.js"></script>