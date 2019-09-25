<template>
  <div class="container single-page">
    <hlBreadcrumb :data="breadTitle"></hlBreadcrumb>
    <div class="form">
      <el-form ref="form" :model="form" label-width="200px" size="small">
        <div class="form-block">
          <el-row>
            <el-col :md="12" :sm="12" :xs="24">
              <div class="head">商品信息</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item
                label="品类"
                prop="firstCatalogId"
                :rules="[{ required: true, message: '必选'  }]"
              >
                <el-select v-model="form.firstCatalogId" placeholder="请选择" size="small">
                  <el-option
                    v-for="(item,index) in firstCatalogList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item
                label="牌号"
                prop="secondCatalogId"
                :rules="[{ required: true, message:'必选'  }]"
              >
                <el-select v-model="form.secondCatalogId" placeholder="请选择" size="small">
                  <el-option
                    v-for="(item,index) in trademarkList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item
                label="排放标准"
                prop="emissionStandard"
                :rules="[{ required: true, message: '必选' }]"
              >
                <el-select v-model="form.emissionStandard" placeholder="请选择" size="small">
                  <el-option
                    v-for="(item,index) in HywEmissionStandardList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item
                label="密度(kg/m³)"
                prop="density"
                :rules="[{ required: true, message: '必填' }]"
              >
                <el-input v-model="form.density"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item
                label="产品型号"
                prop="productNumber"
                :rules="[{ required: true, message: '必填' }]"
              >
                <el-input v-model="form.productNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item
                label="生产商"
                prop="manufacturerId"
                :rules="[{ required: true, message: '必填' }]"
              >
                <el-select v-model="form.manufacturerId" placeholder="请选择" size="small">
                  <el-option
                    v-for="(item,index) in ManufacturerList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item
                label="商品图片"
                prop="fileId"
                :rules="[{ required: true, message: '请正确上传图片' }]"
              >
                <div class="imgBox" v-show="form.fileId">
                  <ImageBox :url="url" :onDelete="uploadDelete"></ImageBox>
                </div>
                <div class="imgBox" v-show="!(form.fileId)">
                  <ImageUpload :onSuccess="(file)=>{this.uploadSuceess(file)}"></ImageUpload>
                  <div
                    style="display:inline-block;vertical-align:text-bottom;font-size:12px;color:#333;margin-left:10px;"
                  >尺寸最大800*800。图片大小小于3M</div>
                </div>
                <el-input type="hidden" :value="form.fileId" style="display:inline;height:0"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="form-block" style="overflow-y:scroll;overflow-x:hidden" :style="computedHeight" id="parameterList" v-show="form.parameterList.length">
          <div class="head">参数信息</div>
          <el-row :gutter="30">
            <el-col
              :md="12"
              :sm="12"
              :xs="24"
              v-for="(item, index) in form.parameterList"
              :key="item.id"
            >
              <el-form-item
                :label="item.paraName"
                :prop="'parameterList.' + index + '.paraValue'"
                :rules="{required: true, message: '必填', trigger: 'blur'}"
              >
                <el-input v-model="item.paraValue"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="bottom">
          <el-form-item>
            <el-button type="primary" :loading="loading" @click="submitForm('form')">{{isEdit ? "更新" : "新增"}}</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import $ from "jquery";
import { mapState, mapMutations } from "vuex";
import { baseMixin, dictMixin } from "common/mixin";
import {findLabelByValue,findIndexByValue,_toArray_} from "common/util";
import Dict from "util/dict";
import hlBreadcrumb from "components/hl-breadcrumb";
import ImageBox from "components/ImageBox";
import ImageUpload from "components/ImageUpload";
// import { judgeAuth } from "util/util.js";

const defualtFormParams = {
  fileId: null, // 图片上传成功后返回的id
  firstCatalogId: null,
  secondCatalogId: null,
  emissionStandard: null,
  density: null,
  productNumber: null,
  manufacturerId: null,
  parameterList: []
};

