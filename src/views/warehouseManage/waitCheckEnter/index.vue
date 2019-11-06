<template>
  <div class="container single-page">
    <HletongBreadcrumb :data="breadTitle">
      <el-button
        type="primary"
        plain
        class="text-btn"
        size="small"
        icon="el-icon-download"
        :disabled="!equalShipperItems"
        @click="()=>{this.batchInspectionVisible = true}"
      >入库</el-button>
    </HletongBreadcrumb>
    <div class="search-box">
      <div class="form-item">
        <label>商品大类</label>
        <div class="form-control">
          <el-select v-model="storageclass" placeholder="请选择" size="small">
            <el-option
              v-for="(item,index) in typeProductDatas"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="form-item">
        <label>货主</label>
        <div class="form-control" v-if="!IS_SHIPPER">
         <cargoglass ref="cargoglass" @cargoSelect="acceptcargo"></cargoglass>          
        </div>
        <div class="form-control" v-if="IS_SHIPPER">
          <el-input size="small" :value="realname" :disabled="true"></el-input>
        </div>
      </div>
      <div class="form-item">
        <label>交割仓库</label>
        <div class="form-control">
          <el-select v-model="form.deliveryStoreId" placeholder="请选择" size="small">
            <el-option
              v-for="(item,index) in deliveryStoreList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="form-item" v-if="storageclass===Dict.PRODUCT_OIL">
        <label>储罐编号</label>
        <div class="form-control">
          <el-select v-model="form.oilTankId" placeholder="请选择" size="small">
            <el-option
              v-for="(item,index) in oiltankList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="form-item" v-if="storageclass===Dict.PRODUCT_OIL">
        <label>品类</label>
        <div class="form-control">
          <el-select v-model="form.firstCatalogId" placeholder="请选择" size="small">
            <el-option
              v-for="(item,index) in firstCatalogList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="form-item" v-if="storageclass===Dict.PRODUCT_OIL">
        <label>牌号</label>
        <div class="form-control">
          <el-select v-model="form.secondCatalogId" placeholder="请选择" size="small">
            <el-option
              v-for="(item,index) in trademarkList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="form-item" v-if="storageclass===Dict.PRODUCT_OIL">
        <label>排放标准</label>
        <div class="form-control">
          <el-select v-model="form.emissionStandard" placeholder="请选择" size="small">
            <el-option
              v-for="(item,index) in HywEmissionStandardList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>

      <div class="form-item" v-if="storageclass!==Dict.PRODUCT_OIL">
        <label>品名</label>
        <div class="form-control">
          <el-select v-model="form.productNameId" placeholder="请选择" size="small">
            <el-option
              v-for="(item,index) in productNameList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="form-item" v-if="storageclass!==Dict.PRODUCT_OIL">
        <label>材质</label>
        <div class="form-control">
          <el-select v-model="form.materialId" placeholder="请选择" size="small">
            <el-option
              v-for="(item,index) in materialList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="form-item" v-if="storageclass!==Dict.PRODUCT_OIL">
        <label>规格</label>
        <div class="form-control">
          <el-select v-model="form.specificationsId" placeholder="请选择" size="small">
            <el-option
              v-for="(item,index) in specificationsList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="form-item" v-if="storageclass!==Dict.PRODUCT_OIL">
        <label>产地</label>
        <div class="form-control">
          <el-select v-model="form.originPlaceId" placeholder="请选择" size="small">
            <el-option
              v-for="(item,index) in originPlaceList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="form-item">
        <el-button
          type="primary"
          :loading="isListDataLoading"
          @click="getListDataBylistParams"
          size="small"
        >查询</el-button>
        <el-button size="small" @click="clearListParams">重置</el-button>
      </div>
    </div>
    <heltable
      ref="tb"
      @pageChange="changePage"
      :total="listData.paginator.totalCount"
      :currentPage="listParams.page"
      :pageSize="listParams.pageSize"
      :pageSizes="[20]"
      :data="listData.list"
      :multiple="true"
      @selection-change="selectChange"
      :loading="isListDataLoading"
    >
      <el-table-column
        :align="item.align || 'left'"
        :prop="item.prop"
        :label="item.label"
        :key="item.id"
        v-for="(item) in tableHeader"
        :show-overflow-tooltip="showOverflowTooltip"
      >
        <template slot-scope="scope">
          <span>{{listData.list[scope.$index][item.prop]}}</span>
        </template>
      </el-table-column>
    </heltable>
    <transitiondialog
      :data="selectedItems"
      :tableHeader="tableHeader.slice(0,8)"
      :confirmCb="batchInspection"
      :visible="batchInspectionVisible"
      :cancelCb="()=>{this.batchInspectionVisible = false}"
      :title="titles[0]"
    ></transitiondialog>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import { baseMixin, dictMixin } from "common/mixin.js";
