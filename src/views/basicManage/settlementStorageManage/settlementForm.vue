<template>
  <div class="container single-page">
    <HletongBreadcrumb :data="breadTitle"></HletongBreadcrumb>
    <div class="form">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-position="right" label-width="150px">
        <el-form-item label="交割库名称" prop="deliveryStore">
          <el-input v-model="form.deliveryStore" maxlength="20"  placeholder="请输入" size="small"></el-input>
        </el-form-item>
        <el-form-item label="交割库地址" prop="address">
          <AreaCascader 
              :value="form.address" 
              :clearable="true"
              @selection="selectArea"
            />
        </el-form-item>
        <el-form-item  label="详细地址" prop="storeAddressStreet">
            <el-input v-model="form.storeAddressStreet" maxlength="50"  placeholder="请输入" size="small"></el-input>
          </el-form-item>
        <el-form-item label="交割库容量" prop="storeCapacity">
          <InputNumber v-model="form.storeCapacity"  :precision="3" :max="999999.999"  placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="交割库类型" prop="storeType">
          <el-select v-model="form.storeType" placeholder="请选择" size="small">
            <el-option v-for="item in Object.keys(deliveryStoreTypeData)" :key="item" :label="deliveryStoreTypeData[item]" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="存储类型" prop="saveType">
          <el-select v-model="form.saveType" placeholder="请选择" size="small">
            <el-option v-for="(item,index) in TypeSaveDatas"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>  
          </el-select>
        </el-form-item>
        <el-form-item label="负责人" prop="leader">
          <el-input v-model="form.leader" maxlength="10"  placeholder="请输入" size="small"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="contactTel" maxlength="30">
          <el-input v-model="form.contactTel"  placeholder="请输入" size="small"></el-input>
        </el-form-item>
        <el-form-item label="仓管人员" prop="storeAdminList">
          <el-select v-model="form.storeAdminList" placeholder="请选择" multiple size="small">
            <el-option v-for="item in Object.keys(storeAdminData)" :key="item" :label="storeAdminData[item]" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="bottom">
      <el-button @click="cancle">取 消</el-button>
      <el-button type="primary" @click="confirm" :loading="loading">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations  } from 'vuex';
import InputNumber from '@/components/inputNumber.vue';
import AreaCascader from "@/components/areaCascader";
import { phoneValidation } from '@/util/reg.js';
import { DICT_SELECT_ARR } from "common/util";
const TypeSaveDatas = DICT_SELECT_ARR(Dict.STORAGE_TYPE);

import Dict from "@/util/dict.js";
const defaultForm = {
  deliveryStore: '', // 交割库名称
  address: [], // 省市区列表
  storeAddressProvince: '', // 省
  storeAddressCity: '', // 市
  storeAddressCounty: '', // 区
  storeAddressStreet: '', // 具体地址
  storeCapacity: 0, // 交割库容量
  storeType: '', // 交割库类型
  saveType:'',// 存储类型
  leader: '', // 负责人
  contactTel: '', // 联系电话
  storeAdminList: [], // 仓管人员
}

