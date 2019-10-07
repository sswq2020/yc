<template>
  <div class="container single-page">
    <hlBreadcrumb :data="breadTitle"></hlBreadcrumb>
    <div class="form">
      <el-form ref="form" :model="form" label-width="120px" size="small">
        <div class="form-block">
          <div class="head">基础信息</div>
          <el-row>
            <el-col :lg="8" :md="12" :sm="12" :xs="24">
              <el-form-item label="商品大类">
                <el-select v-model="storageclass" placeholder="请选择" size="small">
                  <el-option
                    v-for="(item,index) in typeProductDatas"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="12" :sm="12" :xs="24">
              <el-form-item
                label="日期"
                prop="registerTime"
                :rules="[{ required: true, message: '请选择登记日期', trigger: 'blur' }]"
              >
                <el-date-picker v-model="form.registerTime" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="12" :sm="12" :xs="24">
              <el-form-item
                label="货主"
                prop="userId"
                :rules="[{ required: true, message: '请输入货主', trigger: 'blur' }]"
              >
                <el-select v-model="form.userId" placeholder="请选择" size="small">
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
        <div class="form-block">
          <div class="head">仓库信息</div>
          <el-row>
            <el-col :lg="8" :md="12" :sm="12" :xs="24">
              <el-form-item
                label="交易仓库"
                prop="deliveryStoreId"
                :rules="[{ required: true, message: '请选择交易仓库', trigger:'blur'}]"
              >
                <el-select v-model="form.deliveryStoreId" placeholder="请选择" size="small">
                  <el-option
                    v-for="(item,index) in deliveryStoreList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="12" :sm="12" :xs="24" v-if="productType !== Dict.PRODUCT_OIL">
              <el-form-item
                label="区桩位"
                prop="pilePositionId"
                :rules="[{ required: true, message: '请选择区桩位', trigger:'blur'}]"
              >
                <el-select v-model="form.pilePositionId" placeholder="请选择" size="small">
                  <el-option
                    v-for="(item,index) in pilePositionList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :lg="8" :md="12" :sm="12" :xs="24" v-if="productType === Dict.PRODUCT_OIL">
              <el-form-item
                label="油罐编号"
                prop="oilTankId"
                :rules="[{ required: true, message: '请选择油罐编号', trigger:'blur'}]"
              >
                <el-select v-model="form.oilTankId" placeholder="请选择" size="small">
                  <el-option
                    v-for="(item,index) in oiltankList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :lg="8" :md="12" :sm="12" :xs="24">
              <el-form-item
                label="入库类型"
                prop="incomingType"
                :rules="[{ required: true, message: '请选择入库类型', trigger:'blur'}]"
              >
                <el-select v-model="form.incomingType" placeholder="请选择" size="small">
                  <el-option
                    v-for="(item,index) in YcIncomingTypeList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="form-block">
          <div class="head">商品信息</div>
          <el-row>
            <el-col :lg="8" :md="12" :sm="12" :xs="24">
              <el-form-item
                label="计量方式"
                prop="measuring"
                :rules="[{ required: true, message: '请选择计量方式', trigger:'blur'}]"
              >
                <el-select v-model="form.measuring" placeholder="请选择" size="small">
                  <el-option
                    v-for="(item,index) in YcMeasuringTypeList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="12" :sm="12" :xs="24">
              <el-form-item
                label="应收数量"
                prop="supposedNum"
                :rules="[{ required: true, message: '请输入应收数量', trigger: 'blur'},
                { pattern: /^[\d]{0,10}$/,message: '必须是正整数，最大10位', trigger: 'blur'}]"
              >
                <el-input v-model.number="form.supposedNum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="12" :sm="12" :xs="24">
              <el-form-item
                label="重量单位"
                prop="weightUnit"
                :rules="[{ required: true, message: '请选择重量单位', trigger:'blur'}]"
              >
                <el-select v-model="form.weightUnit" placeholder="请选择" size="small">
                  <el-option
                    v-for="(item,index) in YcWeightUnitList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="12" :sm="12" :xs="24">
              <el-form-item
                label="应收重量"
                prop="supposedWeight"
                :rules="[{ required: true, message: '请输入应收重量', trigger: 'blur' },
                         { max: 10, message: '最多10位', trigger: 'blur' },
                         {
                            pattern: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,3})?$/,
                            message: '正数可以包含3位小数'
                         }]"
              >
                <el-input v-model="form.supposedWeight"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="12" :sm="12" :xs="24">
              <el-form-item
                label="数量单位"
                prop="numUnit"
                :rules="[{ required: true, message: '请选择数量单位', trigger:'blur'}]"
              >
                <el-select v-model="form.numUnit" placeholder="请选择" size="small">
                  <el-option
                    v-for="(item,index) in YcNumUnitList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="12" :sm="12" :xs="24" v-if="productType === Dict.PRODUCT_OIL">
              <el-form-item
                label="油品信息"
                prop="productId"
                :rules="[{ required: true, message: '必选一项', trigger:'blur'}]"
              >
                <oilQualityInfoglass @oilQualityInfoSelect="acceptOilQuality"></oilQualityInfoglass>
                <el-input type="hidden" :value="form.productId" style="display:inline;height:0"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="12" :sm="12" :xs="24" v-if="productType !== Dict.PRODUCT_OIL">
              <el-form-item
                label="物资信息"
                prop="goodsId"
                :rules="[{ required: true, message: '必选一项', trigger:'blur'}]"
              >
                <commodityglass @commoditySelect="acceptCommodity"></commodityglass>
                <el-input type="hidden" :value="form.goodsId" style="display:inline;height:0"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
    <div class="bottom">
      <el-button type="primary" size="medium" :loading="loading" @click="submitForm('form')">确定</el-button>
      <el-button size="medium" @click="back">取消</el-button>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapState, mapMutations } from "vuex";
