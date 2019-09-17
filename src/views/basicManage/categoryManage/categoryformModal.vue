<template>
  <el-dialog :title="title" :visible="visible" width="600px" @close="cancle()">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-position="right" label-width="150px">
      <el-form-item label="品类名称:" prop="categoryName">
        <el-input v-model="form.categoryName"></el-input>
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
    categoryObj: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      form: { ...defaultForm },
      rules: {
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
    confirm() {
      let that = this;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          that.confirmCb({ ...that.form });
        } else {
          console.log("error submit!!");
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
