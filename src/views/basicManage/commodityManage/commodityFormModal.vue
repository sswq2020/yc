<template>
  <el-dialog :show-close="false" :title="title" :visible="visible" width="600px">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-position="right" label-width="150px">
      <el-form-item :label="item.label" :prop="item.prop" v-for="(item, index) in formItem" :key="index">
        <el-select v-model="form[item.prop]" placeholder="请选择">
          <el-option v-for="optionItem in item.option" :key="optionItem.value" :label="optionItem.label" :value="optionItem.value"></el-option>
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
const defaultForm = {
  mock1: '',
  mock2: '',
  mock3: '',
  mock4: '',
  mock5: '',
}
const list = [
  {
    value: '选项1',
    label: '黄金糕'
  }, {
    value: '选项2',
    label: '双皮奶'
  }
];
export default {
  name: "commodityFormModal",
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
          option: list
        },
        {
          label: '品名',
          prop: 'mock2',
          option: list
        },
        {
          label: '材质',
          prop: 'mock3',
          option: list
        },
        {
          label: '规格',
          prop: 'mock4',
          option: list
        },
        {
          label: '产地',
          prop: 'mock5',
          option: list
        }
      ],
      rules: {
        mock1: [{ required: true, message: "请选择大类", trigger: "blur" }],
        mock2: [{ required: true, message: "请选择品名", trigger: "blur" }],
        mock3: [{ required: true, message: "请选择材质", trigger: "blur" }],
        mock4: [{ required: true, message: "请选择规格", trigger: "blur" }],
        mock5: [{ required: true, message: "请选择产地", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapState('modal', ['visible']),
    title() {
      return this.isEdit ? "编辑物资" : "新增物资";
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
