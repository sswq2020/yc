<template>
  <div class="container single-page">
    <hlBreadcrumb :data="breadTitle">
      <el-button
        class="hlB_buts"
        size="small"
        icon="el-icon-download"
        v-if="!IS_SHIPPER"
        @click="GoEnterRegister"
      >入库登记</el-button>
      <el-button
        class="hlB_buts"
        size="small"
        icon="el-icon-bank-card"
        :disabled="!equalShipperItems"
        @click="()=>{this.batchCheckOutVisible = true}"
      >出库申请</el-button>
      <el-button
        class="hlB_buts"
        size="small"
        icon="el-icon-bank-card"
        :disabled="!equalShipperItems"
        v-if="!IS_SHIPPER"
        @click="()=>{this.batchTransferOwnershipVisible = true}"
      >过户</el-button>
      <el-button
        class="hlB_buts"
        size="small"
        icon="el-icon-bank-card"
        v-if="!IS_SHIPPER"
        @click="()=>{this.batchFrozenVisible=true}"
      >冻结</el-button>
      <el-button
        class="hlB_buts"
        size="small"
        icon="el-icon-bank-card"
        v-if="!IS_SHIPPER"
        @click="()=>{this.batchUnFrozenVisible = true}"
      >解冻</el-button>
    </hlBreadcrumb>
    <div class="search-box">
      <div class="form-item">
        <label>货主</label>
        <div class="form-control" v-if="!IS_SHIPPER">
          <el-select v-model="form.param_1" placeholder="请选择" size="small">
            <el-option
              v-for="(item,index) in ShipperList"
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
          <el-select v-model="form.param_2" placeholder="请选择" size="small">
            <el-option
              v-for="(item,index) in storageList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="form-item">
        <label>品名</label>
        <div class="form-control">
          <el-select v-model="form.param_3" placeholder="请选择" size="small">
            <el-option
              v-for="(item,index) in ProductNameList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="form-item">
        <label>材质</label>
        <div class="form-control">
          <el-select v-model="form.param_4" placeholder="请选择" size="small">
            <el-option
              v-for="(item,index) in MaterialList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="form-item">
        <label>规格</label>
        <div class="form-control">
          <el-select v-model="form.param_5" placeholder="请选择" size="small">
            <el-option
              v-for="(item,index) in SpecificationList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="form-item">
        <label>产地</label>
        <div class="form-control">
          <el-select v-model="form.param_6" placeholder="请选择" size="small">
            <el-option
              v-for="(item,index) in OriginPlaceList"
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
        align="center"
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

      <el-table-column label="操作" fixed="right" width="60px" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="detail(listData.list[scope.$index])">查看明细</el-button>
        </template>
      </el-table-column>
    </heltable>
    <transitiondialog
      :data="selectedItems"
      :tableHeader="tableHeader.slice(0,8)"
      :confirmCb="batchCheckOut"
      :visible="batchCheckOutVisible"
      :loading="isbatchCheckOutLoading"
      :cancelCb="()=>{this.batchCheckOutVisible = false}"
      :title="titles[0]"
    ></transitiondialog>
    <transitiondialog
      :data="selectedItems"
      :tableHeader="tableHeader.slice(0,8)"
      :confirmCb="batchTransferOwnership"
      :visible="batchTransferOwnershipVisible"
      :loading="isbatchTransferOwnershipLoading"
      :cancelCb="()=>{this.batchTransferOwnershipVisible = false}"
      :title="titles[1]"
    ></transitiondialog>
    <transitiondialog
      :data="selectedItems"
      :tableHeader="tableHeader.slice(0,8)"
      :confirmCb="batchFrozen"
      :visible="batchFrozenVisible"
      :loading="isbatchFrozenLoading"
      :cancelCb="()=>{this.batchFrozenVisible = false}"
      :title="titles[2]"
    ></transitiondialog>
    <transitiondialog
      :data="selectedItems"
      :tableHeader="tableHeader.slice(0,8)"
      :confirmCb="batchUnFrozen"
      :visible="batchUnFrozenVisible"
      :loading="isbatchUnFrozenLoading"
      :cancelCb="()=>{this.batchUnFrozenVisible = false}"
      :title="titles[3]"
    ></transitiondialog>
  </div>
