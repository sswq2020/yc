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
              <el-form-item label="日期" prop="registerTime">
                <el-date-picker v-model="form.registerTime" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="货主" prop="cargoId">
                <el-select v-model="form.cargoId" placeholder="请选择" size="small">
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
          <el-row :gutter="50">
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="入库类型" prop="incomingType">
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
          <el-row :gutter="50">
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="品名" prop="productNameId">
                <el-select v-model="form.productNameId" placeholder="请选择" size="small">
                  <el-option
                    v-for="(item,index) in productNameList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="材质" prop="materialId">
                <el-select v-model="form.materialId" placeholder="请选择" size="small">
                  <el-option
                    v-for="(item,index) in materialList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="规格" prop="specificationsId">
                <el-select v-model="form.specificationsId" placeholder="请选择" size="small">
                  <el-option
                    v-for="(item,index) in specificationsList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="产地" prop="originPlaceId">
                <el-select v-model="form.originPlaceId" placeholder="请选择" size="small">
                  <el-option
                    v-for="(item,index) in originPlaceList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="计量方式" prop="measuring">
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
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="应收数量" prop="supposedNum">
                <el-input v-model.number="form.supposedNum"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="重量单位" prop="weightUnit">
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
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="应收重量" prop="supposedWeight">
                <el-input v-model.number="form.supposedWeight"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="数量单位" prop="numUnit">
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
          </el-row>
        </div>
        <div class="form-block">
          <div class="head">仓库信息</div>
          <el-row :gutter="50">
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="交易仓库" prop="deliveryStoreId">
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
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="区桩位" prop="pilePositionId">
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
          </el-row>
        </div>
        <div class="bottom">
          <el-form-item>
            <el-button type="primary" :loading="loading" @click="submitForm('form')">确定</el-button>
            <el-button @click="back">取消</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import hlBreadcrumb from "@/components/hl-breadcrumb";
import Dict from "@/util/dict.js";
import { dictMixin } from "@/common/mixin.js";
import { _toArray_ } from "@/common/util";
const defualtFormParams = {
  registerTime: new Date(), // 登记日期
  cargoId: null, // 货主id
  incomingType: null, //入库类型
  productNameId: null, // 品名id
  materialId: null, // 材料id
  specificationsId: null, //规格id
  originPlaceId: null, //产地id
  deliveryStoreId: null, //交易仓库id
  pilePositionId: null, //区桩位id
  measuring: null, // 计量方式
  supposedNum: null, // 应收数量
  supposedWeight: null, // 应收重量
  weightUnit: null, // 数量单位
  numUnit: null // 重量单位
};

const RULES = {
  registerTime: [
    { required: true, message: "请输入登记日期", trigger: "blur" }
  ],
  cargoId: [{ required: true, message: "请输入货主", trigger: "blur" }],
  incomingType: [
    { required: true, message: "请选择入库类型", trigger: "blur" }
  ],
  productNameId: [{ required: true, message: "请选择品名", trigger: "blur" }],
  materialId: [{ required: true, message: "请选择材料", trigger: "blur" }],
  specificationsId: [
    { required: true, message: "请选择规格", trigger: "blur" }
  ],
  originPlaceId: [{ required: true, message: "请选择产地", trigger: "blur" }],
  deliveryStoreId: [
    { required: true, message: "请选择交易仓库", trigger: "blur" }
  ],
  pilePositionId: [
    { required: true, message: "请选择区桩位", trigger: "blur" }
  ],
  measuring: [{ required: true, message: "请选择计量方式", trigger: "blur" }],
  supposedNum: [{ required: true, message: "请输入应收数量", trigger: "blur" }],
  supposedWeight: [
    { required: true, message: "请输入应收重量", trigger: "blur" }
  ],
  weightUnit: [{ required: true, message: "请选择数量单位", trigger: "blur" }],
  numUnit: [{ required: true, message: "请选择重量单位", trigger: "blur" }]
};

