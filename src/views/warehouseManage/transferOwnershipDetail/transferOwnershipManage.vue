<template>
  <div class="container single-page" style="display: block;background-color: white;height: 100%;">
    <HletongBreadcrumb :data="breadTitle"></HletongBreadcrumb>
    <div class="computedHeight">
      <div class="form" v-if="form.needShowData.length">
        <el-form ref="form" :model="form" label-width="130px" size="small">
          <div class="form-block">
            <div class="head">过户信息</div>
            <el-row>
              <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
                <el-form-item
                  label="业务类型"
                  prop="transferType"
                  :rules="[{ required: true, message: '请选择业务类型'}]"
                >
                  <el-select v-model="form.transferType" placeholder="请选择" size="small">
                    <el-option
                      v-for="(item,index) in typeDatas"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
                <el-form-item label="原货主" prop="originalShipperName">
                  <el-input :value="form.originalShipperName" :disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
                <el-form-item
                  label="新货主"
                  prop="newShipperId"
                  :rules="{ required: true, message: '请选择新货主'}"
                >
                  <el-select v-model="form.newShipperId" placeholder="请选择" size="small">
                    <el-option
                      v-for="(item,index) in cargoList"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="form-block" v-for="(item,index) in form.needShowData" :key="item.id">
            <div class="head">库存信息</div>
            <el-row>
              <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
                <el-form-item label="交易仓库" prop="deliveryStore">
                  <el-input :value="item.deliveryStore" disabled="disabled"></el-input>
                </el-form-item>
              </el-col>

              <!--石油开始-->
              <el-col
                :xl="8"
                :lg="12"
                :md="24"
                :sm="24"
                :xs="24"
                v-if="productType===Dict.PRODUCT_OIL"
              >
                <el-form-item label="油罐编号" prop="oilTankCode">
                  <el-input :value="item.oilTankCode" disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
              <el-col
                :xl="8"
                :lg="12"
                :md="24"
                :sm="24"
                :xs="24"
                v-if="productType===Dict.PRODUCT_OIL"
              >
                <el-form-item label="品类" prop="firstCatalogName">
                  <el-input :value="item.firstCatalogName" disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
              <el-col
                :xl="8"
                :lg="12"
                :md="24"
                :sm="24"
                :xs="24"
                v-if="productType===Dict.PRODUCT_OIL"
              >
                <el-form-item label="牌号" prop="secondCatalogName">
                  <el-input :value="item.secondCatalogName" disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
              <el-col
                :xl="8"
                :lg="12"
                :md="24"
                :sm="24"
                :xs="24"
                v-if="productType===Dict.PRODUCT_OIL"
              >
                <el-form-item label="排放标准" prop="emissionStandardText">
                  <el-input :value="item.emissionStandardText" disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
              <el-col
                :xl="8"
                :lg="12"
                :md="24"
                :sm="24"
                :xs="24"
                v-if="productType===Dict.PRODUCT_OIL"
              >
                <el-form-item label="密度(kg/m³)" prop="density">
                  <el-input :value="item.density" disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
              <el-col
                :xl="8"
                :lg="12"
                :md="24"
                :sm="24"
                :xs="24"
                v-if="productType===Dict.PRODUCT_OIL"
              >
                <el-form-item label="型号" prop="serialNumber">
                  <el-input :value="item.serialNumber" disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
              <el-col
                :xl="8"
                :lg="12"
                :md="24"
                :sm="24"
                :xs="24"
                v-if="productType===Dict.PRODUCT_OIL"
              >
                <el-form-item label="生产商" prop="manufacturerName">
                  <el-input :value="item.manufacturerName" disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
              <!--石油结束-->

              <!--钢木开始-->
              <el-col
                :xl="8"
                :lg="12"
                :md="24"
                :sm="24"
                :xs="24"
                v-if="productType!==Dict.PRODUCT_OIL"
              >
                <el-form-item label="区桩位" prop="pilePosition">
                  <el-input :value="item.pilePosition" disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
              <el-col
                :xl="8"
                :lg="12"
                :md="24"
                :sm="24"
                :xs="24"
                v-if="productType!==Dict.PRODUCT_OIL"
              >
                <el-form-item label="层数" prop="piles">
                  <el-input :value="item.piles" disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
              <el-col
                :xl="8"
                :lg="12"
                :md="24"
                :sm="24"
                :xs="24"
                v-if="productType!==Dict.PRODUCT_OIL"
              >
                <el-form-item label="品名" prop="productName">
                  <el-input :value="item.productName" disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
              <el-col
                :xl="8"
                :lg="12"
                :md="24"
                :sm="24"
                :xs="24"
                v-if="productType!==Dict.PRODUCT_OIL"
              >
                <el-form-item label="材质" prop="materialName">
                  <el-input :value="item.materialName" disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
              <el-col
                :xl="8"
                :lg="12"
                :md="24"
                :sm="24"
                :xs="24"
                v-if="productType!==Dict.PRODUCT_OIL"
              >
                <el-form-item label="规格" prop="specificationsName">
                  <el-input :value="item.specificationsName" disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
              <el-col
                :xl="8"
                :lg="12"
                :md="24"
                :sm="24"
                :xs="24"
                v-if="productType!==Dict.PRODUCT_OIL"
              >
                <el-form-item label="产地" prop="originPlaceName">
                  <el-input :value="item.originPlaceName" disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
              <!--钢木结束-->
              <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
                <el-form-item label="库存数量" prop="totalNumInventory">
                  <el-input :value="item.totalNumInventory" disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
                <el-form-item label="库存重量" prop="totalWeightInventory">
                  <el-input :value="item.totalWeightInventory" disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
                <el-form-item label="计量方式" prop="measuringText">
                  <el-input :value="item.measuringText" disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
                <el-form-item label="数量单位" prop="numUnitText">
                  <el-input :value="item.numUnitText" disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
                <el-form-item label="重量单位" prop="weightUnitText">
                  <el-input :value="item.weightUnitText" disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="head">出库信息</div>
            <el-row>
              <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
                <el-form-item
                  label="过户数量"
                  :prop="'needShowData.' + index + '.transferNums'"
                  :rules="validatenum(item.availableNumInventory)"
                >
                  <el-input v-model.number="item.transferNums"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
                <el-form-item
                  label="过户重量"
                  :prop="'needShowData.' + index + '.transferWeights'"
                  :rules="validateweight(item.availableWeightInventory,max)"
                >
                  <el-input v-model="item.transferWeights"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="form.needShowData&&form.needShowData.length===1">
              <el-col :offset="8" :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
                <span
                  style="color:red;font-size:12px;margin-left:45px;padding-bottom:4px;"
                >最大过户量:{{max}}</span>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </div>
    </div>
    <div class="bottom">
        <el-button
          type="primary"
          :loading="loading"
          size="medium"
          v-if="transferConfirm"
          @click="submitForm('form')"
        >确定</el-button>
        <el-button size="medium" @click="back">取消</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Dict from "util/dict.js";