import { findIndexByValue } from "common/util.js";
// import { judgeAuth } from "@/util/util.js";
import _ from "lodash";
import Dict from "util/dict.js";
import heltable from "components/hl_table";
import transitiondialog from "components/transitiondialog";
import cargoglass from "components/cargoglass.vue";

const defaultFormData = {
  userId: null,
  deliveryStoreId: null,
  productNameId: null,
  materialId: null,
  specificationsId: null,
  originPlaceId: null,

  oilTankId: null,
  firstCatalogId: null,
  secondCatalogId: null,
  emissionStandard: null
};
const defaultListParams = {
  pageSize: 20,
  page: 1
};
const defaultListData = {
  paginator: {
    totalCount: 0,
    totalPage: 1
  },
  list: []
};
const defaultSWtableHeader = [
  {
    prop: "deliveryStore",
    label: "交割仓库",
    width: "180"
  },
  {
    prop: "name",
    label: "货主",
    width: "180"
  },
  {
    prop: "pilePosition",
    label: "区桩位",
    width: "180"
  },
  {
    prop: "productName",
    label: "品名",
    width: "180"
  },
  {
    prop: "materialName",
    label: "材质",
    width: "180"
  },
  {
    prop: "specificationsName",
    label: "规格",
    width: "180"
  },
  {
    prop: "originPlaceName",
    label: "产地",
    width: "180"
  },
  {
    prop: "supposedNumText",
    label: "应收数量",
    width: "180"
  },
  {
    prop: "supposedWeightText",
    label: "应收重量",
    width: "180"
  },
  {
    prop: "measuringText",
    label: "计量方式",
    width: "180"
  },
  {
    prop: "weightUnitText",
    label: "计量单位",
    width: "180"
  },  
];

const defaultOILtableHeader = [
  {
    prop: "deliveryStore",
    label: "交割仓库",
    width: "180"
  },
  {
    prop: "name",
    label: "货主",
    width: "180"
  },
  {
    prop: "oilTankCode",
    label: "储罐编号",
    width: "180"
  },
  {
    prop: "firstCatalogName",
    label: "品类",
    width: "180"
  },
  {
    prop: "secondCatalogName",
    label: "牌号",
    width: "180",
    align: "right"
  },
  {
    prop: "emissionStandardText",
    label: "排放标准",
    width: "180"
  },
  {
    prop: "serialNumber",
    label: "型号",
    width: "180"
  },
  {
    prop: "density",
    label: "密度",
    width: "180",
    align: "right"
  },
  {
    prop: "manufacturerName",
    label: "生产商",
    width: "180"
  },
  {
    prop: "supposedNumText",
    label: "应收数量",
    width: "180"
  },
  {
    prop: "supposedWeightText",
    label: "应收重量",
    width: "180"
  },
  {
    prop: "measuringText",
    label: "计量方式",
    width: "180"
  },
  {
    prop: "weightUnitText",
    label: "计量单位",
    width: "180"
  }  
];
const rowAdapter = (list) => {
    if (!list) {
        return []
    }
    if (list.length > 0) {
        list = list.map((row) => {
            return row = { 
              ...row,
              weightUnitText:row.weightUnitTypeEnum&&row.weightUnitTypeEnum.text || "-",
              measuringText:row.measuringTypeEnum&&row.measuringTypeEnum.text || "-",
              supposedNumText:`${row.supposedNum || "-"}`,
              supposedWeightText:`${row.supposedWeight || "-"}`,
            }
        })
    }
    return list
}

