<template>
  <el-dialog :show-close="false" :title="title" :visible="visible" width="600px">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-position="right" label-width="150px">
      <el-form-item :label="item.label" :prop="item.prop" v-for="(item, index) in formItem" :key="index">
        <el-input v-model="form[item.prop]" :maxlength="item.maxlength"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle">取 消</el-button>
      <el-button type="primary" @click="confirm" :loading="loading">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { mobileValidation, phoneValidation } from '@/util/reg.js';
const defaultForm = {
  mock1:null,
  mock2:null,
  mock3:null,
  mock4:null,
  mock5:null
};

const checkMobile = (rule, value, callback) => {
  if(!value) {
    callback(new Error('请输入手机号码'));
  } else if (!mobileValidation(value)) {
    callback(new Error('格式错误，请输入正确格式的手机号码'));
  } else {
    callback();
  }
};

const checkPhone = (rule, value, callback) => {
  if(!value) {
    callback(new Error('请输入联系电话'));
  } else if (!phoneValidation(value)) {
    callback(new Error('格式错误，请输入正确格式的联系电话'));
  } else {
    callback();
  }
};

export default {
  name: "shipperformModalTest",
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
      form: {...defaultForm},
      formItem: [
        {
          label: '手机号码',
          prop: 'mock1',
          maxlength: 11
        },
        {
          label: '货主名称',
          prop: 'mock2',
          maxlength: 50
        },
        {
          label: '社会统一信用代码',
          prop: 'mock3',
          maxlength: 20
        },
        {
          label: '联系人',
          prop: 'mock4',
          maxlength: 10
        },
        {
          label: '联系电话',
          prop: 'mock5',
          maxlength: 30
        }
      ],
      rules: {
        mock1: [{ required: true, validator: checkMobile, trigger: "blur" }],
        mock2: [{ required: true, message: "请输入货主名称", trigger: "blur" }],
        mock3: [{ required: true, message: "请输入社会统一信用代码", trigger: "blur" }],
        mock4: [{ required: true, message: "请输入联系人姓名", trigger: "blur" }],
        mock5: [{ required: true, validator: checkPhone, trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapState('modal', ['visible']),
    title() {
      return this.isEdit ? "编辑货主" : "新增货主";
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
        console.log(valid);
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