import { judgeAuth } from "util/util.js";
import {
  DICT_SELECT_ARR,
  findLabelByValue,
  handleFilterSelf
} from "common/util";
const TypeDatas = DICT_SELECT_ARR(Dict.TRANSFER_OWNERSHIP_BUSINESS_TYPE);
const defualtFormParams = {
  transferType: null,
  newShipperId: null,
  originalShipperName: null
};

export default {
  name: "transferOwnershipManage",
  components: {},
  data() {
    return {
      loading: false,
      breadTitle: ["仓储管理", "库存明细", "过户管理"],
      disabled: true,
      form: {
        needShowData: [],
        ...defualtFormParams
      },
      typeDatas: TypeDatas,
      max: null, // 从库存明细页跳转过来,会另外带来最大重量的限制
      cargoList: [],
      Dict: Dict,
      transferConfirm: false
    };
  },
  computed: {
    ...mapState("inventoryManage", ["transferOwnership", "productType"])
  },
  methods: {
    back() {
      this.$router.push({
        path: "/web/yc/storage/stockInventory/page"
      });
    },
    validateweight(weight, max = null) {
      return [
        {
          required: true,
          message: "请输入过户重量",
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const { newShipperId, originalShipperId } = this.form;
          if (newShipperId === originalShipperId) {
            this.$messageError("新货主不能和旧货主相同");
            return;
          }
          const params = this._serialize_();
          this._doTransfer_(params);
        } else {
          return false;
        }
      });
    },
    async _doTransfer_(params) {
      this.loading = true;
      const res = await this.$api.DoTransfer(params);
      this.loading = false;
      switch (res.code) {
        case Dict.SUCCESS:
          this.$messageSuccess("过户成功");
          this.back();
          break;
        default:
          this.$messageError(res.mesg);
          break;
      }
    },
    _serialize_() {
      const newShipperName = findLabelByValue(
        this.cargoList,
        this.form.newShipperId
      );
      const {
        newShipperId,
        originalShipperId,
        originalShipperName,
        transferType
      } = this.form;
      const params = this.form.needShowData.map((item, index) => {
        return Object.assign(
          {},
          {
            newShipperId,
            newShipperName,
            originalShipperId,
            originalShipperName,
            transferType
          },
          { stockId: this.transferOwnership[index].stockId },
          { transferNums: item.transferNums },
          { transferWeights: item.transferWeights }
        );
      });
      return params;
    },
    async _getTransferAvailable_(arr) {
      const res = await this.$api.getTransferAvailable({
        cargoId: arr[0].userId || null,
        stockId: arr[0].id || ""
      });
      switch (res.code) {
        case Dict.SUCCESS:
          this.max = Number(res.data);
          break;
        default:
          this.max = null;
          this.$messageError(res.mesg);
          break;
      }
    },
    async _getCargoList() {
      const res = await this.$api.getCargoList();
      switch (res.code) {
        case Dict.SUCCESS:
          this.cargoList = handleFilterSelf(res.data);
          break;
        default:
          this.$messageError(`${res.mesg}`);
          break;
      }
    },
    async init() {
      if (this.transferOwnership.length === 0) {
        this.back();
        return;
      }
      let res = await this.$api.getInventoryTransferinfo(
        this.transferOwnership
      );
      switch (res.code) {
        case Dict.SUCCESS:
          if (res.data.length === 1) {
            this._getTransferAvailable_(res.data);
          }
          res.data = res.data.slice().map(item => {
            return Object.assign({}, item, {
              measuringText:
                (item.measuringTypeEnum && item.measuringTypeEnum.text) || "-",
              numUnitText:
                (item.numUnitTypeEnum && item.numUnitTypeEnum.text) || "-",
              weightUnitText:
                (item.weightUnitTypeEnum && item.weightUnitTypeEnum.text) ||
                "-",
              transferNums: null,
              transferWeights: null
            });
          });
          this.form = Object.assign(
            {},
            {
              originalShipperId: res.data[0].userId || null,
              originalShipperName: res.data[0].name || null
            },
            { needShowData: res.data }
          );
          break;
        default:
          this.$messageError(res.mesg);
          break;
      }
    },
    perm() {
      this.transferConfirm = judgeAuth("inventory:transfer");
    }
  },
  mounted() {
    setTimeout(() => {
      this.perm();
    });
  },

  created() {
    this._getCargoList().then(() => {
      this.init();
    });
  }
};
</script>

<style scoped lang="less">
.computedHeight {
  height: calc(100% - 101px);
  overflow: auto;
  .form {
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
