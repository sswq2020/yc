<template>
  <el-dialog :title="title" :visible="visible" width="600px" @close="cancle()">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-position="right" label-width="150px" class="form">
      <el-form-item label="生产商名称:" prop="producerName">
        <el-input v-model="form.producerName" size="small"></el-input>
      </el-form-item>
      <el-form-item label="备注:" prop="remark">
        <el-input type="textarea" v-model="form.remark" size="small"></el-input>
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
  producerName: null, // 生产商名称
  remark: null, // 备注
};

export default {
  name: "manufactureformModal",
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
    manufactureObj: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      form: { ...defaultForm },
      rules: {
        producerName: [{ required: true, message: '请输入生产商', trigger: 'blur' },
                    { max: 50, message: '最多50个字符', trigger: 'blur' }],
        remark: [{ max: 500, message: '最多500个字符', trigger: 'blur'}]
      }
    };
  },
  computed: {
    ...mapState("modal", ["visible"]),
    title() {
      return this.isEdit ? "编辑生产商" : "新增生产商";
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
        this.form = this.isEdit ? { ...this.manufactureObj } : { ...defaultForm };
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