export default {
  name: "waitCheckEnter",
  mixins: [baseMixin, dictMixin],
  components: {
    heltable,
    transitiondialog,
    cargoglass
  },
  data() {
    return {
      breadTitle: ["仓储管理", "待验收入库"],
      // #region 各种lodaing
      isListDataLoading: false,
      batchInspectionVisible: false,
      // #endgion

      // #region 查询的基本数据结构
      listParams: { ...defaultListParams }, // 页数
      form: { ...defaultFormData }, // 查询参数
      listData: { ...defaultListData }, // 返回list的数据结构
      // #endgion
      showOverflowTooltip: true,
      /*多选的row*/
      selectedItems: [],
      titles: ["入库"],
      Dict: Dict
    };
  },
  computed: {
    ...mapGetters("app", ["role", "userId", "realname", "IS_SHIPPER"]),
    ...mapState("waitCheckEnter", ["productType"]),
    /**选中的必须是同一个货主才能出库和过户*/
    equalShipperItems() {
      let arr = this.selectedItems.map(item => item.userId);
      return new Set(arr).size === 1;
    },
    /**请求参数估计只要id*/
    ids() {
      return this.selectedItems.map(item => {
        return item.id;
      });
    },
    /**根据storageclass改变tableHeader*/
    tableHeader() {
      return this.storageclass === Dict.PRODUCT_OIL
        ? defaultOILtableHeader.slice()
        : defaultSWtableHeader.slice();
    }
  },
  methods: {
    ...mapMutations("waitCheckEnter", ["setInspection","setProductType"]),
    selectChange(selection) {
      this.selectedItems = selection.slice();
    },
    _filter() {
      if(this.IS_SHIPPER) {
        this.form.userId = this.userId;
      }
      return _.clone(
        Object.assign({}, this.form, this.listParams, {productTypeCode:this.storageclass})
      );
    },
    clear() {
      this.form = { ...defaultFormData };
      this.listParams = { ...defaultListParams };
      this.listData = { ...defaultListData };
    },
    clearListParams() {
      this.form = { ...defaultFormData };
      this.listParams = { ...defaultListParams };
      this.listData = { ...defaultListData };
      if(this.$refs.cargoglass) {
        this.$refs.cargoglass.clearValue();
      }
      setTimeout(()=>{
        this.getListData();
      },20)
    },
    changePage(page) {
      this.listParams.page = page;
      this.getListData();
    },
    getListDataBylistParams() {
      this.listParams = { ...defaultListParams };
      this.getListData();
    },
    async getListData() {
      let obj = this._filter();
      this.isListDataLoading = true;
      const res = await this.$api.getStockRegisterList(obj);
      this.isListDataLoading = false;
      switch (res.code) {
        case Dict.SUCCESS:
          this.listData = { ...res.data, list: rowAdapter(res.data.list) };
          break;
        default:
          this.listData = { ...defaultListData };
          this.$messageError(res.mesg);
          break;
      }
    },
    batchInspection() {
      this.setProductType(this.storageclass)
      this.setInspection(this.selectedItems);
      this.$router.push({
        path: "/web/yc/storage/stockRegister/page/checkEnter"
      });
    },
    /**接收货主传递的对象*/
    acceptcargo(obj) {
      this.form.userId = obj.userId;
    },
    init() {
      setTimeout(() => {
        this.clearListParams();
        this.perm();
      }, 20);
      this.perm();
    },
    perm() {}
  },
  mounted() {
    this.storageclass = this.productType;
    this.init();
    this._getAllBaseInfo(this.storageclass)
  },
  watch: {
    storageclass(newV, oldV) {
      if (newV !== oldV) {
        this.clear();
        /**如果新旧值都是钢木,不要再请求*/
        if (newV === Dict.PRODUCT_OIL || oldV === Dict.PRODUCT_OIL) {
          this._getAllBaseInfo(newV);
        }
        this.getListData();
      }
    },
    "form.deliveryStoreId": {
      handler(newV, oldV) {
        if (newV !== oldV) {
          this.form.productNameId = null;
          if (newV && this.storageclass === Dict.PRODUCT_OIL) {
            setTimeout(() => {
              const index = findIndexByValue(this.deliveryStoreList, newV);
              this.oiltankList = this.deliveryStoreList[index].child;
            }, 20);
          }
        }
      }
    },
    "form.firstCatalogId": {
      handler(newV, oldV) {
        if (newV !== oldV) {
          this.form.secondCatalogId = null;
          if (newV && this.storageclass === Dict.PRODUCT_OIL) {
            setTimeout(() => {
              const index = findIndexByValue(this.firstCatalogList, newV);
              this.trademarkList = this.firstCatalogList[index].child;
            }, 20);
          }
        }
      }
    }
  }
};
</script>

<style scoped lang="less">
.search-box {
  flex-wrap: wrap;
  margin: 0;
  .form-item {
    padding-top: 20px;
    .el-button {
      margin-top: 17px;
    }
  }
}
.tip {
  margin: 10px 0 20px 0;
  .line {
    font-size: 20px;
    color: red;
  }
}
</style>
