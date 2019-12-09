<template>
  <el-dialog :title="title" :visible="visible" width="575px" @close="cancle()" class="dialog-form">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-position="right" label-width="110px" class="form">
      <el-form-item label="品类名称:" prop="categoryId">
        <el-select v-model="form.categoryId" placeholder="请选择" size="small" style="width:100%">
          <el-option
            v-for="(item,index) in selectList"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="牌号名称:" prop="brandName">
        <el-input v-model="form.brandName" size="small"></el-input>
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
const defaultForm = {
  categoryId: null,
  brandName: null // 牌号名称
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
    list:{
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      form: { ...defaultForm },
      rules: {
        categoryId: [
          { required: true, message: "请选择品类", trigger: "blur" }
        ],
        brandName: [
          { required: true, message: "请输入牌号", trigger: "blur" },
          { max: 10, message: "最多10个字符", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapState("modal", ["visible"]),
    selectList(){
      return this.list.slice();
    },
    title() {
      return this.isEdit ? "编辑牌号" : "新增牌号";
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
            categoryName: findLabelByValue(that.selectList, that.form.categoryId)
          });
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
        this.form = this.isEdit ? { ...this.trademarkObj } : { ...defaultForm };
      } else {
        this.$refs.ruleForm.clearValidate();
      }
    }
  }
};
</script>
<style scoped lang="less">
</style>
