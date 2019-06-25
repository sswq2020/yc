<template>
  <el-dialog :show-close="false" :title="title" :visible="visible" width="600px">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-position="right" label-width="150px">
      <el-form-item label="产地名称" prop="mock1">
        <el-input v-model="form.mock1" maxlength="10"  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="mock2">
        <el-input type="textarea"  v-model="form.mock2" :autosize="{ minRows: 5}" size="medium" placeholder="请输入" maxlength="100"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle">取 消</el-button>
      <el-button type="primary" @click="confirm" :loading="loading">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapMutations  } from 'vuex';
const defaultForm = {
  mock1: '',
  mock2: '',
}
export default {
  name: "OriginPlaceFormModal",
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
    editObj:{
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      form:{...defaultForm},
      rules: {
        mock1: [{ required: true, message: "请输入材质名称", trigger: "blur" }],
      }
    };
  },
  computed: {
    ...mapState('modal', ['visible']),
    title() {
      return this.isEdit ? "编辑产地" : "新增产地";
    }
  },
  methods: {
    ...mapMutations('modal', ['SET_MODAL_VISIBLE']),
    cancle() {
      this.SET_MODAL_VISIBLE(false);
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
    },
  },
  watch: {
    visible(newV, oldV) {
      if (newV) {
        this.form = this.isEdit ? {...this.editObj} : {...defaultForm}
      }else{
        this.$refs.ruleForm.clearValidate();
      }
    }
  }
};
</script>
<style scoped lang="less">
.two-form-item {
  display: flex;
  :first-child.el-form-item {
    margin-right: 10px; 
  }
  :last-child.el-form-item {
    margin-left: 10px;
  }
}
.el-select {
  width: 100%;
}
</style>
