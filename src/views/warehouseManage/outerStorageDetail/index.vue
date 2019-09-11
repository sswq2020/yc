<template>
  <div class="container single-page">
    <hlBreadcrumb :data="breadTitle"></hlBreadcrumb>
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
          <el-select v-model="form.cargoId" placeholder="请选择" size="small">
            <el-option
              v-for="(item,index) in cargoList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="form-control" v-if="IS_SHIPPER">
          <el-input size="small" :value="username" :disabled="true"></el-input>
        </div>
      </div>
      <div class="form-item">
        <label>仓库</label>
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
        <label>油罐编号</label>
        <div class="form-control">
          <el-select v-model="form.oiltankId" placeholder="请选择" size="small">
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
          <el-select v-model="form.trademarkId" placeholder="请选择" size="small">
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
      @sizeChange="changePageSize"
      @pageChange="changePage"
      :total="listData.paginator.totalCount"
      :currentPage="listParams.page"
      :pageSize="listParams.pageSize"
      :data="listData.list"
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

      <el-table-column label="操作" fixed="right" width="100px" align="left">
        <template slot-scope="scope">
          <el-button type="text" @click="detail(listData.list[scope.$index])">出库单</el-button>
        </template>
      </el-table-column>
    </heltable>
    <tickets
      :visible="visible"
      :cancelCb="()=>{this.visible = false}"
      :contentId="contentId"
      title="出库单"
    >
      <template>
        <outerticket :id="contentId" :data="bill" :productType="storageclass"></outerticket>
      </template>
    </tickets>
  </div>
</template>

<script>
// import NP from "number-precision";
import { mapGetters } from "vuex";
import { baseMixin, dictMixin } from "common/mixin.js";
import { findIndexByValue } from "common/util.js";
// import { judgeAuth } from "util/util.js";
import _ from "lodash";
import { normalTime } from "util/util.js";
import Dict from "util/dict.js";
import heltable from "components/hl_table";
import hlBreadcrumb from "components/hl-breadcrumb";
import tickets from "components/tickets";
import outerticket from "./outerticket";

const defaultFormData = {
  cargoId: null,
  deliveryStoreId: null,
  productNameId: null,
  materialId: null,
  specificationsId: null,
  originPlaceId: null,

  oiltankId: null,
  firstCatalogId: null,
  trademarkId: null,
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
    label: "仓库",
    width: "180"
  },
  {
    prop: "actualRemovalTimeText",
    label: "实提日期",
    width: "180"
  },
  {
    prop: "cargoName",
    label: "货主",
    width: "180"
  },

  {
    prop: "pilePosition",
    label: "区桩位",
    width: "180"
  },
  {
    prop: "piles",
    label: "层数",
    width: "180",
    align: "right"
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
    prop: "supposedRemovalNumText",
    label: "开单数量",
    width: "180"
  },
  {
    prop: "actualRemovalNumText",
    label: "实提数量",
    width: "180"
  },
  // {
  //   prop: "numUnit",
  //   label: "数量单位",
  //   width: "180"
  // },
  {
    prop: "supposedRemovalWeightText",
    label: "开单重量",
    width: "180"
  },
  {
    prop: "actualRemovalWeightText",
    label: "实提重量",
    width: "180"
  },
  // {
  //   prop: "weightUnit",
  //   label: "重量单位",
  //   width: "180"
  // },
  {
    prop: "measuringText",
    label: "计量方式",
    width: "180"
  },
  {
    prop: "incomingTypeText",
    label: "入库类型",
    width: "180"
  },
  {
    prop: "incomingId",
    label: "入库单号",
    width: "180",
    align: "right"
  },
  {
    prop: "outsideTypeText",
    label: "性质",
    width: "180"
  },
  {
    prop: "consignee",
    label: "提货人",
    width: "180"
  },
  {
    prop: "pickUpPassword",
    label: "提货密码",
    width: "180",
    align: "right"
  }
];

const defaultOILtableHeader = [
  {
    prop: "deliveryStore",
    label: "仓库",
    width: "180"
  },
  {
    prop: "actualRemovalTimeText",
    label: "实提日期",
    width: "180"
  },
  {
    prop: "cargoName",
    label: "货主",
    width: "180"
  },

  {
    prop: "oiltank",
    label: "油罐编号",
    width: "180"
  },
  {
    prop: "firstCatalog",
    label: "品类",
    width: "180"
  },
  {
    prop: "trademark",
    label: "牌号",
    width: "180"
  },
  {
    prop: "emissionStandard",
    label: "排放标准",
    width: "180"
  },
  {
    prop: "density",
    label: "密度",
    width: "180"
  },
  {
    prop: "manufacturer",
    label: "生产商",
    width: "180"
  },
  {
    prop: "supposedRemovalNumText",
    label: "开单数量",
    width: "180"
  },
  {
    prop: "actualRemovalNumText",
    label: "实提数量",
    width: "180"
  },
  // {
  //   prop: "numUnit",
  //   label: "数量单位",
  //   width: "180"
  // },
  {
    prop: "supposedRemovalWeightText",
    label: "开单重量",
    width: "180"
  },
  {
    prop: "actualRemovalWeightText",
    label: "实提重量",
    width: "180"
  },
  // {
  //   prop: "weightUnit",
  //   label: "重量单位",
  //   width: "180"
  // },
  {
    prop: "measuringText",
    label: "计量方式",
    width: "180"
  },
  {
    prop: "incomingTypeText",
    label: "入库类型",
    width: "180"
  },
  {
    prop: "incomingId",
    label: "入库单号",
    width: "180",
    align: "right"
  },
  {
    prop: "outsideTypeText",
    label: "性质",
    width: "180"
  },
  {
    prop: "consignee",
    label: "提货人",
    width: "180"
  },
  {
    prop: "pickUpPassword",
    label: "提货密码",
    width: "180",
    align: "right"
  }
];

