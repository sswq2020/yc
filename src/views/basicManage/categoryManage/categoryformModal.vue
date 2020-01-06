<template>
  <el-dialog :title="title" :visible="visible" width="575px" @close="cancle()"  class="dialog-form">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-position="right" label-width="110px" class="form">
      <el-form-item label="大类:" prop="productTypeCode">
          <el-select v-model="form.productTypeCode" placeholder="请选择" size="small" :disabled="isEdit">
            <el-option
              v-for="(item,index) in productTypes"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
      </el-form-item>      
      <el-form-item label="品类名称:" prop="categoryName">
        <el-input v-model="form.categoryName" size="small"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle"  size="small">取消</el-button>
      <el-button type="primary" @click="confirm" :loading="loading"  size="small">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Dict from "@/util/dict.js";
const defaultForm = {
  productTypeCode:null,
  categoryName: null // 品类名称
};

export default {
  name: "categoryformModal",
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
    productTypes:{
      type: Array,
      default: () => []    
    },
    categoryObj: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      form: { ...defaultForm },
      rules: {
        productTypeCode:[{ required: true, message: '请选择大类', trigger: 'blur' }],
        categoryName: [{ required: true, message: '请输入品类', trigger: 'blur' },
                    { max: 10, message: '最多10个字符', trigger: 'blur' }],
      }
    };
  },
  computed: {
    ...mapState("modal", ["visible"]),
    title() {
      return this.isEdit ? "编辑品类" : "新增品类";
    }
  },
  methods: {
    ...mapMutations("modal", ["SET_MODAL_VISIBLE"]),
    cancle() {
      this.SET_MODAL_VISIBLE(false);
    },
    _filter(){
      const params = Object.assign({},this.form,{ productTypeText: Dict.PRODUCT_CATEGORY[this.form.productTypeCode]});
      return params;      
    },
    confirm() {
      let that = this;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const params = this._filter();
          that.confirmCb(params);
        } else {
          return false;
        }
      });
    }
  },
  watch: {
    visible(newV) {
      if (newV) {
        this.form = this.isEdit ? { ...this.categoryObj } : { ...defaultForm };
      } else {
        this.$refs.ruleForm.clearValidate();
      }
    }
  }
};
</script>
<style scoped lang="less">
</style>
