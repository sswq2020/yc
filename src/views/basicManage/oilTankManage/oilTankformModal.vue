<template>
  <el-dialog :title="title" :visible="visible" width="600px" @close="cancle()">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-position="right" label-width="150px"  class="form">
      <el-form-item label="交割仓库:" prop="deliveryStoreId">
        <el-select v-model="form.deliveryStoreId" placeholder="请选择" size="small" style="width:100%">
          <el-option
            v-for="(item,index) in selectList"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="储罐编号:" prop="oilTankCode" size="small">
        <el-input v-model="form.oilTankCode"></el-input>
      </el-form-item>
      <el-form-item label="储罐容积(L):" prop="oilTankVolume" size="small">
        <el-input v-model="form.oilTankVolume"></el-input>
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
import {findLabelByValue} from "common/util";
const defaultForm = {
  deliveryStoreId:null, //交割库id
  oilTankCode: null,
  oilTankVolume:null
};

export default {
  name: "oilTankformModal",
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    cancleCb:{
      type: Function,
      default: () => {}
    },
    confirmCb: {
      type: Function,
      default: () => {}
    },
    oilTankObj: {
      type: Object,
      default: () => {}
    },
    list:{
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      form: { ...defaultForm },
      rules: {
        deliveryStoreId: [
          { required: true, message: "请选择品类", trigger: "blur" }
        ],
        oilTankCode: [
          { required: true, message: "请输入储罐编号", trigger: "blur" },
          { max: 10, message: "最多10个字符", trigger: "blur" }
        ],
        oilTankVolume:[
          { required: true, message: "请输入储罐容积", trigger: "blur" },
          { max: 10, message: "最多10个字符", trigger: "blur" }            
        ]
      }
    };
  },
  computed: {
    ...mapState("modal", ["visible"]),
    selectList(){
      return this.list.slice();
    },
    title() {
      return this.isEdit ? "编辑储罐" : "新增储罐";
    }
  },
  methods: {
    ...mapMutations("modal", ["SET_MODAL_VISIBLE"]),
    cancle() {
      this.cancleCb()
      this.SET_MODAL_VISIBLE(false);
    },
    confirm() {
      let that = this;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
            const params = Object.assign({}, that.form, {
            deliveryStore: findLabelByValue(that.selectList, that.form.deliveryStoreId)
          });
          that.confirmCb(params);
        } else {
          return false;
        }
      });
    }
  },
  watch: {
    visible(newV) {
      if (newV) {
        this.form = this.isEdit ? { ...this.oilTankObj } : { ...defaultForm };
      } else {
        this.$refs.ruleForm.clearValidate();
      }
    }
  }
};
</script>
<style scoped lang="less">
</style>