export default {
  name: "oilQualityInfoForm",
  mixins: [baseMixin, dictMixin],
  components: {
    hlBreadcrumb,
    ImageBox,
    ImageUpload
  },
  data() {
    return {
      // 权限
      loading: false,
      url: "#", // 后台改成上传成功后返回的url
      form: { ...defualtFormParams },
      paramsList: [],
      /**参数列表一般是由牌号决定，但是编辑页面一开始进入的时候是唯一的外部触发*/
      ExternalTrigger: false,
      reservaSecondClassId: null,
      ManufacturerList: [],
      height:0
    };
  },
  computed: {
    ...mapState("oilQualityInfo", ["isEdit", "oilQualityInfoId"]),
    breadTitle() {
      return this.isEdit
        ? ["基础信息", "编辑油品信息"]
        : ["基础信息", "新增油品信息"];
    },
    computedHeight(){
      return `height:${this.height}px`
    }
  },
  methods: {
    ...mapMutations("oilQualityInfo", ["setIsEdit", "setoilQualityInfoId"]),
    back() {
      this.$router.push({
        path: "/web/yc/product/product/pageForSale"
      });
    },
    async _addOilQualityInfo_(params) {
      this.loading = true;
      const res = await this.$api.addOilQualityInfo(params);
      this.loading = false;
      switch (res.code) {
        case Dict.SUCCESS:
          this.$messageSuccess("新增商品成功");
          this.back();
          break;
        default:
          this.$messageError(res.mesg);
          break;
      }
    },
    async _updateOilQualityInfo_(params) {
      this.loading = true;
      const res = await this.$api.updateOilQualityInfo(params);
      this.loading = false;
      switch (res.code) {
        case Dict.SUCCESS:
          this.$messageSuccess("编辑商品成功");
          this.back();
          break;
        default:
          this.$messageError(res.mesg);
          break;
      }
    },
    _filter() {
      let params = _.clone(
        Object.assign(
          {},
          this.form,
          {
            firstCatalogName: findLabelByValue(
              this.firstCatalogList,
              this.form.firstCatalogId
            )
          },
          {
            secondCatalogName: findLabelByValue(
              this.trademarkList,
              this.form.secondCatalogId
            )
          },
          {
            manufacturerName: findLabelByValue(
              this.ManufacturerList,
              this.form.manufacturerId
            )
          },
          { url: this.url },
          {
            sellStateEnum: null,
            emissionStandardEnum: null
          }
        )
      );
      if (params.hasOwnProperty("manufacturerId_")) {
        delete params.manufacturerId_;
      }
      return params;
    },
    uploadSuceess(res) {
      this.url = res.data.url;
      this.form.fileId = res.data.id;
    },
    uploadDelete() {
      this.url = "#";
      this.form.fileId = null;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = this._filter();
          if (this.isEdit) {
            this._updateOilQualityInfo_(params);
          } else {
            this._addOilQualityInfo_(params);
          }
        } else {
          return false;
        }
      });
    },
    async _getParameter(id) {
      const res = await this.$api.getParameterById(id);
      switch (res.code) {
        case Dict.SUCCESS:
          this.paramsList = _.cloneDeep(res.data); // 万一以后有用
          this.form.parameterList = res.data.map(item => {
            return { ...item, paraValue: "" };
          });
          break;
        default:
          this.$messageError(res.mesg);
          break;
      }
    },
    async _getDetailCommodity(id) {
      const res = await this.$api.getDetailCommodity(id);
      switch (res.code) {
        case Dict.SUCCESS:
          this.url = res.data.picUrl || "#";
          this.reservaSecondClassId = _.cloneDeep(res.data.secondCatalogId);
          this.form = { ...res.data, secondCatalogId: null };
          break;
        default:
          this.$messageError(res.mesg);
          break;
      }
    },
    async _getFilesInfo(fileId) {
      const res = await this.$api.getFilesInfo({ fileId });
      switch (res.code) {
        case Dict.SUCCESS:
          this.url = res.data.url;
          break;
        default:
          this.$messageError(res.mesg);
          break;
      }
    },
    async _getProducerSelectList() {
      const res = await this.$api.getProducerSelectList();
      switch (res.code) {
        case Dict.SUCCESS:
          this.ManufacturerList = _toArray_(res.data);
          break;
        default:
          this.$messageError(res.mesg);
          break;
      }
    },
    setHeight(){
      this.height = document.body.clientHeight - document.getElementById("parameterList").getBoundingClientRect().top - 150;
    },
    perm() {},
    init() {
      setTimeout(() => {
        this.setHeight()
        this.perm();
      }, 20);
    }
  },
  mounted() {
    if (this.isEdit) {
      if (!this.oilQualityInfoId) {
        this.back();
      }
      this.ExternalTrigger = true;
      this._getAllBaseInfo(Dict.PRODUCT_OIL)
        .then(() => {
          this._getProducerSelectList();
        })
        .then(() => {
          this._getDetailCommodity(this.oilQualityInfoId);
        });
    } else {
      this._getAllBaseInfo(Dict.PRODUCT_OIL).then(() => {
          this._getProducerSelectList();
        });
    }
    this.init();
    $(window).bind("resize", _.throttle(() => {
      this.setHeight();
    }, 400));
  },
  destroyed () {
    $(window).off("resize");
  },
  created() {},
  beforeDestroy() {
    this.setIsEdit(false);
    this.setoilQualityInfoId(null);
  },
  watch: {
    "form.firstCatalogId": {
      handler(newV, oldV) {
        if (newV !== oldV) {
          if (newV) {
            const index = findIndexByValue(this.firstCatalogList, newV);
            this.trademarkList = this.firstCatalogList[index].child;
            if (this.ExternalTrigger) {
              this.form.secondCatalogId = this.reservaSecondClassId;
            } else {
              this.form.secondCatalogId = null;
            }
          }
        }
      }
    },
    "form.secondCatalogId": {
      handler(newV, oldV) {
        if (!newV) {
          setTimeout(() => {
            this.form.parameterList = [];
          }, 20);
          return;
        }
        if (this.ExternalTrigger) {
          this.ExternalTrigger = false;
          return;
        }
        if (newV !== oldV) {
          this._getParameter(newV);
        }
      }
    },
    "form.parameterList": {
      handler(newV, oldV) {
        if (newV !== oldV) {
          setTimeout(()=>{
            this.setHeight()
          },20)
        }
      }
    },
    "form.fileId": {
      handler(newV, oldV) {
        if (newV) {
          if (newV !== oldV && this.url === "#") {
            this._getFilesInfo(newV);
          }
        }
      }
    }
  }
};
</script>

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
