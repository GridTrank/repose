<template>
  <div class="warnlist-wrap main-warp">
        <commonInput 
        :searchFrom="searchFrom" 
        @batchModify="batchModify"
        @exportReport="exportReport"
        @search="search"
        @del="del"
        :from="'warnList'"
        ></commonInput>
        <!-- 表格 -->

        <commonTable 
        :tableData="tableData" 
        :count="count" 
        :columnData="columnData"
        :options="options"
        @edit="edit"
        @currentChange="currentChange"
        @sizeChange="sizeChange"
        @redirect="redirect"
        @select="select"
        @del="del"
        ></commonTable>

        <!-- 修改弹窗 -->
        <el-dialog :title="diaTitle" :visible.sync="dialogTableVisible" width="40%">
            <el-form :model="editData" :rules="ruleForm" ref="ruleForm">
              <el-form-item label="修改条件" v-if="isBatch" label-width="200px">
                  <el-radio-group v-model="editData.condition" @change="changeCondition">
                    <el-radio v-for="(ra,ri) in conditions" :key="ri" :label="ra.value">{{ra.name}}</el-radio>
                  </el-radio-group>
              </el-form-item>
              <el-form-item label="商品条码" v-if="!isBatch" label-width="200px">
                <span>{{changeEditData[0].productBn}}</span>
              </el-form-item>
              <el-form-item label="商品名称" v-if="!isBatch" label-width="200px">
                <span>{{changeEditData[0].productName}}</span>
              </el-form-item>
              <el-form-item label="商品成本" prop="costNum" label-width="200px">
                  <el-select v-model="editData.costPrice" >
                    <el-option v-for="(gd,gi) in goodCost" :key="gi" :label="gd.label" :value="gd.value"></el-option>
                  </el-select>
                  <el-input :disabled="editData.costPrice===0" v-model="editData.costNum" style="width:150px;"></el-input>
              </el-form-item>
              <el-form-item label="商品类型" prop="productType"  label-width="200px">
                  <el-select v-model="editData.productType" >
                    <el-option v-for="(gd,gi) in goodType" :key="gi" :label="gd.optionValue" :value="gd.optionLabel"></el-option>
                  </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="closeDia('ruleForm')">取 消</el-button>
              <el-button type="primary" @click="change('ruleForm')">确 定</el-button>
            </div>
        </el-dialog>
        
        <!-- 导出 -->
        <exportDialog 
        :isVisible.sync="isVisible" 
        :queryKey="'warnproduct_index'"
        :exportApi="'/warn_product/export'"
        :queryData="queryData" 
        :pager="pager" />
  </div>
</template>

<style lang="less" src="./index.less"></style>
<script src="./index.js"></script>