</template>

<script>
// import NP from "number-precision";
import { mapGetters, mapMutations } from "vuex";
import { baseMixin } from "@/common/mixin.js";
// import { judgeAuth } from "@/util/util.js";
import _ from "lodash";
import Dict from "@/util/dict.js";
import heltable from "@/components/hl_table";
import hlBreadcrumb from "@/components/hl-breadcrumb";
import transitiondialog from "@/components/transitiondialog";

const defaultFormData = {
  param_1: "",
  param_2: "",
  param_3: "",
  param_4: "",
  param_5: "",
  param_6: ""
};
const defaultListParams = {
  pageSize: 20,
  currentPage: 1
};
const defaultListData = {
  paginator: {
    totalCount: 0,
    totalPage: 1
  },
  list: []
};
const defaulttableHeader = [
  {
    prop: "mock1",
    label: "仓库",
    width: "180"
  },
  {
    prop: "mock2",
    label: "入库天数",
    width: "180"
  },
  {
    prop: "mock4",
    label: "货主",
    width: "180"
  },
  {
    prop: "mock5",
    label: "区桩位",
    width: "180"
  },
  {
    prop: "shipper",
    label: "货主",
    width: "180"
  },
  {
    prop: "mock7",
    label: "品名",
    width: "180"
  },
  {
    prop: "mock8",
    label: "材质",
    width: "180"
  },
  {
    prop: "mock9",
    label: "规格",
    width: "180"
  },
  {
    prop: "mock10",
    label: "产地",
    width: "180"
  },
  {
    prop: "mock11",
    label: "库存数量",
    width: "180"
  },
  {
    prop: "mock12",
    label: "数量单位",
    width: "180"
  },
  {
    prop: "reserveweight",
    label: "库存重量",
    width: "180"
  },
  {
    prop: "mock14",
    label: "重量单位",
    width: "180"
  },
  {
    prop: "mock15",
    label: "计量方式",
    width: "180"
  },
  {
    prop: "mock16",
    label: "入库类型",
    width: "180"
  },
  {
    prop: "mock17",
    label: "入库单号",
    width: "180"
  },
  {
    prop: "mock18",
    label: "入库时间",
    width: "180"
  }
];
export default {
  name: "inventoryTable",
  mixins: [baseMixin],
  components: {
    heltable,
    hlBreadcrumb,
    transitiondialog
  },
  data() {
    return {
      breadTitle: ["仓储管理", "库存表"],
      // #region 各种lodaing
      isListDataLoading: false,
      isbatchTransferOwnershipLoading: false,
      isbatchFrozenLoading: false,
      isbatchUnFrozenLoading: false,
      isbatchCheckOutLoading: false,
      // #endgion

      // #region 各个弹窗的visible
      batchTransferOwnershipVisible: false,
      batchFrozenVisible: false,
      batchUnFrozenVisible: false,
      batchCheckOutVisible: false,
      // #endgion

      // #region 查询的基本数据结构
      listParams: { ...defaultListParams }, // 页数
      form: { ...defaultFormData }, // 查询参数
      listData: { ...defaultListData }, // 返回list的数据结构
      // #endgion
      /**表格相关*/
      tableHeader: defaulttableHeader,
      showOverflowTooltip: true,
      /*多选的row*/
      selectedItems: [],
      titles: ["批量出库登记", "批量过户", "批量冻结", "批量解冻"]
    };
  },
  computed: {
    ...mapGetters("app", ["role", "userId", "username", "IS_SHIPPER"]),
    /**选中的必须是同一个货主才能出库和过户*/
    equalShipperItems() {
      let arr = this.selectedItems.map(item => item.shipper);
      return new Set(arr).size === 1;
    },
    /**请求参数估计只要id*/
    ids() {
      return this.selectedItems.map(item => {
        return item.id;
      });
    }
  },
  methods: {
    ...mapMutations("inventoryManage", ["setTransferOwnership", "setCheckout","setFindDetail"]),
    selectChange(selection) {
      this.selectedItems = selection.slice();
    },
    _filter() {
      if (this.IS_SHIPPER) {
        this.form.param_1 = this.userId;
      }
      return _.clone(Object.assign({}, this.form, this.listParams));
    },
    clearListParams() {
      this.form = { ...defaultFormData };
      this.listParams = { ...defaultListParams };
      this.listData = { ...defaultListData };
      this.getListData();
    },
    changePage(currentPage) {
      this.listParams.currentPage = currentPage;
      this.getListData();
    },
    getListDataBylistParams() {
      this.listParams = { ...defaultListParams };
      this.getListData();
    },
    async getListData() {
      let obj = this._filter();
      this.isListDataLoading = true;
      const res = await this.$api.getInventoryTable(obj);
      this.isListDataLoading = false;
      switch (res.code) {
        case Dict.SUCCESS:
          this.listData = res.data;
          break;
        default:
          this.listData = { ...defaultListData };
          this.$Message.error(res.errMsg);
          break;
      }
    },
    async batchTransferOwnership() {
      this.isbatchTransferOwnershipLoading = true;
      const res = await this.$api.getSurplus(this.ids);
      this.isbatchTransferOwnershipLoading = false;
      switch (res.code) {
        case Dict.SUCCESS:
          if (res.data.HasSurPlus) {
            this.batchTransferOwnershipVisible = false;
            this.setTransferOwnership(this.selectedItems);
            this.$router.push({
              path: "/web/settlement/pageList/transferOwnershipManage"
            });
          } else {
            this.$message.error("当前存在数据无余量，不可过户");
          }
          break;
        default:
          this.$message.error(res.errMsg);
          break;
      }
    },
    async batchFrozen() {
      this.isbatchFrozenLoading = true;
      const res = await this.$api.frozen(this.ids);
      this.isbatchFrozenLoading = false;
      switch (res.code) {
        case Dict.SUCCESS:
          this.$message.success("冻结成功");
          this.batchFrozenVisible = false;
          this.getListData();
          break;
        default:
          this.$message.error(res.errMsg);
          break;
      }
    },
    async batchUnFrozen() {
      this.isbatchUnFrozenLoading = true;
      const res = await this.$api.unfrozen(this.ids);
      this.isbatchUnFrozenLoading = false;
      switch (res.code) {
        case Dict.SUCCESS:
          this.$message.success("解冻结成功");
          this.batchUnFrozenVisible = false;
          this.getListData();
          break;
        default:
          this.$message.error(res.errMsg);
          break;
      }
    },
    async batchCheckOut() {
      this.isbatchCheckOutLoading = true;
      const res = await this.$api.getSurplus(this.ids);
      this.isbatchCheckOutLoading = false;
      switch (res.code) {
        case Dict.SUCCESS:
          if (res.data.HasSurPlus) {
            this.batchCheckOutVisible = false;
            this.setCheckout(this.selectedItems);
            this.$router.push({
              path: "/web/settlement/pageList/outerStorageDetail/applyCheckOut"
            });
          } else {
            this.$message.error("当前存在数据无余量，不可过户");
          }
          break;
        default:
          this.$message.error(res.errMsg);
          break;
      }
    },
    GoEnterRegister() {
      this.$router.push({
        path: "/web/settlement/pageList/enterStorageDetail/register"
      });
    },
    detail(item) {
      this.setFindDetail(item);
      this.$router.push({
        path: "/web/settlement/pageList/inventoryTable/inventoryDetail"
      });
    },
    init() {
      setTimeout(() => {
        this.perm();
      }, 20);
      this.perm();
    },
    perm() {}
  },
  mounted() {
    this.init();
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
