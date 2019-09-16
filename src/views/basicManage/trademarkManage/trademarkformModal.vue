<template>
  <el-dialog :title="title" :visible="visible" width="600px" @close="cancle()">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-position="right" label-width="150px">
      <el-form-item label="牌号名称:" prop="brandName">
        <el-input v-model="form.brandName"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle">取 消</el-button>
      <el-button type="primary" @click="confirm" :loading="loading">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapMutations } from "vuex";
const defaultForm = {
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
    }
  },
  data() {
    return {
      form: { ...defaultForm },
      rules: {
        brandName: [{ required: true, message: '请输入牌号', trigger: 'blur' },
                    { max: 10, message: '最多10个字符', trigger: 'blur' }],
      }
    };
  },
  computed: {
    ...mapState("modal", ["visible"]),
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
          that.confirmCb({ ...that.form });
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
  },
  mounted() {
    console.log(this.visible);
  }
};
</script>
<style scoped lang="less">
</style>
