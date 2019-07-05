<template>
  <div class="container single-page">
    <hlBreadcrumb :data="breadTitle"></hlBreadcrumb>
    <div class="form">
      <el-form ref="form" :model="form" label-width="120px" size="small">
        <div class="form-block" v-for="(item,index) in form.needShowData" :key="item.id">
          <div class="head">登记信息</div>
          <el-row :gutter="50">
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="登记日期" prop="mock4">
                <el-input :value="item.mock4" disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="货主" prop="mock5">
                <el-input :value="item.mock5" disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="品名" prop="mock5">
                <el-input :value="item.mock6" disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="材质" prop="mock4">
                <el-input :value="item.mock4" disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="产地" prop="mock5">
                <el-input :value="item.mock5" disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="规格" prop="mock5">
                <el-input :value="item.mock6" disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="应收数量" prop="mock4">
                <el-input :value="item.mock4" disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="应收重量" prop="mock5">
                <el-input :value="item.mock5" disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="数量单位" prop="mock5">
                <el-input :value="item.mock6" disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="重量单位" prop="mock4">
                <el-input :value="item.mock4" disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="计量方式" prop="mock5">
                <el-input :value="item.mock5" disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="head">验收信息</div>
          <el-row :gutter="50">
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="实收数量">
                <el-input v-model="item.num"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item
                label="实收重量"
                :prop="'needShowData.' + index + '.weight'"
                :rules="validateweight(item.reserveweight)"
              >
                <el-input v-model.number="item.weight"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="交易仓库" prop="mock4">
                <el-input :value="item.mock4" disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="区桩位" prop="mock5">
                <el-input :value="item.mock5" disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="层数" prop="mock5">
                <el-input :value="item.mock6" disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="bottom">
          <el-form-item>
            <el-button type="primary" size="medium" @click="submitForm('form')">确定</el-button>
            <el-button @click="back" size="medium">取消</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import hlBreadcrumb from "@/components/hl-breadcrumb";
const defualtFormParams = {
  mock1: null,
  mock2: null
};

export default {
  name: "checkEnter",
  components: {
    hlBreadcrumb
  },
  data() {
    return {
      breadTitle: ["仓储管理", "待验收入库", "验收入库"],
      disabled: true,
      form: {
        needShowData: [],
        ...defualtFormParams
      }
    };
  },
  computed: {
    ...mapState("waitCheckEnter", ["inspection"]),
    shipper() {
      return (this.inspection.length && this.inspection[0].shipper) || null;
    },
    needweights() {
      return this.form.needShowData.map(item => {
        return { weight: item.weight };
      });
    }
  },
  methods: {
    back() {
      this.$router.push({
        path: "/web/settlement/pageList/inventoryTable"
      });
    },
    validateweight(weight, max = null) {
      return [
        {
          type: "number",
          required: true,
          message: "请输入实收重量",
          trigger: "blur"
        },
        {
          validator(rule, value, callback) {
            if (max) {
              weight = max;
            }
            if (value > weight) {
              callback(new Error(`不能大于${weight}`));
            }else {
              callback();
            }
          }
        }
      ];
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    init() {
      if (this.inspection.length === 0) {
        this.back();
      } else {
        this.form.needShowData = this.inspection.slice().map(item => {
          return Object.assign({}, item, { num: null, weight: null });
        });
      }
    }
  },
  created() {
    this.init();
  }
};
</script>
>

<style scoped lang="less">
.form {
  padding: 15px 15px 50px 15px;
  background: rgba(240, 242, 245, 1);
  .form-block {
    padding-top: 15px;
    margin-bottom: 15px;
    background: white;
    .head {
      padding-left: 10px;
      margin-bottom: 15px;
      font-size: 18px;
      font-weight: 700;
    }
  }
  .bottom {
    padding: 15px 0px 1px 0px;
    background: white;
  }
}
</style>
