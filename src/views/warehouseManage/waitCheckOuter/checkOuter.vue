<template>
  <div class="container single-page">
    <hlBreadcrumb :data="breadTitle"></hlBreadcrumb>
    <div class="form" v-if="form.needShowData.length">
      <el-form ref="form" :model="form" label-width="120px" size="small">
        <div class="form-block">
          <el-row>
            <el-col :md="12" :sm="12" :xs="24">
              <div class="head">提货信息</div>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="货主" prop="mock1">
                <el-input :value="shipper" :disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="提货人" prop="mock2">
                <el-input :value="form.mock2" :disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item
                label="提货密码"
                prop="mock3"
                :rules="{ required: true, message: '请输入提货密码', trigger: 'blur' }"
              >
                <el-input v-model="form.mock3"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="form-block" v-for="(item,index) in form.needShowData" :key="item.id">
          <div class="head">库存信息</div>
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
              <el-form-item label="实提数量">
                <el-input v-model="item.num"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item
                label="实提重量"
                :prop="'needShowData.' + index + '.weight'"
                :rules="validateweight(item.reserveweight)"
              >
                <el-input v-model.number="item.weight"></el-input>
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
import Dict from "@/util/dict.js";
const defualtFormParams = {
  mock1: null,
  mock2: null
};

export default {
  name: "checkOuter",
  components: {
    hlBreadcrumb
  },
  data() {
    return {
      breadTitle: ["仓储管理", "待验收入库", "验收出库"],
      disabled: true,
      form: {
        needShowData: [],
        ...defualtFormParams
      }
    };
  },
  computed: {
    ...mapState("waitCheckOuter", ["retrieval"]),
    shipper() {
      return this.form.needShowData.length && this.form.needShowData[0].shipper || null
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
            } else {
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
    async getDetail(id) {
      const res = await this.$api.detailRetrieval(id);
      switch (res.code) {
        case Dict.SUCCESS:
          this.form.needShowData = res.data.list.slice().map(item => {
            return Object.assign({}, item, { num: null, weight: null });
          });
          break;
        default:
          this.$messageError(res.errMsg);
          break;
      }
    },
    init() {
      if (!this.retrieval) {
        this.back();
      } else {
        this.getDetail(this.retrieval.id);
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
