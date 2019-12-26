<template>
  <el-dialog :title="title" :visible="visible" width="605px" @close="cancle()" class="dialog-form">
    <el-form :model="form" ref="ruleForm" label-position="right" label-width="140px" class="form">
      <el-form-item 
        label="大类:" 
        prop="productTypeCode"  
        :rules="[{ required: true, message: '请选择大类', trigger: 'blur' }]">
        <el-select v-model="form.productTypeCode" placeholder="请选择" size="small" :disabled="isEdit">
          <el-option
            v-for="(item,index) in productTypes"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item 
        label="品类名称:" 
        prop="categoryId"
        :rules="[{ required: true, message: '请选择品类', trigger: 'blur' }]"
        >
        <el-select v-model="form.categoryId" placeholder="请选择" size="small">
          <el-option
            v-for="(item,index) in selectList"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item 
        label="规格/牌号:" 
        prop="brandName"
        :rules="[{ required: true, message: '请输入牌号', trigger: 'blur' }]">
        <el-input v-model="form.brandName" size="small"></el-input>
      </el-form-item>

      <el-form-item 
        v-if="form.productTypeCode === Dict.PRODUCT_OIL"
        label="排放标准(限石化):" 
        prop="emissionStandard"
        :rules="[{ required: true, message: '必填', trigger: 'blur' }]"
        >
        <el-input v-model="form.emissionStandard" size="small"></el-input>
      </el-form-item>

      <el-form-item label="备注:" prop="remark">
        <el-input type="textarea"  v-model="form.remark" size="small" placeholder="请输入" maxlength="100" ></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle" size="small">取消</el-button>
      <el-button type="primary" @click="confirm" :loading="loading" size="small">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import {findLabelByValue} from "common/util";
import { _toArray_ } from "common/util.js";
import Dict from "@/util/dict.js";
const defaultForm = {
  productTypeCode:null, // 默认石化
  emissionStandard:null, // 排放标准
  categoryId: null,
  brandName: null, // 牌号名称
  remark:null
};

export default {
  name: "trademarkformModal",
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    confirmCb: {
      type: Function,
      default: () => {}
    },
    trademarkObj: {
      type: Object,
      default: () => {}
    },
    productTypes:{
      type: Array,
      default: () => []    
    },    
    list:{
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      Dict,
      form: { ...defaultForm },
      /**品类下拉数据源有2种情况,这是内部自己处理的*/       
      innerselectList:[],
      ExternalTrigger:false,
    };
  },
  computed: {
    ...mapState("modal", ["visible"]),
    title() {
      return this.isEdit ? "编辑牌号" : "新增牌号";
    },
    selectList(){
      return this.isEdit ? this.list : this.innerselectList
    }
  },
  methods: {
    ...mapMutations("modal", ["SET_MODAL_VISIBLE"]),
    cancle() {
      this.SET_MODAL_VISIBLE(false);
    },
    confirm() {
      let that = this;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const params = Object.assign({}, that.form, {
            categoryName: findLabelByValue(that.selectList, that.form.categoryId),
            productTypeText: Dict.PRODUCT_CATEGORY[that.form.productTypeCode]
          });
          that.confirmCb(params);
        } else {
          return false;
        }
      });
    },
    async _getCategorySelectList(productTypeCode) {
      const res = await this.$api.getCategorySelectList(productTypeCode);
      switch (res.code) {
        case Dict.SUCCESS:
          this.innerselectList = _toArray_(res.data);
          break;
        default:
          this.$messageError(res.mesg);
          break;
      }
    },
  },
  watch: {
    visible(newV) {
      if (newV) {
        this.form = this.isEdit ? { ...this.trademarkObj } : { ...defaultForm };
      } else {
        this.$refs.ruleForm.clearValidate();
      }
    },
    'form.productTypeCode':{
      handler(newV,oldV){
        // 如果是编辑状态,不需要处理
        if(this.isEdit) {return}
        if(!newV) {return}
        if(newV !== oldV){
          this.innerselectList = [];
          setTimeout(()=>{
             this._getCategorySelectList(newV)
          },50)
        }
      }
    }

  }
};
</script>
<style scoped lang="less">
</style>
