<template>
  <div class="container single-page">
    <HletongBreadcrumb :data="breadTitle"></HletongBreadcrumb>
    <div class="form">
      <div class="form-block">
        <el-form ref="form" :model="form" label-width="120px" size="small">
          <div class="head">库存信息</div>
          <el-row>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="入库单号:" prop="incomingId">{{form.incomingId}}</el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="入库日期:" prop="incomingTime">{{form.incomingTime}}</el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="货主:" prop="name">{{form.name}}</el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="交易仓库:" prop="deliveryStore">{{form.deliveryStore}}</el-form-item>
            </el-col>
          </el-row>

          <!--石油参数开始-->
          <el-row v-if="productType===Dict.PRODUCT_OIL">
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="储罐编号:" prop="oilTankCode">{{form.oilTankCode}}</el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="品类:" prop="firstCatalogName">{{form.firstCatalogName}}</el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="牌号:" prop="secondCatalogName">{{form.secondCatalogName}}</el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="排放标准:" prop="manufacturerName">{{form.emissionStandardText}}</el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="密度:" prop="density">{{form.density}}</el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="产品型号:" prop="serialNumber">{{form.serialNumber}}</el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="生产商:" prop="manufacturerName">{{form.manufacturerName}}</el-form-item>
            </el-col>
          </el-row>
          <!--石油参数结束-->

          <!--钢木参数开始-->
          <el-row v-if="productType!==Dict.PRODUCT_OIL">
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="区桩位:" prop="pilePosition">{{form.pilePosition}}</el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="层数:" prop="piles">{{form.piles}}</el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="品名:" prop="productName">{{form.productName}}</el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="材质:" prop="materialName">{{form.materialName}}</el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="规格:" prop="specificationsName">{{form.specificationsName}}</el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="产地:" prop="originPlaceName">{{form.originPlaceName}}</el-form-item>
            </el-col>
          </el-row>
          <!--钢木参数结束-->

          <el-row>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="库存数量:" prop="totalNumInventory">{{form.totalNumInventory}}</el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="库存重量:" prop="totalWeightInventory">{{form.totalWeightInventory}}</el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="计量方式:" prop="measuringText">{{form.measuringText}}</el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="数量单位:" prop="numUnitText">{{form.numUnitText}}</el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="重量单位:" prop="weightUnitText">{{form.weightUnitText}}</el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="form-block">
        <div class="head">
          库存明细
          <span class="info">(冻结:用于冻结货主库存 质押中:货主库存质押给银行 待出库:货主提交库存出库申请 挂牌中:货主库存在大宗上挂牌交易)</span>
        </div>
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
          layout="total, sizes, prev, pager, next"
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

          <el-table-column label="操作" fixed="right" width="220px" align="left">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="CheckOut(listData.list[scope.$index])"
                v-if="authCheckout(listData.list[scope.$index])"
              >出库申请</el-button>
              <el-button
                type="text"
                @click="CancelCheckout(listData.list[scope.$index])"
                v-if="authCancelCheckout(listData.list[scope.$index])"
              >取消出库</el-button>
              <el-button
                type="text"
                @click="TransferOwner(listData.list[scope.$index])"
                v-if="authTransferOwner(listData.list[scope.$index])"
              >过户</el-button>
              <el-button
                type="text"
                @click="Frozen(listData.list[scope.$index])"
                v-if="authFrozen(listData.list[scope.$index])"
              >冻结</el-button>
              <el-button
                type="text"
                @click="UnFrozen(listData.list[scope.$index])"
                v-if="authUnFrozen(listData.list[scope.$index])"
              >解冻</el-button>
            </template>
          </el-table-column>
        </heltable>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import _ from "lodash";
import Dict from "@/util/dict.js";
import { judgeAuth } from "util/util.js";
import heltable from "@/components/hl_table";
const defaultForm = {
  incomingId: "",
  incomingTime: "",
  name: "",
  deliveryStore: "",
  pilePosition: "",
  piles: "",
  productName: "",
  materialName: "",
  specificationsName: "",
  originPlaceName: "",
  totalNumInventory: "",
  totalWeightInventory: "",
  measuringText: "",
  numUnitText: "",
  weightUnitText: "",

  /**石油类型的*/
  oilTankCode: "",
  firstCatalogName: "",
  secondCatalogName: "",
  emissionStandard: "",
  density: "",
  productNumber: "",
  producerName: ""
};
const defaultListParams = {
  pageSize: 5,
  page: 1
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
    prop: "operateNum",
    label: "操作数量",
    width: "180",
    align: "right"
  },
  {
    prop: "operateWeight",
    label: "操作重量",
    width: "180",
    align: "right"
  },
  {
    prop: "stateText",
    label: "状态",
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
        stateText: Dict.INVENTORY_STATUS[row.state],
        numUnitText: (row.numUnitTypeEnum && row.numUnitTypeEnum.text) || "-",
        weightUnitText:
          (row.weightUnitTypeEnum && row.weightUnitTypeEnum.text) || "-"
      });
    });
  }
  return list;
};