const rowAdapter = list => {
  if (!list) {
    return [];
  }
  if (list.length > 0) {
    list = list.map(row => {
      return (row = {
        ...row,
        piles: row.piles || "-",
        numUnitText: (row.numUnitTypeEnum && row.numUnitTypeEnum.text) || "-",
        weightUnitText:
          (row.weightUnitTypeEnum && row.weightUnitTypeEnum.text) || "-",
        measuringText:
          (row.measuringTypeEnum && row.measuringTypeEnum.text) || "-",
        incomingTypeText:
          (row.incomingTypeEnum && row.incomingTypeEnum.text) || "-",
        outsideTypeText:
          (row.outsideTypeEnum && row.outsideTypeEnum.text) || "-",
        actualRemovalTimeText: normalTime(row.actualRemovalTime),
        supposedRemovalNumText: `${row.supposedRemovalNum ||
          "-"}${(row.numUnitTypeEnum &&
          row.supposedRemovalNum &&
          row.numUnitTypeEnum.text) ||
          ""}`,
        actualRemovalNumText: `${row.actualRemovalNum ||
          "-"}${(row.numUnitTypeEnum &&
          row.actualRemovalNum &&
          row.numUnitTypeEnum.text) ||
          ""}`,
        supposedRemovalWeightText: `${row.supposedRemovalWeight ||
          0}${(row.weightUnitTypeEnum && row.weightUnitTypeEnum.text) || "-"}`,
        actualRemovalWeightText: `${row.actualRemovalWeight ||
          0}${(row.weightUnitTypeEnum && row.weightUnitTypeEnum.text) || "-"}`
      });
    });
  }
  return list;
};

export default {
  name: "outStorageDetail",
  mixins: [baseMixin, dictMixin],
  components: {
    heltable,
    hlBreadcrumb,
    tickets,
    outerticket
  },
  data() {
    return {
      breadTitle: ["仓储管理", "出库明细"],
      isListDataLoading: false,
      listParams: { ...defaultListParams }, // 页数
      form: { ...defaultFormData }, // 查询参数
      listData: { ...defaultListData }, // 返回list的数据结构
      showOverflowTooltip: true,
      visible: false,
      contentId: "customers",
      bill: [],
      Dict: Dict
    };
  },
  computed: {
    ...mapGetters("app", ["role", "userId", "username", "IS_SHIPPER"]),
    /**根据storageclass改变tableHeader*/
    tableHeader() {
      return this.storageclass === Dict.PRODUCT_OIL
        ? defaultOILtableHeader.slice()
        : defaultSWtableHeader.slice();
    }
  },
  methods: {
    _filter() {
      return _.clone(Object.assign({}, this.form, this.listParams));
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
      this.getListData();
    },
    changePage(page) {
      this.listParams.page = page;
      this.getListData();
    },
    changePageSize(pageSize) {
      this.listParams = { ...defaultListParams, pageSize: pageSize };
      this.getListData();
    },
    getListDataBylistParams() {
      this.listParams = { ...defaultListParams };
      this.getListData();
    },
    async getListData() {
      let obj = this._filter();
      this.isListDataLoading = true;
      const res = await this.$api.getStockRemovalDetailList(obj);
      this.isListDataLoading = false;
      switch (res.code) {
        case Dict.SUCCESS:
          this.listData = { ...res.data, list: rowAdapter(res.data.list) };
          break;
        default:
          this.$messageError(res.mesg);
          break;
      }
    },
    async detail(item) {
      const { removalId } = item;
      const res = await this.$api.getStockRemovalBill({ removalId });
      switch (res.code) {
        case Dict.SUCCESS:
          this.bill = res.data;
          this.visible = true;
          break;
        default:
          this.$messageError(`${res.mesg},无法获取出库单`);
          break;
      }
    },
    print() {},
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
    this._getAllBaseInfo(this.storageclass).then(() => {
      this.init();
    });
  },
  watch: {
    storageclass(newV, oldV) {
      if (newV !== oldV) {
        this.clear();
        /**如果新旧值都是钢木,不要再请求*/
        if (newV === Dict.PRODUCT_OIL || oldV === Dict.PRODUCT_OIL) {
          this._getAllBaseInfo(newV);
        }
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
          this.form.trademarkId = null;
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
</style>
