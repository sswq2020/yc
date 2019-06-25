<template>
  <el-dialog :show-close="false" :title="title" :visible="visible" width="600px">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-position="right" label-width="150px">
      <el-form-item label="交割库名称" prop="mock1">
        <el-input v-model="form.mock1" maxlength="20"  placeholder="请输入"></el-input>
      </el-form-item>
      <div class="two-form-item">
        <el-form-item label="交割库地址" prop="mock2">
          <el-select v-model="form.mock2" placeholder="请选择">
            <el-option v-for="item in addressList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="mock3" label-width="0">
          <el-input v-model="form.mock3" maxlength="50"  placeholder="请输入"></el-input>
        </el-form-item>
      </div>
      <el-form-item label="交割库容量" prop="mock4">
        <InputNumber v-model="form.mock4"  :precision="3" :max="10"  placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="交割库类型" prop="mock5">
        <el-select v-model="form.mock5" placeholder="请选择">
          <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="负责人" prop="mock6">
        <el-input v-model="form.mock6" maxlength="10"  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="mock7" maxlength="30">
        <el-input v-model="form.mock7"  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="仓管人员" prop="mock8">
        <el-select v-model="form.mock8" placeholder="请选择" multiple >
          <el-option v-for="item in userList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
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
import InputNumber from '@/components/inputNumber.vue';
const defaultForm = {
  mock1: '',
  mock2: '',
  mock3: '',
  mock4: 0,
  mock5: '',
  mock6: '',
  mock7: '',
  mock8: [],
}
export default {
  name: "settlementFormModal",
  components: {
    InputNumber
  },
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
        mock1: [{ required: true, message: "请输入交割库名称", trigger: "blur" }],
        mock2: [{ required: true, message: "请选择交割库地址", trigger: "blur" }],
        mock3: [{ required: true, message: "请输入交割库详细地址", trigger: "blur" }],
        mock4: [{ required: true, message: "请输入交割库容量", trigger: "blur" }],
        mock5: [{ required: true, message: "请选择交割库类型", trigger: "blur" }],
        mock6: [{ required: true, message: "请输入负责人姓名", trigger: "blur" }],
        mock7: [{ required: true, message: "请输入负责人联系电话", trigger: "blur" }],
      },
      addressList: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
      typeList: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
      userList: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }
      ]
    };
  },
  computed: {
    ...mapState('modal', ['visible']),
    title() {
      return this.isEdit ? "编辑交割库" : "新增交割库";
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
