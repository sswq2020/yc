<template>
  <el-dialog :show-close="false" :title="title" :visible="visible" width="600px">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-position="right" label-width="150px">
      <el-form-item label="仓库" prop="mock1">
        <el-select v-model="form.mock1" placeholder="请选择">
          <el-option v-for="item in addressList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="库区" prop="mock2">
        <el-input v-model="form.mock2" maxlength="10"  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="货区" prop="mock3">
        <el-input v-model="form.mock3" maxlength="10"  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="仓位名称" prop="mock4">
        <el-input v-model="form.mock4" maxlength="20"  placeholder="请输入"></el-input>
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
  mock3: '',
  mock4: '',
}
export default {
  name: "pilePositionManage",
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
        mock1: [{ required: true, message: "请选择仓库", trigger: "blur" }],
        mock2: [{ required: true, message: "请输入库区", trigger: "blur" }],
        mock3: [{ required: true, message: "请输入货区", trigger: "blur" }],
        mock4: [{ required: true, message: "请输入仓位名称", trigger: "blur" }],
      },
      addressList: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }
      ],
    };
  },
  computed: {
    ...mapState('modal', ['visible']),
    title() {
      return this.isEdit ? "编辑区桩位" : "新增区桩位";
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
        console.log(this.editObj);
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
