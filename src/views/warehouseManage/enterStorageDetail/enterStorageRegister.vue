<template>
  <div class="container single-page">
    <hlBreadcrumb :data="breadTitle"></hlBreadcrumb>
    <div class="form">
      <el-form ref="form" :rules="rules" :model="form" label-width="120px" size="small">
        <div class="form-block">
          <el-row>
            <el-col :md="12" :sm="12" :xs="24">
              <div class="head">基础信息</div>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="日期" prop="mock1">
                <el-input v-model="form.mock1"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="货主" prop="mock2">
                <el-input v-model="form.mock2"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="入库类型" prop="mock3">
                <el-input v-model="form.mock3"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="form-block">
          <div class="head">商品信息</div>
          <el-row :gutter="50">
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="品名" prop="mock4">
                <el-input v-model="form.mock4"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="材质" prop="mock5">
                <el-input v-model="form.mock5"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="规格" prop="mock6">
                <el-input v-model="form.mock6"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="产地">
                <el-input v-model="form.mock2"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="计量方式">
                <el-input v-model="form.mock2"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="应收数量">
                <el-input v-model="form.mock2"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="数量单位">
                <el-input v-model="form.mock2"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="应收重量">
                <el-input v-model="form.mock2"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="重量单位">
                <el-input v-model="form.mock2"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="form-block">
          <div class="head">仓库信息</div>
          <el-row :gutter="50">
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="交易仓库">
                <el-input v-model="form.mock1"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="区桩位">
                <el-input v-model="form.mock2"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="bottom">
          <el-form-item>
            <el-button type="primary">确定</el-button>
            <el-button @click="back">取消</el-button>
          </el-form-item>
        </div>  
      </el-form>
    </div>
  </div>
</template>

<script>
import hlBreadcrumb from "@/components/hl-breadcrumb";
const defualtFormParams = {
  mock1: null,
  mock2: null,
  mock3: null,
  mock4: null,
  mock5: null,
  mock6: null,
  mock7: null,
  mock8: null,
  mock9: null,
  mock10: null,
  mock11: null,
  mock12: null,
  mock13: null,
  mock14: null
};

const RULES = {
  mock1: [{ required: true, message: "请输入账户简称", trigger: "blur" }],
  mock2: [{ required: true, message: "请输入银行账户名", trigger: "blur" }],
  mock3: [{ required: true, message: "银行账户号", trigger: "blur" }],
  mock4: [{ required: true, message: "请选择开户银行", trigger: "blur" }],
  mock5: [{ required: true, message: "开户支行/分理处", trigger: "blur" }],
  mock6: [{ required: true, message: "请输入账户简称", trigger: "blur" }],
  mock7: [{ required: true, message: "请输入银行账户名", trigger: "blur" }],
  mock8: [{ required: true, message: "银行账户号", trigger: "blur" }],
  mock9: [{ required: true, message: "请选择开户银行", trigger: "blur" }],
  mock10: [{ required: true, message: "开户支行/分理处", trigger: "blur" }],
  mock11: [{ required: true, message: "请输入账户简称", trigger: "blur" }],
  mock12: [{ required: true, message: "请输入银行账户名", trigger: "blur" }],
  mock13: [{ required: true, message: "银行账户号", trigger: "blur" }],
  mock14: [{ required: true, message: "请选择开户银行", trigger: "blur" }]
};

export default {
  name: "enterStorageRegister",
  components: {
    hlBreadcrumb
  },
  data() {
    return {
      breadTitle: ["仓储管理", "库存表", "入库登记"],
      form: { ...defualtFormParams },
      rules: { ...RULES }
    };
  },
  methods:{
    back(){
      this.$router.push({
        path: '/web/settlement/pageList/inventoryTable'
      });      
    }
  }
};
</script>
>

<style scoped lang="less">
.form {
  padding: 30px 15px 50px 15px;
  .form-block {
    padding-bottom: 20px;
    .head {
      margin-bottom: 15px;
      font-size: 18px;
      font-weight: 700;
    }
  }
}
</style>
