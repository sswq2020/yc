<template>
  <div class="container single-page">
    <HletongBreadcrumb :data="breadTitle">
      <el-button type="primary" size="small" @click="add" icon="el-icon-plus" plain class="text-btn">新增</el-button>
    </HletongBreadcrumb>
    <div class="search-box">
      <div class="form-item">
        <label>交割仓库</label>
        <div class="form-control">
          <el-select v-model="listParams.deliveryStoreId" placeholder="请选择" size="small">
            <el-option
              v-for="(item,index) in deliveryStoreList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="form-item">
        <label>储罐编号</label>
        <div class="form-control">
          <el-input v-model="listParams.oilTankCode" placeholder="请输入" size="small"></el-input>
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
      :loading="isListDataLoading"
    >
      <el-table-column
        align="left"
        :prop="item.prop"
        :label="item.label"
        :key="item.id"
        v-for="(item) in tableHeader"
        :show-overflow-tooltip="showOverflowTooltip"
      >
        <template slot-scope="scope">
          <span>{{listData.list[scope.$index][item.prop] || '-'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="120px" align="left">
        <template slot-scope="scope">
          <el-button type="text" @click="editItem(listData.list[scope.$index])">编辑</el-button>
          <el-button
            type="text"
            @click="forbiddenOrActiveItem(listData.list[scope.$index])"
          >{{ scope.row.oilTankStateCode == Dict.STATE_NORMAL ? '禁用' : '激活' }}</el-button>
        </template>
      </el-table-column>
    </HletongTable>
    <oilTankformModal
      ref="modal"
      :loading="isEditLoading"
      :isEdit="isEdit"
      :confirmCb="modalConfirm"
      :cancleCb="()=>{this.changeList = []}"
      :oilTankObj="oilTankObj"
      :list="changeList"
    ></oilTankformModal>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import moment from "moment";
// import { judgeAuth } from "@/util/util.js";
import Dict from "util/dict.js";
import oilTankformModal from "./oilTankformModal.vue";
import { _toArray_,findIndexByValue } from "common/util.js";

const defaultListParams = {
  pageSize: 20,
  page: 1,
  oilTankCode: null,
  deliveryStoreId: null
};
const defaulttableHeader = [
  {
    prop: "deliveryStore",
    label: "交割仓库",
    width: "180"
  },
  {
    prop: "oilTankCode",
    label: "储罐编号",
    width: "180"
  },
  {
    prop: "oilTankVolume",
    label: "储罐容积(L)",
    width: "180"
  },
  {
    prop: "createdTimeText",
    label: "录入时间",
    width: "180"
  },
  {
    prop: "oilTankStateText",
    label: "状态",
    width: "180"
  }
];

const defaultListData = {
  paginator: {
    totalCount: 0,
    totalPage: 1
  },
  list: []
};

const rowAdapter = list => {
  if (!list) {
    return [];
  }
  if (list.length > 0) {
    list = list.map(row => {
      return (row = {
        ...row,
        createdTimeText: row.createdTime
          ? moment(row.createdTime).format("YYYY-MM-DD HH:mm:ss")
          : ""
      });
    });
  }
  return list;
};

export default {
  name: "oilTankManage",
  components: {
    oilTankformModal
  },
  data() {
    return {
      breadTitle: ["基础信息", "储罐管理"], // 面包屑title
      deliveryStoreList: [],
      changeList:[],
      Dict: Dict,
      // #region 查询的基本数据结构
      listParams: { ...defaultListParams }, // 页数
      listData: { ...defaultListData },
      // #endgion

      // #region 表格相关
      isListDataLoading: false,
      isdeleteLoading: false,
      isEditLoading: false,
      tableHeader: defaulttableHeader,
      showOverflowTooltip: true,
      // #endgion

      // #region 弹窗相关
      isEdit: false,
      oilTankObj: null
      // #endgion
    };
  },
  computed: { ...mapState("modal", ["visible"]) },
  methods: {
    ...mapMutations("modal", ["SET_MODAL_VISIBLE"]),
    clearListParams() {
      this.listParams = { ...defaultListParams };
      this.listData = { ...defaultListData };
      this.getList();
    },
    changePage(currentPage) {
      this.listParams.page = currentPage;
      this.getList();
    },
    changePageSize(pageSize) {
      this.listParams.pageSize = pageSize;
      this.getList();
    },
    getListDataBylistParams() {
      this.listParams.page = 1;
      this.getList();
    },
    async getList() {
      this.isListDataLoading = true;
      const res = await this.$api.getOilTankList(this.listParams);
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
    /**下拉仓库*/
    async _getdeliveryStores() {
      const res = await this.$api.getDeliveryStoreSelect(Dict.STORAGE_TYPE_OIL);
      switch (res.code) {
        case Dict.SUCCESS:
          this.deliveryStoreList = _toArray_(res.data);
          break;
        default:
          this.$messageError(res.mesg);
          break;
      }
    },
    async modalConfirm(obj) {
      const serve = this.isEdit ? "updateOilTank" : "addOilTank";
      const response = await this.$api[serve]({ ...obj });
      switch (response.code) {
        case Dict.SUCCESS:
          this.$messageSuccess(`${this.isEdit ? "修改" : "新增"}成功`);
          this.SET_MODAL_VISIBLE(false);
          this.getList();
          break;
        default:
          this.$messageError(response.mesg);
          break;
      }
    },
    forbiddenOrActiveItem(obj) {
      let that = this;
      const { id, oilTankStateCode, oilTankCode } = obj;
      const operationText =
        oilTankStateCode === Dict.STATE_NORMAL ? "禁用" : "激活";
      const serve =
        oilTankStateCode === Dict.STATE_NORMAL ? "disableOilTank" : "activeOilTank";
      that
        .$confirm(`确定要${operationText}储罐${oilTankCode}?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(async () => {
          const response = await that.$api[serve]({ id });
          switch (response.code) {
            case Dict.SUCCESS:
              that.$messageSuccess(`${operationText}成功`);
              that.getList();
              break;
            default:
              that.$messageError(`${operationText}失败，${response.mesg}`);
              break;
          }
        });
    },
    editItem(obj) {
      this.isEdit = true;
      const { id, oilTankCode, deliveryStoreId,deliveryStore,oilTankVolume } = obj;
      if(findIndexByValue(this.deliveryStoreList,deliveryStoreId)=== -1) {
        let insertList = this.deliveryStoreList.concat({
          label:deliveryStore,
          value:deliveryStoreId,
        })
        this.changeList = insertList
      }else {
          this.changeList = this.deliveryStoreList;
      }
      this.oilTankObj = {
        id,
        oilTankCode,
        deliveryStoreId,
        oilTankVolume
      };
      this.SET_MODAL_VISIBLE(true);
    },
    add() {
      this.isEdit = false;
      this.oilTankObj = null;
      this.changeList = this.deliveryStoreList ;
      this.SET_MODAL_VISIBLE(true);
    }
  },
  created() {
    this._getdeliveryStores().then(() => {
      this.clearListParams();
    });
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