export default {
  name: "enterStorageRegister",
  mixins: [dictMixin],
  components: {
    hlBreadcrumb
  },
  data() {
    return {
      loading: false,
      breadTitle: ["仓储管理", "库存表", "入库登记"],
      form: { ...defualtFormParams },
      rules: RULES,
      productNameList: [],
      materialList: [],
      specificationsList: [],
      originPlaceList: [],
      pilePositionList: [],
      cargoList: [],
      deliveryStoreList: []
    };
  },
  computed:{
    productName(){
      const index = this.productNameList.findIndex((item) => {
        return item.value = this.form.productNameId;
      })
      if(index > -1) {
        return this.productNameList[index].label
      } else {
        return null
      }
    },
    materialName(){
      const index = this.materialList.findIndex((item) => {
        return item.value = this.form.materialId;
      })
      if(index > -1) {
        return this.materialList[index].label
      } else {
        return null
      }
    },
    specificationsName(){
      const index = this.specificationsList.findIndex((item) => {
        return item.value = this.form.specificationsId;
      })
      if(index > -1) {
        return this.specificationsList[index].label
      } else {
        return null
      }
    },
    originPlaceName(){
      const index = this.originPlaceList.findIndex((item) => {
        return item.value = this.form.originPlaceId;
      })
      if(index > -1) {
        return this.originPlaceList[index].label
      } else {
        return null
      }
    },
    cargoName(){
      const index = this.cargoList.findIndex((item) => {
        return item.value = this.form.cargoId;
      })
      if(index > -1) {
        return this.cargoList[index].label
      } else {
        return null
      }
    },
    deliveryStore(){
      const index = this.deliveryStoreList.findIndex((item) => {
        return item.value = this.form.deliveryStoreId;
      })
      if(index > -1) {
        return this.deliveryStoreList[index].label
      } else {
        return null
      }
    },
    pilePosition(){
      const index = this.pilePositionList.findIndex((item) => {
        return item.value = this.form.pilePositionId;
      })
      if(index > -1) {
        return this.pilePositionList[index].label
      } else {
        return null
      }
    },
  },
  methods: {
    back() {
      this.$router.push({
        path: "/web/yc/storage/stockInventory/page"
      });
    },
    async _addStockRegister_() {
      this.loading = true;
      const res = await this.$api.addStockRegister(this.form);
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
    _filter(){
      this.form = Object.assign({},
      this.form,
       {productName:this.productName},
       {materialName:this.materialName},
       {specificationsName:this.specificationsName},
       {originPlaceName:this.originPlaceName},
       {cargoName:this.cargoName},
       {deliveryStore:this.deliveryStore},
       {pilePosition:this.pilePosition}
      )
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this._filter();
          this._addStockRegister_();
        } else {
          return false;
        }
      });
    },
    /** 下拉品名*/
    async getSelectProducts() {
      const res = await this.$api.getProductNameData();
      switch (res.code) {
        case Dict.SUCCESS:
          this.productNameList = _toArray_(res.data);
          break;
        default:
          this.$messageError(res.mesg);
          break;
      }
    },
    /** 下拉材质*/
    async getMaterials(productNameId) {
      const res = await this.$api.getMaterialsData({productNameId});
      switch (res.code) {
        case Dict.SUCCESS:
          this.materialList = _toArray_(res.data);
          break;
        default:
          this.$messageError(res.mesg);
          break;
      }
    },
    /** 下拉规格*/
    async getSpecs(productNameId,materialId) {
      const res = await this.$api.getSpecsData({productNameId,materialId});
      switch (res.code) {
        case Dict.SUCCESS:
          this.specificationsList = _toArray_(res.data);
          break;
        default:
          this.$messageError(res.mesg);
          break;
      }
    },
    /** 下拉产地*/
    async getOriginPlaces(productNameId,materialId,specificationsId) {
      const res = await this.$api.getOriginPlacesData({productNameId,materialId,specificationsId});
      switch (res.code) {
        case Dict.SUCCESS:
          this.originPlaceList = _toArray_(res.data);
          break;
        default:
          this.$messageError(res.mesg);
          break;
      }
    },
    async _getAllBaseInfo() {
      let _this = this;
      const response = await this.$api.getAllBaseInfo();
      switch (response.code) {
        case Dict.SUCCESS:
          Object.keys(response.data).forEach(item => {
            if (
              item === "cargoMap" ||
              item === "deliveryStoreMap" ||
              item === "pilePositionMap"
            ) {
              _this[item.slice(0, -3) + "List"] = _toArray_(
                response.data[item]
              );
            }
          });
          break;
        default:
          break;
      }
    }
  },
  created() {
    this.getSelectProducts();
    this._getAllBaseInfo();
  },
  watch:{
    'form.productNameId':{
      handler(newV,oldV) {
        let this_ = this;
         if(newV !== oldV) {
            this_.materialList = [];
            this_.form.materialId = null;
            this_.getMaterials(newV);
         }
      },
      // immediate: true,
     },
    'form.materialId':{
      handler(newV,oldV) {
        let this_ = this;
         if(newV !== oldV) {
            this_.specificationsList = [];
            this_.form.specificationsId = null;
            this_.getSpecs(this.form.productNameId,newV);
         }
      },
      // immediate: true,
     },
    'form.specificationsId':{
      handler(newV,oldV) {
        let this_ = this;
         if(newV !== oldV) {
            this_.originPlaceList =  [];
            this_.form.originPlaceId = null;
            this_.getOriginPlaces(this.form.productNameId,this.form.materialId,newV);
         }
      },
      // immediate: true,
     },
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
