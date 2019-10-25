<template>
  <div class="container single-page">
    <HletongBreadcrumb :data="breadTitle"></HletongBreadcrumb>
    <div class="form" v-if="form.needShowData.length">
      <el-form ref="form" :model="form" label-width="120px" size="small">
        <div class="form-block" v-for="(item,index) in form.needShowData" :key="item.id">
          <div class="head">基本信息</div>
          <el-row>
            <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
              <el-form-item label="登记日期:" prop="registerTime">{{item.registerTime}}</el-form-item>
            </el-col>
            <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
              <el-form-item label="货主:" prop="name">{{item.name}}</el-form-item>
            </el-col>
          </el-row>
          <div class="head">仓库信息</div>
          <el-row>
            <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
              <el-form-item label="交易仓库:" prop="deliveryStore">{{item.deliveryStore}}</el-form-item>
            </el-col>
            <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24" v-if="productType!==Dict.PRODUCT_OIL">
              <el-form-item label="区桩位:" prop="pilePosition">{{item.pilePosition}}</el-form-item>
            </el-col>
            <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24" v-if="productType===Dict.PRODUCT_OIL">
              <el-form-item label="油罐编号:" prop="oilTankCode">{{item.oilTankCode}}</el-form-item>
            </el-col>
            <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
              <el-form-item label="入库类型:" prop="incomingTypeText">{{item.incomingTypeText||"-"}}</el-form-item>
            </el-col>
            <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24" v-if="productType!==Dict.PRODUCT_OIL">
              <el-form-item label="层数:" prop="piles">{{item.piles}}</el-form-item>
            </el-col>
          </el-row>
          <div class="head">商品信息</div>
          <el-row>
            <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24" v-if="productType!==Dict.PRODUCT_OIL">
              <el-form-item label="品名:" prop="productName">{{item.productName}}</el-form-item>
            </el-col>
            <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24" v-if="productType!==Dict.PRODUCT_OIL">
              <el-form-item label="材质:" prop="materialName">{{item.materialName}}</el-form-item>
            </el-col>
            <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24" v-if="productType!==Dict.PRODUCT_OIL">
              <el-form-item label="产地:" prop="originPlaceName">{{item.originPlaceName}}</el-form-item>
            </el-col>
            <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24" v-if="productType!==Dict.PRODUCT_OIL">
              <el-form-item label="规格:" prop="specificationsName">{{item.specificationsName}}</el-form-item>
            </el-col>
            <!--石油开始-->
            <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24" v-if="productType===Dict.PRODUCT_OIL">
              <el-form-item label="品类:" prop="firstCatalogName">{{item.firstCatalogName}}</el-form-item>
            </el-col>
            <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24" v-if="productType===Dict.PRODUCT_OIL">
              <el-form-item label="牌号:" prop="secondCatalogName">{{item.secondCatalogName}}</el-form-item>
            </el-col>
            <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24" v-if="productType===Dict.PRODUCT_OIL">
              <el-form-item label="排放标准:" prop="emissionStandardText">{{item.emissionStandardText}}</el-form-item>
            </el-col>
            <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24" v-if="productType===Dict.PRODUCT_OIL">
              <el-form-item label="密度(kg/m³):" prop="density">{{item.density}}</el-form-item>
            </el-col>
            <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24" v-if="productType===Dict.PRODUCT_OIL">
              <el-form-item label="型号:" prop="serialNumber">{{item.serialNumber}}</el-form-item>
            </el-col>
            <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24" v-if="productType===Dict.PRODUCT_OIL">
              <el-form-item label="生产商:" prop="manufacturerName">{{item.manufacturerName}}</el-form-item>
            </el-col>
            <!--石油结束-->
            <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
              <el-form-item label="应收数量:" prop="supposedNum">{{item.supposedNum}}</el-form-item>
            </el-col>
            <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
              <el-form-item label="应收重量:" prop="supposedWeight">{{item.supposedWeight}}</el-form-item>
            </el-col>
            <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
              <el-form-item label="数量单位:" prop="numUnitText">{{item.numUnitText}}</el-form-item>
            </el-col>
            <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
              <el-form-item label="重量单位:" prop="weightUnitText">{{item.weightUnitText}}</el-form-item>
            </el-col>
            <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
              <el-form-item label="计量方式:" prop="measuringText">{{item.measuringText}}</el-form-item>
            </el-col>
          </el-row>
          <div class="head">验收信息</div>
          <el-row>
            <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
              <el-form-item
                label="实收数量:"
                :prop="'needShowData.' + index + '.num'"
                :rules="validatenum(item.supposedNum)"
              >
                <el-input v-model.number="item.num"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
              <el-form-item
                label="实收重量:"
                :prop="'needShowData.' + index + '.weight'"
                :rules="validateweight(item.supposedWeight)"
              >
                <el-input v-model="item.weight"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row></el-row>
        </div>
      </el-form>
    </div>
    <div class="bottom">
        <el-button type="primary" v-if="ycexamine" :loading="loading" size="medium" @click="submitForm('form')">确定</el-button>
        <el-button @click="back" size="medium">取消</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Dict from "@/util/dict.js";
