<template>
  <el-dialog :show-close="false" :title="title" :visible="visible" width="600px">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-position="right" label-width="150px">
      <el-form-item label="交割库名称" prop="deliveryStore">
        <el-input v-model="form.deliveryStore" maxlength="20"  placeholder="请输入"></el-input>
      </el-form-item>
      <div class="two-form-item">
        <el-form-item label="交割库地址" prop="address">
          <AreaCascader 
              :value="form.address" 
              :clearable="true"
              @selection="selectArea"
            />
        </el-form-item>
        <el-form-item prop="storeAddressStreet" label-width="0">
          <el-input v-model="form.storeAddressStreet" maxlength="50"  placeholder="请输入"></el-input>
        </el-form-item>
      </div>
      <el-form-item label="交割库容量" prop="storeCapacity">
        <InputNumber v-model="form.storeCapacity"  :precision="3" :max="10"  placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="交割库类型" prop="storeType">
        <el-select v-model="form.storeType" placeholder="请选择">
          <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="负责人" prop="leader">
        <el-input v-model="form.leader" maxlength="10"  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="contactTel" maxlength="30">
        <el-input v-model="form.contactTel"  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="仓管人员" prop="storeAdminId">
        <el-select v-model="form.storeAdminId" placeholder="请选择" multiple >
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
import AreaCascader from "@/components/areaCascader";
import { phoneValidation } from '@/util/reg.js';
const defaultForm = {
  deliveryStore: '',
  address: [],
  storeAddressProvince: '',
  storeAddressCity: '',
  storeAddressCounty: '',
  storeAddressStreet: '',
  storeCapacity: 0,
  storeType: '',
  leader: '',
  contactTel: '',
  storeAdminId: [],
}

const checkPhone = (rule, value, callback) => {
  if(!value) {
    callback(new Error('请输入负责人联系电话'));
  } else if (!phoneValidation(value)) {
     callback(new Error('格式错误，请输入正确格式的联系电话'));
  } else {
    callback();
  }
}
export default {
  name: "settlementFormModal",
  components: {
    InputNumber,
    AreaCascader
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
        deliveryStore: [{ required: true, message: "请输入交割库名称", trigger: "blur" }],
        address: [{ required: true, message: "请选择交割库地址", trigger: "blur" }],
        storeAddressStreet: [{ required: true, message: "请输入交割库详细地址", trigger: "blur" }],
        storeCapacity: [{ required: true, message: "请输入交割库容量", trigger: "blur" }],
        storeType: [{ required: true, message: "请选择交割库类型", trigger: "blur" }],
        leader: [{ required: true, message: "请输入负责人姓名", trigger: "blur" }],
        contactTel: [{ required: true, validator: checkPhone,  trigger: "blur" }],
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
    selectArea(value) {
      this.form.address = value;
      this.form.storeAddressProvince = value[0] || '';
      this.form.storeAddressCity = value[1] || '';
      this.form.storeAddressCounty = value[2] || '';
    },
    cancle() {
      this.SET_MODAL_VISIBLE(false);
    },
    confirm() {
      let that = this;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let parmas = {
            ...that.form
          };
          delete parmas.address;
          console.log(parmas);
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