import { dictMixin } from "common/mixin";
import {
  _toArray_,
  handleFilterSelf,
  findLabelByValue,
  DICT_SELECT_ARR
} from "common/util";
import Dict from "util/dict";
import hlBreadcrumb from "components/hl-breadcrumb";
import oilQualityInfoglass from "views/basicManage/oilQualityInfo/oilQualityInfoglass.vue";
import commodityglass from "views/basicManage/commodityManage/commodityglass.vue";

const TypeProductDatas = DICT_SELECT_ARR(Dict.PRODUCT_CATEGORY);
const defualtFormParams = {
  registerTime: new Date(), // 登记日期
  userId: null, // 货主id
  incomingType: null, //入库类型
  deliveryStoreId: null, //交易仓库id
  pilePositionId: null, //区桩位id
  oilTankId: null, // 油罐编号id
  measuring: null, // 计量方式
  supposedNum: null, // 应收数量
  supposedWeight: null, // 应收重量
  weightUnit: null, // 数量单位
  numUnit: null, // 重量单位
  productId: null, // 油品信息传递过来的id
  goodsId: null // 物资信息传递过来的id
};

export default {
  name: "enterStorageRegister",
  mixins: [dictMixin],
  components: {
    hlBreadcrumb,
    oilQualityInfoglass,
    commodityglass
  },
  data() {
    return {
      /*各个下拉列表*/
      cargoList: [],
      deliveryStoreList: [],
      oiltankList: [],
      pilePositionList: [],

      loading: false,
      breadTitle: ["仓储管理", "库存表", "入库登记"],
      form: { ...defualtFormParams },
      Dict: Dict,
      oilInfoObj: null,
      commodityObj: null,
      /**商品大类数据源*/
      typeProductDatas: TypeProductDatas,
      storageclass: null
    };
  },
  computed: {
    ...mapState("inventoryManage", ["productType"])
  },
  methods: {
    ...mapMutations("inventoryManage", ["setProductType"]),
    back() {
      this.$router.push({
        path: "/web/yc/storage/stockInventory/page"
      });
    },
    clear() {
      this.form = { ...defualtFormParams };
      (this.oilInfoObj = null), (this.commodityObj = null);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = this._filter();
          this._addStockRegister_(params);
        } else {
          return false;
        }
      });
    },
    _filter() {
      const params = _.clone(
        Object.assign(
          {},
          this.form,
          { productTypeCode: this.storageclass },
          {
            deliveryStore: findLabelByValue(
              this.deliveryStoreList,
              this.form.deliveryStoreId
            )
          },
          {
            pilePosition: findLabelByValue(
              this.pilePositionList,
              this.form.pilePositionId
            )
          },
          {
            oilTankCode: findLabelByValue(this.oiltankList, this.form.oilTankId)
          }
        )
      );
      return params;
    },
    async _addStockRegister_(params) {
      this.loading = true;
      const res = await this.$api.addStockRegister(params);
      this.loading = false;
      switch (res.code) {
        case Dict.SUCCESS:
          this.$messageSuccess("入库登记成功");
          this.back();
          break;
        default:
          this.$messageError(res.mesg);
          break;
      }
    },
    /**下拉货主*/
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
    /**下拉仓库*/
    async _getdeliveryStores() {
      const param =
        this.storageclass === Dict.STORAGE_TYPE_OIL
          ? Dict.STORAGE_TYPE_OIL
          : Dict.STORAGE_TYPE_STEEL_WOOD;
      const res = await this.$api.getDeliveryStoreSelect(param);
      switch (res.code) {
        case Dict.SUCCESS:
          this.deliveryStoreList = _toArray_(res.data);
          break;
        default:
          this.$messageError(res.mesg);
          break;
      }
    },
    /**下拉区桩位*/
    async _getPilePositions(stockId) {
      const res = await this.$api.getPilePositionsData(stockId);
      switch (res.code) {
        case Dict.SUCCESS:
          this.pilePositionList = _toArray_(res.data);
          break;
        default:
          this.$messageError(res.mesg);
          break;
      }
    },
    /**下拉油罐*/
    async _getOilTankSelect(stockId) {
      const res = await this.$api.getOilTankSelect(stockId);
      switch (res.code) {
        case Dict.SUCCESS:
          this.oiltankList = _toArray_(res.data);
          break;
        default:
          this.$messageError(res.mesg);
          break;
      }
    },
    /**接收油品信息传递的对象*/
    acceptOilQuality(obj) {
      this.form.productId = obj.id;
      this.oilInfoObj = obj;
    },
    /**接收物资信息传递的对象*/
    acceptCommodity(obj) {
      this.form.goodsId = obj.id;
      this.commodityObj = obj;
    }
  },
  created() {
    let _this = this;
    this.storageclass = this.productType;
    this._getCargoList().then(() => {
      _this._getdeliveryStores();
    });
  },
  watch: {
    storageclass(newV, oldV) {
      if (newV && newV !== oldV) {
        this.setProductType(newV);
        this._getdeliveryStores().then(() => {
          this.clear();
        });
      }
    },
    "form.deliveryStoreId": {
      handler(newV, oldV) {
        if (newV !== oldV) {
          if (this.storageclass === Dict.PRODUCT_OIL) {
            this.oiltankList = [];
            this.form.oilTankId = null;
          } else {
            this.pilePositionList = [];
            this.form.pilePositionId = null;
          }
          if (newV) {
            setTimeout(() => {
              this.storageclass === Dict.PRODUCT_OIL
                ? this._getOilTankSelect(newV)
                : this._getPilePositions(newV);
            }, 20);
          }
        }
      }
    }
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