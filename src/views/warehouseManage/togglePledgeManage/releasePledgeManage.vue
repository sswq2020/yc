<template>
  <div class="container single-page">
    <hlBreadcrumb :data="breadTitle"></hlBreadcrumb>
    <div class="form">
      <el-form ref="form" :model="form" label-width="120px" size="small">
        <div class="form-block">
          <el-row>
            <el-col :md="12" :sm="12" :xs="24">
              <div class="head">质押信息</div>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="质权方" prop="mock2">
                <el-input v-model="form.mock2"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="质压方" prop="mock3">
                <el-input :value="form.mock3" disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="解押数量" prop="mock4">
                <el-input :value="form.mock4"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item 
                label="解押重量" 
                prop="mock5"
                :rules="validateweight(form.reserveweight)"
              >
                <el-input v-model.number="form.mock5"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="form-block">
          <div class="head">库存信息</div>
          <el-row :gutter="50">
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="货主" prop="mock6">
                <el-input :value="form.mock6" disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="库存数量" prop="mock7">
                <el-input :value="form.mock7" disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="库存重量" prop="mock8">
                <el-input :value="form.reserveweight" disabled="disabled"></el-input>
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
  mock2: null,
  mock3: null,
  mock4: null,
  mock5: null,
  mock6: null,
  mock7: null,
  mock8: null
};

export default {
  name: "releasePledgeManage",
  components: {
    hlBreadcrumb
  },
  data() {
    return {
      breadTitle: ["仓储管理", "质解押管理", "解押管理"],
      disabled: true,
      form: {
        ...defualtFormParams
      }
    };
  },
  computed: {
    ...mapState("togglePledgeManage", ["releasePledgeData"]),
  },
  methods: {
    back() {
      this.$router.push({
        path: "/web/settlement/pageList/togglePledgeManage"
      });
    },
    validateweight(weight, max = null) {
      return [
        {
          type: "number",
          required: true,
          message: "请输入质押重量",
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
      if (!this.releasePledgeData) {
        this.back();
      } else {
        this.form = JSON.parse(JSON.stringify(this.releasePledgeData));
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
