<template>
  <div class="container single-page" style="display: block;background-color: white;height: 100%;">
    <HletongBreadcrumb :data="breadTitle"></HletongBreadcrumb>
    <div class="computedHeight">
      <div class="form" v-if="form.needShowData.length">
        <el-form ref="form" :model="form" label-width="120px" size="small">
          <div class="form-block" v-for="(item,index) in form.needShowData" :key="item.id">
            <div class="head">基本信息</div>
            <el-row>
              <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
                <el-form-item label="预报日期:" prop="registerTime">{{item.registerTime}}</el-form-item>
              </el-col>
              <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
                <el-form-item label="货主:" prop="name">{{item.name}}</el-form-item>
              </el-col>
              <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
                <el-form-item label="入库类型:" prop="incomingTypeText">{{item.incomingTypeText||"-"}}</el-form-item>
              </el-col>
            </el-row>
            <div class="head">仓库信息</div>
            <el-row>
              <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
                <el-form-item label="交割仓库:" prop="deliveryStore">{{item.deliveryStore}}</el-form-item>
              </el-col>
              <el-col
                :xl="8"
                :lg="12"
                :md="24"
                :sm="24"
                :xs="24"
              >
                <el-form-item label="区桩位:" prop="pilePosition">{{item.pilePosition}}</el-form-item>
              </el-col>
              <el-col
                :xl="8"
                :lg="12"
                :md="24"
                :sm="24"
                :xs="24"
                v-if="productType===Dict.PRODUCT_OIL"
              >
                <el-form-item label="储罐号" :prop="'needShowData.' + index + '.oilTankCode'">
                    <!-- <el-input v-model="item.oilTankCode"></el-input> -->

                    <el-select v-model="item.oilTankId" placeholder="请选择" size="small">
                      <el-option
                        v-for="(item,index) in oiltankList"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>

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
                <el-form-item label="层数:" prop="piles">{{item.piles}}</el-form-item>
              </el-col>
            </el-row>
            <div class="head">商品信息</div>
            <el-row>
              <el-col
                :xl="8"
                :lg="12"
                :md="24"
                :sm="24"
                :xs="24"
              >
                <el-form-item label="品类:" prop="firstCatalogName">{{item.firstCatalogName}}</el-form-item>
              </el-col>
              <el-col
                :xl="8"
                :lg="12"
                :md="24"
                :sm="24"
                :xs="24"
              >
                <el-form-item label="规格/牌号:" prop="secondCatalogName">{{item.secondCatalogName}}</el-form-item>
              </el-col>
              <!--石油开始-->
              <!-- <el-col
                :xl="8"
                :lg="12"
                :md="24"
                :sm="24"
                :xs="24"
                v-if="productType===Dict.PRODUCT_OIL"
              >
                <el-form-item label="密度(kg/m³):" :prop="'needShowData.' + index + '.density'"
                :rules="[{pattern: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,3})?$/,message: '正数可以包含3位小数'}]">
                    <el-input v-model="item.density"></el-input>
                </el-form-item>
              </el-col> -->
              <el-col
                :xl="8"
                :lg="12"
                :md="24"
                :sm="24"
                :xs="24"
              >
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
                <el-form-item label="计量方式:" prop="measuringText">{{item.measuringText}}</el-form-item>
              </el-col>
              <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
                <el-form-item label="备注:" prop="remark">{{item.remark}}</el-form-item>
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

              <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
                <!-- <el-form-item
                  label="单据上传"
                  :prop="'needShowData.' + index + '.fileId'"
                  :rules="[{ required: true, message: '请正确上传图片' }]"
                > -->
                <el-form-item
                  label="单据上传"
                  :prop="'needShowData.' + index + '.fileId'"
                >                
                  <div class="imgBox" style="display:inline-block;" v-show="item.fileId">
                    <ImageBox :url="item.url" :onDelete="()=>{uploadDelete(index)}"></ImageBox>
                  </div>
                  <div class="imgBox" style="display:inline-block;" v-show="!(item.fileId)">
                    <ImageUpload :onSuccess="(file)=>{uploadSuceess(file,index)}"></ImageUpload>
                  </div>
                  <el-input type="hidden" :value="item.fileId" style="display:inline;height:0"></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row></el-row>
          </div>
        </el-form>
      </div>
    </div>
    <div class="bottom">
      <el-button
        type="primary"
        v-if="ycexamine"
        :loading="loading"
        size="small"
        @click="submitForm('form')"
      >确定</el-button>
      <el-button @click="back" size="small">取消</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import _ from 'lodash'
import Dict from "@/util/dict.js";
import { judgeAuth } from "util/util.js";
import ImageBox from "components/ImageBox";
import ImageUpload from "components/ImageUpload";
import {
  _toArray_,
  // handleFilterSelf,
  findLabelByValue,
  // DICT_SELECT_ARR
} from "common/util";
export default {
  name: "checkEnter",
  components: {
    ImageBox,
    ImageUpload
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
      ycexamine: false
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
    /**下拉储罐*/
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
      let that = this;
      const params = this.form.needShowData.map(item => {
        return Object.assign(
          {},
          item,
          { oilTankCode:findLabelByValue(that.oiltankList,item.oilTankId)},
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
    uploadDelete(index) {
      let copyObj = _.cloneDeep(this.form.needShowData[index])
      /**不要直接使用array[index] = item,Vue无法观察数组的变化,必须用变异的函数*/
      this.form.needShowData.splice(index,1,{...copyObj,url:"#",fileId:null})
    },
    uploadSuceess(res,index) {
      const {url,id} = res.data;
      let copyObj = _.cloneDeep(this.form.needShowData[index])   
      /**不要直接使用array[index] = item,Vue无法观察数组的变化,必须用变异的函数*/
      this.form.needShowData.splice(index,1,{...copyObj,url,fileId:id})      
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
        const stockId = this.inspection[0].deliveryStoreId;
        this._getOilTankSelect(stockId).then(()=>{
          this.form.needShowData = this.inspection.slice().map(item => {
            return Object.assign(
              {},
              item,
              { num: null, weight: null,remark:item.remark || null },
              {
                measuringText:
                  (item.measuringTypeEnum && item.measuringTypeEnum.text) || "-",
                weightUnitText:
                  (item.weightUnitTypeEnum && item.weightUnitTypeEnum.text) || "-"
              },
              {
                fileId:null,
                url:"#"
              }
            );
          });
        })
      }
    },
    perm() {
      this.ycexamine = judgeAuth("ycstore:stockregister:examine");
    }
  },
  mounted() {
    setTimeout(() => {
      this.perm();
    });
  },
  created() {
    this.init();
  }
};
</script>

<style scoped lang="less">
.computedHeight {
  height: calc(100% - 101px);
  overflow: auto;
  .form {
    .form-block {
      padding: 20px;
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
    &:last-child{
      margin-left: 16px;
    }
  }
}
</style>