export default {
  name: "inventoryDetail",
  components: {
    heltable
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
      showOverflowTooltip: true,
      Dict: Dict,
      // #region 权限
      /***出库申请**/

      stockInventoryApply: false,
      /***过户**/

      transferConfirm: false,
      /***冻结**/

      stockInventoryFrozen: false,
      /***解冻**/

      stockInventoryUnFrozen: false,
      /***取消出库**/

      stockInventoryCancel: false
      // #endgion
    };
  },
  computed: {
    ...mapGetters("app", ["role", "userId", "username", "IS_SHIPPER"]),
    ...mapState("inventoryManage", ["findDetail", "productType"])
  },
  methods: {
    ...mapMutations("inventoryManage", ["setTransferOwnership", "setCheckout"]),
    back() {
      this.$router.push({
        path: "/web/yc/storage/stockInventory/page"
      });
    },
    _filter() {
      // if (this.IS_SHIPPER) {
      //   this.findDetail.userId = this.userId;
      // }
      return _.clone(Object.assign({}, this.form, this.listParams));
    },
    clearListParams() {
      this.listParams = { ...defaultListParams };
      this.listData = { ...defaultListData };
      this.getListData();
    },
    changePage(page) {
      this.listParams.page = page;
      this.getListData();
    },
    authCheckout(item) {
      if (!this.stockInventoryApply) {
        return false;
      }
      return item.state === Dict.INVENTORY_NORMAL;
    },
    authCancelCheckout(item) {
      if (!this.stockInventoryCancel) {
        return false;
      }
      return item.state === Dict.INVENTORY_WAITCHECKOUT;
    },
    authTransferOwner(item) {
      if (!this.transferConfirm) {
        return false;
      }
      return item.state === Dict.INVENTORY_NORMAL;
    },
    authUnFrozen(item) {
      if (!this.stockInventoryUnFrozen) {
        return false;
      }
      return item.state === Dict.INVENTORY_FROZEN;
    },
    authFrozen(item) {
      if (!this.stockInventoryFrozen) {
        return false;
      }
      return item.state === Dict.INVENTORY_NORMAL;
    },
    async getListData() {
      let obj = this._filter();
      this.isListDataLoading = true;
      const res = await this.$api.getInventoryDetail(obj);
      this.isListDataLoading = false;
      switch (res.code) {
        case Dict.SUCCESS:
          res.data.list = rowAdapter(res.data.list);
          this.listData = res.data;
          break;
        default:
          this.listData = { ...defaultListData };
          this.$messageError(res.mesg);
          break;
      }
    },
    Frozen(item) {
      let that = this;
      const { stockInventoryId } = item;
      that
        .$confirm(`确定要冻结`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(async () => {
          const res = await that.$api.frozen([{ stockInventoryId }]);
          switch (res.code) {
            case Dict.SUCCESS:
              that.$messageSuccess(`冻结成功`);
              that.getListData();
              break;
            default:
              that.$messageError(`冻结失败,${res.mesg}`);
              break;
          }
        });
    },
    UnFrozen(item) {
      let that = this;
      const { stockInventoryId } = item;
      that
        .$confirm(`确定要解冻`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(async () => {
          const res = await that.$api.unfrozen([{ stockInventoryId }]);
          switch (res.code) {
            case Dict.SUCCESS:
              that.$messageSuccess(`解冻成功`);
              that.getListData();
              break;
            default:
              that.$messageError(`解冻失败,${res.mesg}`);
              break;
          }
        });
    },
    CheckOut(item) {
      let that = this;
      const { stockInventoryId } = item;
      that
        .$confirm(`确定要出库申请`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(async () => {
          const res = await that.$api.getTransferAvailable({
            cargoId: this.form.userId,
            stockId: stockInventoryId
          });
          switch (res.code) {
            case Dict.SUCCESS:
              if (res.data && Number(res.data)) {
                this.setCheckout([{ stockId: stockInventoryId }]);
                this.$router.push({
                  path: "/web/yc/storage/stockRemovalDetail/page/applyCheckOut"
                });
              } else {
                this.$messageError("当前存在数据无余量，不可出库申请");
              }
              break;
            default:
              this.$messageError(res.mesg);
              break;
          }
        });
    },
    TransferOwner(item) {
      let that = this;
      const { stockInventoryId } = item;
      that
        .$confirm(`确定要过户`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(async () => {
          const res = await that.$api.getTransferAvailable({
            cargoId: this.form.userId,
            stockId: stockInventoryId
          });
          switch (res.code) {
            case Dict.SUCCESS:
              if (res.data && Number(res.data)) {
                this.setTransferOwnership([{ stockId: stockInventoryId }]);
                this.$router.push({
                  path: "/web/settlement/pageList/transferOwnershipManage"
                });
              } else {
                this.$messageError("当前存在数据无余量，不可过户");
              }
              break;
            default:
              this.$messageError(res.mesg);
              break;
          }
        });
    },
    CancelCheckout(item) {
      let that = this;
      const { id, stockRemovalId } = item;
      that
        .$confirm(`确定要取消出库`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(async () => {
          const res = await that.$api.cancelcheckout({ id, stockRemovalId });
          switch (res.code) {
            case Dict.SUCCESS:
              that.$messageSuccess(`取消出库成功`);
              that.getListData();
              break;
            default:
              that.$messageError(`取消出库失败,${res.mesg}`);
              break;
          }
        });
    },
    perm() {
      this.stockInventoryApply = judgeAuth("ycstore:stockInventory:apply");
      this.transferConfirm = judgeAuth("inventory:transfer");
      this.stockInventoryFrozen = judgeAuth("inventory:frozen");
      this.stockInventoryUnFrozen = judgeAuth("inventory:unfrozen");
      this.stockInventoryCancel = judgeAuth("ycstore:stockInventory:cancel");
    },
    init() {
      if (!this.findDetail) {
        this.back();
      } else {
        this.form = Object.assign({}, this.form, this.findDetail, {
          stockInventoryId: this.findDetail.id
        });
        this.clearListParams();
      }
    }
  },
  created() {
    this.init();
  },
  mounted() {
    setTimeout(() => {
      this.perm();
    }, 20);
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 20px 15px 0px 20px;
  .form-block {
    margin-bottom: 15px;
    background: white;
    .head {
      margin-bottom: 20px;
      padding-left: 20px;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      color: #333333;
      background: #f6f8fa;
      .info {
        font-size: 12px;
        font-weight: 400;
      }
    }
  }
}
</style>
