<template>
  <div class="container single-page" style="display: block;background-color: white;height: 100%;">
    <HletongBreadcrumb :data="breadTitle"></HletongBreadcrumb>
    <div class="computedHeight">
      <div class="form" v-if="form.needShowData.length">
        <el-form ref="form" :model="form" label-width="120px" size="small">
          <div class="form-block">
            <div class="head">提货信息</div>
            <el-row>
              <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
                <el-form-item label="货主:" prop="name">{{form.name}}</el-form-item>
              </el-col>
              <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
                <el-form-item label="提货人:" prop="consignee">{{form.consignee || "-"}}</el-form-item>
              </el-col>
              <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
                <el-form-item
                  label="提货密码:"
                  prop="pickUpPassword"
                  :rules="[{ required: true, message: '请输入提货密码', trigger: 'blur' },
                  { pattern: /^\d{6}$/,message: '必须是6位纯数字'}]"
                >
                  <el-input v-model="form.pickUpPassword"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="form-block" v-for="(item,index) in form.needShowData" :key="item.id">
            <div class="head">库存信息</div>
            <el-row>
              <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
                <el-form-item label="交割仓库:" prop="deliveryStore">{{item.deliveryStore}}</el-form-item>
              </el-col>
              <!--钢木开始-->
              <el-col
                :xl="8"
                :lg="12"
                :md="24"
                :sm="24"
                :xs="24"
                v-if="productType!==Dict.PRODUCT_OIL"
              >
                <el-form-item label="区桩位:" prop="pilePosition">{{item.pilePosition}}</el-form-item>
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
              <!--钢木结束-->

              <!--石油开始-->
              <el-col
                :xl="8"
                :lg="12"
                :md="24"
                :sm="24"
                :xs="24"
                v-if="productType===Dict.PRODUCT_OIL"
              >
                <el-form-item label="储罐编号:" prop="oilTankCode">{{item.oilTankCode}}</el-form-item>
              </el-col>
              <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
                <el-form-item label="品类:" prop="firstCatalogName">{{item.firstCatalogName}}</el-form-item>
              </el-col>
              <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
                <el-form-item label="规格/牌号:" prop="secondCatalogName">{{item.secondCatalogName}}</el-form-item>
              </el-col>
              <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
                <el-form-item label="生产商:" prop="manufacturerName">{{item.manufacturerName}}</el-form-item>
              </el-col>
              <!--石油结束-->
              <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
                <el-form-item label="应出数量:" prop="supposedRemovalNum">{{item.supposedRemovalNum}}</el-form-item>
              </el-col>
              <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
                <el-form-item
                  label="应出重量:"
                  prop="supposedRemovalWeight"
                >{{item.supposedRemovalWeight}}</el-form-item>
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
                  label="实提数量:"
                  :prop="'needShowData.' + index + '.actualRemovalNum'"
                  :rules="validatenum(item.supposedRemovalNum)"
                >
                  <el-input v-model.number="item.actualRemovalNum"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xl="8" :lg="12" :md="24" :sm="24" :xs="24">
                <el-form-item
                  label="实提重量:"
                  :prop="'needShowData.' + index + '.actualRemovalWeight'"
                  :rules="validateweight(item.supposedRemovalWeight)"
                >
                  <el-input v-model="item.actualRemovalWeight"></el-input>
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
          </div>
        </el-form>
      </div>
    </div>
    <div class="bottom">
      <el-button
        type="primary"
        v-if="ycremoval"
        size="small"
        :loading="loading"
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
const defualtFormParams = {
  pickUpPassword: null,
  name: null,
  consignee: null
};

export default {
  name: "checkOuter",
  components: {
    ImageBox,
    ImageUpload
  },
  data() {
    return {
      loading: false,
      breadTitle: ["仓储管理", "待验收入库", "验收出库"],
      disabled: true,
      form: {
        needShowData: [],
        ...defualtFormParams
      },
      Dict: Dict,
      ycremoval: false
    };
  },
  computed: {
    ...mapState("waitCheckOuter", ["retrieval", "productType"])
  },
  methods: {
    back() {
      this.$router.push({
        path: "/web/yc/storage/stockRemoval/page"
      });
    },
    validateweight(weight, max = null) {
      return [
        {
          required: true,
          message: "请输入实提重量",
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
      const { pickUpPassword } = this.form;
      const params = this.form.needShowData.map(item => {
        return Object.assign(
          { pickUpPassword },
          item,
          { productTypeCode: this.productType },
          { weightUnitTypeEnum: null },
          { numUnitTypeEnum: null },
          { measuringTypeEnum: null }
        );
      });
      return params;
    },
    async _removalCheck_(params) {
      this.loading = true;
      const res = await this.$api.DoRemovalCheck(params);
      this.loading = false;
      switch (res.code) {
        case Dict.SUCCESS:
          this.$messageSuccess("验收出库成功");
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
          this._removalCheck_(params);
        } else {
          return false;
        }
      });
    },
    async getDetail(removalId) {
      const res = await this.$api.detailRetrieval({ removalId });
      switch (res.code) {
        case Dict.SUCCESS:
          res.data = res.data.slice().map(item => {
            return Object.assign({}, item, {
              measuringText:
                (item.measuringTypeEnum && item.measuringTypeEnum.text) || "-",
              weightUnitText:
                (item.weightUnitTypeEnum && item.weightUnitTypeEnum.text) ||
                "-",
              actualRemovalNum: null,
              actualRemovalWeight: null,
              remark: item.remark || null,
              fileId:null,
              url:"#",
            });
          });
          this.form = Object.assign(
            {},
            {
              consignee: res.data[0].consignee,
              name: res.data[0].name
            },
            { needShowData: res.data }
          );
          break;
        default:
          this.$messageError(res.mesg);
          break;
      }
    },
    init() {
      if (!this.retrieval) {
        this.back();
      } else {
        this.getDetail(this.retrieval);
      }
    },
    perm() {
      this.ycremoval = judgeAuth("ycstore:stockremoval:removal");
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
    &:last-child {
      margin-left: 16px;
    }
  }
}
</style>