/**
 * @author: xh
 * @description: 联系电话验证
 */
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
  data() {
    return {
      form:{...defaultForm},
      TypeSaveDatas:TypeSaveDatas,
      rules: {
        deliveryStore: [{ required: true, message: "请输入交割库名称", trigger: "blur" }],
        address: [{ required: true, message: "请选择交割库地址", trigger: "blur" }],
        storeAddressStreet: [{ required: true, message: "请输入交割库详细地址", trigger: "blur" }],
        storeCapacity: [{ required: true, message: "请输入交割库容量", trigger: "blur" }],
        storeType: [{ required: true, message: "请选择交割库类型", trigger: "blur" }],
        saveType: [{ required: true, message: "请选择存储类型", trigger: "blur" }],
        leader: [{ required: true, message: "请输入负责人姓名", trigger: "blur" }],
        contactTel: [{ required: true, validator: checkPhone,  trigger: "blur" }],
      },
      storeAdminData: {},
      loading: false
    };
  },
  computed: {
    ...mapState('modal', ['isEdit', 'editObj']),
    ...mapState('app', ['deliveryStoreTypeData']),
    breadTitle() {
      return ["基础信息", "交割库管理", `${ this.isEdit ? '编辑' : '新增'}交割库`];
    }
  },
  methods: {
     /**
     * @author: xh
     * @description: 初始化页面
     */
    init() {
      this.form = this.isEdit ? {
        ...this.editObj,
        storeCapacity: Number(this.editObj.storeCapacity)
      } : {...defaultForm};
    },
    /**
     * @author: xh
     * @description: 获取仓管人员列表
     */
    async getStoreAdmin() {
      const res = await this.$api.getStoreAdminData();
      switch (res.code) {
        case Dict.SUCCESS:
          this.storeAdminData = res.data;
          break;
        default:
          this.$messageError(res.mesg);
          break;
      }
    },
    /**
     * @author: xh
     * @description: 根据下拉选择的地址设置省市区
     */
    selectArea(value) {
      this.form.address = value;
      this.form.storeAddressProvince = value[0] || '';
      this.form.storeAddressCity = value[1] || '';
      this.form.storeAddressCounty = value[2] || '';
    },
    cancle() {
      this.$router.push({
        name: 'settlementStorageManage'
      });
    },
    confirm() {
      let that = this;
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          const { form } = that;
          const parmas = { 
            deliveryStore: form.deliveryStore, 
            id: form.id, 
            storeAddressProvince: form.storeAddressProvince, 
            storeAddressCity: form.storeAddressCity, 
            storeAddressCounty: form.storeAddressCounty, 
            storeAddressStreet: form.storeAddressStreet, 
            storeCapacity: form.storeCapacity, 
            storeType: form.storeType, 
            saveType: form.saveType, 
            leader: form.leader,
            contactTel: form.contactTel, 
            storeAdminList: form.storeAdminList,
            state: form.state
            };
          // let parmas = {
          //   ...that.form
          // };
          // delete parmas.address;
          // delete parmas.publicStatusEnum;
          // delete parmas.storeTypeEnum;
          // delete parmas.saveTypeEnum;
          const serve = this.isEdit ? "updateDeliveryStore" : "addDeliveryStore";
          const response = await this.$api[serve]({ ...parmas });
          switch (response.code) {
            case Dict.SUCCESS:
              this.$messageSuccess(`${this.isEdit ? "修改" : "新增"}成功`);
              this.$router.push({
                name: 'settlementStorageManage'
              });
              break;
            default:
              this.$messageError(response.mesg);
              break;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  // watch: {
  //   visible(newV, oldV) {
  //     if (newV) {
  //       // 防止重复调接口
  //       if( JSON.stringify(this.storeAdminData) === '{}') {
  //         this.getStoreAdmin();
  //       }
  //       this.form = this.isEdit ? {
  //         ...this.editObj,
  //         storeCapacity: Number(this.editObj.storeCapacity)

  //         } : {...defaultForm};
  //     } else {
  //       this.$refs.ruleForm.clearValidate();
  //     }
  //   }
  // },
  created() {
    this.getStoreAdmin();
    this.init();
  }
};
</script>
<style scoped lang="less">
.form {
  width: 565px;
  padding-top: 20px;
}
.el-select {
  width: 100%;
}
.bottom {
    position: fixed;
    width: 86%;
    bottom: 20px;
    height: 50px;
    background-color: #f6f8fa;
    margin-left: 20px;
    box-shadow: 0 -1px 4px 0 hsla(0, 0%, 80%, 0.5);
    .el-button {
      min-width: 64px;
      margin-left: 20px;
      margin-top: 10px;
    }
}
</style>