import { judgeAuth } from "util/util.js";
export default {
  name: "checkEnter",
  components: {
  },
  data() {
    return {
      loading: false,
      breadTitle: ["仓储管理", "待验收入库", "验收入库"],
      disabled: true,
      form: {
        needShowData: []
      },
      Dict: Dict,
      ycexamine:false
    };
  },
  computed: {
    ...mapState("waitCheckEnter", ["inspection", "productType"])
  },
  methods: {
    back() {
      this.$router.push({
        path: "/web/yc/storage/stockRegister/page"
      });
    },
    validateweight(weight, max = null) {
      return [
        {
          required: true,
          message: "请输入实收重量",
          trigger: "blur"
        },
        { max: 10, message: "最多10位", trigger: "blur" },
        {
          pattern: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,3})?$/,
          message: "正数可以包含3位小数"
        },
        {
          validator(rule, value, callback) {
            if (max) {
              weight = max;
            }
            if (value > weight) {
              callback(new Error(`不能大于${weight}`));
            }
            callback();
          }
        }
      ];
    },
    validatenum(num) {
      return [
        {
          validator(rule, value, callback) {
            if (!value) {
              callback();
            }
            if (value > num) {
              callback(new Error(`不能大于${num}`));
            }
            callback();
          }
        }
      ];
    },
    _serialize_() {
      const params = this.form.needShowData.map(item => {
        return Object.assign(
          {},
          item,
          { productTypeCode: this.productType },
          { weightUnitTypeEnum: null },
          { numUnitTypeEnum: null },
          { measuringTypeEnum: null }
        );
      });
      return params;
    },
    async _examine_(params) {
      this.loading = true;
      const res = await this.$api.examine(params);
      this.loading = false;
      switch (res.code) {
        case Dict.SUCCESS:
          this.$messageSuccess("验收入库成功");
          this.back();
          break;
        default:
          this.$messageError(res.mesg);
          break;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = this._serialize_();
          this._examine_(params);
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
          return Object.assign(
            {},
            item,
            { num: null, weight: null },
            {
              measuringText:
                (item.measuringTypeEnum && item.measuringTypeEnum.text) || "-",
              numUnitText:
                (item.numUnitTypeEnum && item.numUnitTypeEnum.text) || "-",
              weightUnitText:
                (item.weightUnitTypeEnum && item.weightUnitTypeEnum.text) || "-"
            }
          );
        });
      }
    },
    perm(){
      this.ycexamine = judgeAuth("ycstore:stockregister:examine"); 
    }
  },
  mounted(){
    setTimeout(()=>{
      this.perm()
    })
  },
  created() {
    this.init();
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 20px 15px 50px 20px;
  .form-block {
    padding-bottom: 20px;
    .head {
      margin-bottom: 20px;
      padding-left: 20px;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      color: #333333;
      background: #f6f8fa;
    }
  }
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
