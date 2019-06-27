<template>
  <el-dialog :show-close="false" :title="title" :visible="visible" width="600px">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-position="right" label-width="150px">
      <el-form-item :label="item.label" :prop="item.prop" v-for="(item, index) in formItem" :key="index">
        <el-select v-model="form[item.prop]" placeholder="请选择" v-if="item.type === 'select'">
          <el-option v-for="optionItem in item.option" :key="optionItem.value" :label="optionItem.label" :value="optionItem.value"></el-option>
        </el-select>
        <el-input v-model="form[item.prop]" maxlength="20"  placeholder="请输入" v-if="item.type === 'input'"></el-input>
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
}
export default {
  name: "productNameFormModal",
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
      formItem: [
        {
          label: '大类',
          prop: 'mock1',
          type: 'select',
          option: []
        },
        {
          label: '品名代码',
          prop: 'mock2',
          type: 'input',
        },
        {
          label: '品名',
          prop: 'mock3',
          type: 'input',
        }
      ],
      rules: {
        mock1: [{ required: true, message: "请选择大类", trigger: "blur" }],
        mock2: [{ required: true, message: "请输入品名代码", trigger: "blur" }],
        mock3: [{ required: true, message: "请输入品名", trigger: "blur" }],
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
