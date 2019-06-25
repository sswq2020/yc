<template>
  <el-dialog :show-close="false" :title="title" :visible="visible" width="600px">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-position="right" label-width="150px">
      <el-form-item label="手机号码" prop="mock1">
        <el-input v-model="form.mock1"></el-input>
      </el-form-item>
      <el-form-item label="货主名称" prop="shomock2tName">
        <el-input v-model="form.mock2" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="社会统一信用代码" prop="mock3">
        <el-input v-model="form.mock3" maxlength="25"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="mock4">
        <el-input v-model="form.mock4" maxlength="10"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="mock5">
        <el-input v-model="form.mock5" maxlength="30"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle">取 消</el-button>
      <el-button type="primary" @click="confirm" :loading="loading">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
const defaultForm = {
  mock1:null,
  mock2:null,
  mock3:null,
  mock4:null,
  mock5:null
}
export default {
  name: "shipperformModal",
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
    shipperObj:{
      type: Object,
      default: () => {}
    }
    
  },
  data() {
    return {
      visible:false,
      form:{...defaultForm},
      rules: {
        mock1: [{ required: true, message: "请输入账户简称", trigger: "blur" }],
        mock2: [
          { required: true, message: "请输入银行账户名", trigger: "blur" }
        ],
        mock3: [{ required: true, message: "银行账户号", trigger: "blur" }],
        mock4: [{ required: true, message: "请选择开户银行", trigger: "blur" }],
        mock5: [{ required: true, message: "开户支行/分理处", trigger: "blur" }]
      }
    };
  },
  computed: {
    title() {
      return this.isEdit ? "编辑货主" : "新增货主";
    }
  },
  methods: {
    open() {
      this.visible = true;
    },
    cancle() {
       this.visible = false;
    },
    confirm() {
      let that = this;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let parmas = JSON.parse(JSON.stringify(that.form));
          that.confirmCb(parmas);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  watch: {
    visible(newV, oldV) {
      if (newV) {
        this.form = this.isEdit ? {...this.shipperObj} : {...defaultForm}
      }else{
        this.$refs.ruleForm.clearValidate();
      }
    }
  }
};
</script>
<style scoped lang="less">
</style>
