<template>
  <el-dialog :title="title" :visible="visible" width="575px"  @close="cancle()" class="dialog-form">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-position="right" label-width="110px" class="form">
      <el-form-item label="材质名称" prop="materialName">
        <el-input v-model="form.materialName" maxlength="10"  placeholder="请输入" size="small"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="materialRemark">
        <el-input type="textarea"  v-model="form.materialRemark" size="small" placeholder="请输入" maxlength="100" ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle" size="small">取消</el-button>
      <el-button type="primary" @click="confirm" :loading="loading" size="small">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapMutations  } from 'vuex';
const defaultForm = {
  materialName: '', // 材质名称
  materialRemark: '', // 材质备注
}
export default {
  name: "materialFormModal",
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
        materialName: [{ required: true, message: "请输入材质名称", trigger: "blur" }],
      }
    };
  },
  computed: {
    ...mapState('modal', ['visible']),
    title() {
      return this.isEdit ? "编辑材质" : "新增材质";
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
          that.confirmCb({...that.form});
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
        this.form = this.isEdit ? {...this.editObj} : {...defaultForm};
      } else {
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
