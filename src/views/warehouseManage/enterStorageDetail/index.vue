<template>
  <div class="container single-page">
    <HletongBreadcrumb :data="breadTitle"></HletongBreadcrumb>
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
      <div class="form-item">
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
      <div class="form-item">
        <label>规格/牌号</label>
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
      <div class="form-item">
        <label>生产商</label>
        <div class="form-control">
          <manufactureglass ref="manufactureglass" @manufactureSelect="acceptManufacture"></manufactureglass>
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
    <HletongTable
      ref="tb"
      @sizeChange="changePageSize"
      @pageChange="changePage"
      :total="listData.paginator.totalCount"
      :currentPage="listParams.page"
      :pageSize="listParams.pageSize"
      :data="listData.list"
      :blankCol="false"
      :loading="isListDataLoading"
    >
      <el-table-column
        :align="item.align || 'left'"
        :width="item.width || 'auto'"
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
      <el-table-column label="附件" width="120px" align="left">
        <template slot-scope="scope">
          <el-button type="text" @click="open(listData.list[scope.$index])">点击查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="120px" align="left">
        <template slot-scope="scope">
          <el-button type="text" @click="detail(listData.list[scope.$index])">入库单</el-button>
        </template>
      </el-table-column>
    </HletongTable>
    <tickets
      :visible="visible"
      :cancelCb="()=>{this.visible = false}"
      :contentId="contentId"
      title="入库单"
    >
      <template>
        <enterticket :id="contentId" :data="bill" :productType="storageclass"></enterticket>
      </template>
    </tickets>
    <PreviewImage ref="previewimage" :images="urlArr"></PreviewImage>
  </div>
</template>

<script>
// import NP from "number-precision";
import { mapGetters } from "vuex";
import { baseMixin } from "common/mixin.js";
import { findIndexByValue } from "common/util.js";
// import { judgeAuth } from "util/util.js";
import _ from "lodash";
import Dict from "util/dict.js";
import tickets from "components/tickets";
import enterticket from "./enterticket";
import cargoglass from "components/cargoglass.vue";
import manufactureglass from "components/manufactureglass.vue";
import PreviewImage from 'components/PreviewImage';

const defaultFormData = {
  userId: null,
  deliveryStoreId: null,

  oilTankId: null,
  firstCatalogId: null,
  secondCatalogId: null,

  manufactureId:null
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
    prop: "incomingTime",
    label: "入库日期",
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
    prop: "piles",
    label: "层数",
    width: "180",
    align: "right"
  },
  {
    prop: "firstCatalogName",
    label: "品类",
    width: "180"
  },
  {
    prop: "secondCatalogName",
    label: "规格/牌号",
    width: "180",
    align: "right"
  },
  {
    prop: "manufacturerName",
    label: "生产商",
    width: "180"
  },  
  {
    prop: "numText",
    label: "入库数量",
    width: "180"
  },
  {
    prop: "weightText",
    label: "入库重量",
    width: "180"
  },
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
    width: "180"
  },
  {
    prop: "oldIncomingIdText",
    label: "原始单号",
    width: "180"
  }
];

const defaultOILtableHeader = [
  {
    prop: "deliveryStore",
    label: "交割仓库",
    width: "180"
  },
  {
    prop: "incomingTime",
    label: "入库日期",
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
    prop: "manufacturerName",
    label: "生产商",
    width: "180"
  },
  {
    prop: "numText",
    label: "入库数量",
    width: "180"
  },
  {
    prop: "weightText",
    label: "入库重量",
    width: "180"
  },
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
    width: "180"
  },
  {
    prop: "oldIncomingIdText",
    label: "原始单号",
    width: "180"
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
        numText: `${row.num || "-"}${(row.num &&
          row.numUnitTypeEnum &&
          row.numUnitTypeEnum.text) ||
          ""}`,
        weightText: `${row.weight}${(row.weightUnitTypeEnum &&
          row.weightUnitTypeEnum.text) ||
          "-"}`,
        oldIncomingIdText: row.oldIncomingId || "-"
      });
    });
  }
  return list;
};

export default {
  name: "enterStorageDetail",
  mixins: [baseMixin],
  components: {
    tickets,
    enterticket,
    cargoglass,
    manufactureglass,
    PreviewImage      
  },
  data() {
    return {
      breadTitle: ["仓储管理", "入库明细"],
      isListDataLoading: false,
      listParams: { ...defaultListParams }, // 页数
      form: { ...defaultFormData }, // 查询参数
      listData: { ...defaultListData }, // 返回list的数据结构
      showOverflowTooltip: true,
      visible: false,
      contentId: "customers",
      bill: [],
      Dict,
      urlArr:[]
    };
  },
  computed: {
    ...mapGetters("app", ["role", "userId", "realname", "IS_SHIPPER"]),
    /**根据storageclass改变tableHeader*/
    tableHeader() {
      return this.storageclass === Dict.PRODUCT_OIL
        ? defaultOILtableHeader.slice()
        : defaultSWtableHeader.slice();
    }
  },
  methods: {
    _filter() {
      if(this.IS_SHIPPER) {
        this.form.userId = this.userId
      }
      return _.clone(Object.assign({}, this.form, this.listParams,{productTypeCode:this.storageclass}));
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
      if(this.$refs.manufactureglass) {
        this.$refs.manufactureglass.clearValue();
      }
      setTimeout(()=>{
        this.getListData();
      },20)
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
      const res = await this.$api.getStockRegisterDetailList(obj);
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
    async detail(item) {
      const { id } = item;
      const res = await this.$api.getStockRegisterBill({ id });
      switch (res.code) {
        case Dict.SUCCESS:
          this.bill = [res.data];
          this.visible = true;
          break;
        default:
          this.$messageError(`${res.mesg},无法获取入库单`);
          break;
      }
    },
    open(item){
      this.urlArr = [];
      const {picUrl} = item;
      if(!picUrl){
        this.$messageError("当前没有附件")
        return
      }
      this.urlArr.push(picUrl);
      setTimeout(()=>{
        this.$refs.previewimage.open();
      },50)
    },
    /**接收货主传递的对象*/
    acceptcargo(obj) {
      this.form.userId = obj.userId;
    },
    /**接生产商传递的对象*/    
    acceptManufacture(obj) {
      this.form.manufactureId = obj.id;
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
          }else{
            this.oiltankList = []
          }
        }
      }
    },
    "form.firstCatalogId": {
      handler(newV, oldV) {
        if (newV !== oldV) {
          this.form.secondCatalogId = null;
          if (newV) {
            setTimeout(() => {
              const index = findIndexByValue(this.firstCatalogList, newV);
              this.trademarkList = this.firstCatalogList[index].child;
            }, 20);
          }else {
            this.trademarkList = [];
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
