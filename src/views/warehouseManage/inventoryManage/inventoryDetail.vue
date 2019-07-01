<template>
  <div class="container single-page">
    <hlBreadcrumb :data="breadTitle"></hlBreadcrumb>
    <div class="form-block">
      <el-form ref="form" :model="form" label-width="120px" size="small">
        <el-row>
          <el-col :md="12" :sm="12" :xs="24">
            <div class="head">库存信息</div>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="入库单号" prop="mock1">
              <el-input :value="form.mock1" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="入库日期" prop="mock2">
              <el-input :value="form.mock2" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="货主" prop="mock3">
              <el-input :value="form.mock3" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="交易仓库" prop="mock1">
              <el-input :value="form.mock1" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="区桩位" prop="mock2">
              <el-input :value="form.mock2" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="层数" prop="mock3">
              <el-input :value="form.mock3" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="品名" prop="mock1">
              <el-input :value="form.mock1" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="材质" prop="mock2">
              <el-input :value="form.mock2" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="规格" prop="mock3">
              <el-input :value="form.mock3" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="产地" prop="mock1">
              <el-input :value="form.mock1" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="库存数量" prop="mock2">
              <el-input :value="form.mock2" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="库存重量" prop="mock3">
              <el-input :value="form.mock3" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="计量方式" prop="mock1">
              <el-input :value="form.mock1" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label="数量单位" prop="mock2">
              <el-input :value="form.mock2" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12" :xs="24">
            <el-form-item label=" 重量单位" prop="mock3">
              <el-input :value="form.mock3" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="form-block">
      <el-row>
        <el-col :md="12" :sm="12" :xs="24">
          <div class="head">
            库存明细
            <span class="info">(冻结:用于冻结货主库存 质押中:货主库存质押给银行 待出库:货主提交库存出库申请 挂牌中:货主库存在大宗上挂牌交易)</span>
          </div>
        </el-col>
      </el-row>
      <heltable
        ref="tb"
        @pageChange="changePage"
        :total="listData.paginator.totalCount"
        :currentPage="listParams.page"
        :pageSize="listParams.pageSize"
        :pageSizes="[5]"
        :data="listData.list"
        :multiple="true"
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

        <el-table-column label="操作" fixed="right" width="180px" align="center">
          <template>
            <el-button type="text">出库</el-button>
            <el-button type="text">取消出库</el-button>
            <el-button type="text" v-if="!IS_SHIPPER">过户</el-button>
            <el-button type="text" v-if="!IS_SHIPPER">冻结</el-button>
          </template>
        </el-table-column>
      </heltable>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import _ from "lodash";
import Dict from "@/util/dict.js";
import heltable from "@/components/hl_table";
import hlBreadcrumb from "@/components/hl-breadcrumb";
const defaultForm = {
  mock1: "",
  mock2: "",
  mock3: "",
  mock4: "",
  mock5: "",
  mock6: "",
  mock7: "",
  mock8: "",
  mock9: "",
  mock10: "",
  mock11: "",
  mock12: ""
};
const defaultListParams = {
  pageSize: 5,
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
    label: "库存数量",
    width: "180"
  },
  {
    prop: "mock2",
    label: "数量单位",
    width: "180"
  },
  {
    prop: "mock4",
    label: "库存重量",
    width: "180"
  },
  {
    prop: "mock5",
    label: "重量单位",
    width: "180"
  },
  {
    prop: "mock6",
    label: "操作数量",
    width: "180"
  },
  {
    prop: "mock7",
    label: "操作重量",
    width: "180"
  },
  {
    prop: "mock8",
    label: "状态",
    width: "180"
  }
];
export default {
  name: "inventoryDetail",
  components: {
    heltable,
    hlBreadcrumb
  },
  data() {
    return {
      breadTitle: ["仓储管理", "库存表", "库存明细"],
      isListDataLoading: false,
      disabled: true,
      // #region 查询的基本数据结构
      listParams: { ...defaultListParams }, // 页数
      form: { ...defaultForm }, // 查询参数
      listData: { ...defaultListData }, // 返回list的数据结构
      // #endgion
      /**表格相关*/
      tableHeader: defaulttableHeader,
      showOverflowTooltip: true
    };
  },
  computed: {
    ...mapGetters("app", ["role", "userId", "username", "IS_SHIPPER"]),
    ...mapState("inventoryManage", ["findDetail"])
  },
  methods: {
    ...mapMutations("inventoryManage", ["setTransferOwnership", "setCheckout"]),
    back() {
      this.$router.push({
        path: "/web/settlement/pageList/inventoryTable"
      });
    },
    _filter() {
      if (this.IS_SHIPPER) {
        this.findDetail.userId = this.userId;
      }
      return _.clone(Object.assign({}, this.findDetail, this.listParams));
    },
    clearListParams() {
      this.listParams = { ...defaultListParams };
      this.listData = { ...defaultListData };
      this.getListData();
    },
    changePage(currentPage) {
      this.listParams.currentPage = currentPage;
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
    init() {
      if (!this.findDetail) {
        this.back();
      } else {
        this.form = Object.assign({}, this.form, this.findDetail);
        this.clearListParams();
      }
    }
  },
  created() {
    this.init();
  }
};
</script>

<style scoped lang="less">
.form-block {
  padding-top: 15px;
  margin-bottom: 15px;
  background: white;
  .head {
    padding-left: 10px;
    margin-bottom: 15px;
    font-size: 18px;
    font-weight: 700;
    .info {
      font-size: 12px;
      font-weight: 400;
    }
  }
}
</style>
