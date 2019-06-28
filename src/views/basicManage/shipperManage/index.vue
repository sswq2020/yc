<template>
  <div class="container single-page">
    <hlBreadcrumb :data="breadTitle">
      <el-button type="primary" size="small" @click="add" icon="el-icon-plus">新增</el-button>
    </hlBreadcrumb>
    <div class="search-box">
      <div class="form-item">
        <label>货主名称</label>
        <div class="form-control">
          <el-input v-model="listParams.name" placeholder="请输入" size="small"></el-input>
        </div>
      </div>
      <div class="form-item">
        <label>社会统一信用代码</label>
        <div class="form-control">
          <el-input v-model="listParams.creditCode" placeholder="请输入" size="small"></el-input>
        </div>
      </div>
      <div class="form-item">
        <el-button
          type="primary"
          :loading="isListDataLoading"
          @click="search"
          size="small"
        >查询</el-button>
        <el-button size="small" @click="reset">重置</el-button>
      </div>
    </div>
    <heltable
      ref="tb"
      @sizeChange="changePageSize"
      @pageChange="changePage"
      :total="listData.totalCount"
      :currentPage="listParams.currentPage"
      :pageSize="listParams.pageSize"
      :data="listData.list"
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
      <el-table-column label="操作" fixed="right" width="120px" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="editItem(listData.list[scope.$index])">编辑</el-button>
          <el-button type="text" @click="forbiddenOrActiveItem(listData.list[scope.$index])">{{ scope.status === 1 ? '禁用' : '激活' }}</el-button>
        </template>
      </el-table-column>
    </heltable>
    <shipperformModal
      ref="modal"
      :loading="isEditLoading"
      :isEdit="isEdit"
      :confirmCb="pass"
      :shipperObj="shipperObj"
    ></shipperformModal>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import _ from "lodash";
import { judgeAuth } from "@/util/util.js";
import Dict from "@/util/dict.js";
import heltable from "@/components/hl_table";
import hlBreadcrumb from "@/components/hl-breadcrumb";
import shipperformModal from "./shipperformModal.vue";

const defaultListParams = {
  pageSize: 20,
  currentPage: 1,
  name: '',
  creditCode: ''
};
const defaulttableHeader = [
  {
    prop: "mock1",
    label: "手机号码",
    width: "180"
  },
  {
    prop: "mock2",
    label: "货主名称",
    width: "180"
  },
  {
    prop: "mock2",
    label: "社会统一信用代码",
    width: "180"
  },
  {
    prop: "mock2",
    label: "联系人",
    width: "180"
  },
  {
    prop: "mock2",
    label: "联系电话",
    width: "180"
  },
  {
    prop: "mock2",
    label: "创建时间",
    width: "180"
  },
  {
    prop: "mock2",
    label: "状态",
    width: "180"
  }
];
const rowAdapter = (row, response) => {
  return { ...row };
};

export default {
  name: "shipperManage",
  components: {
    heltable,
    hlBreadcrumb,
    shipperformModal,
  },
  data() {
    return {
      breadTitle: ["基础信息", "货主管理"],
      // #region 查询的基本数据结构
      listParams: { ...defaultListParams }, // 页数
      listData: { // 返回list的数据结构
        totalCount: 0,
        list: []
       }, 
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
      shipperObj: null
      // #endgion
    };
  },
  computed: {...mapState('modal',['visible'])},
  methods: {
    ...mapMutations('modal', ['SET_MODAL_VISIBLE']),
    async getList() {
      this.isListDataLoading = true;
      const res = await this.$api.getShipperManageList(this.listParams);
      this.isListDataLoading = false;
      switch (res.code) {
        case Dict.SUCCESS:
          this.listData = res.data;
          break;
        default:
          this.$messageError(res.errMsg);
          break;
      }
    },
    async pass(obj) {
      const serve = this.isEdit ? "updateShipper" : "createShipper";
      const response = await this.$api[serve]({ ...obj });
      switch (response.code) {
        case Dict.SUCCESS:
          this.$messageSuccess(`${this.isEdit ? "修改" : "新增"}成功`);
          this.$refs.modal.cancle();
          this.getList();
          break;
        default:
          this.$messageError(response.errMsg);
          break;
      }
    },
    search() {
      this.listParams.currentPage = 1;
      this.getList();
    },
    reset() {
      this.listParams = { ...defaultListParams };
      this.getList();
    },
    changePage(currentPage) {
      this.listParams.currentPage = currentPage;
      this.getList();
    },
    changePageSize(pageSize) {
      this.listParams.pageSize = pageSize;
      this.getList();
    },
    forbiddenOrActiveItem(obj) {
      let that = this;
      const { id, status } = obj;
      const operationText = status === 1 ? '禁用' : '激活';
      const apiUrl = status === 1 ? 'forbiddenUrl' : 'activeUrl';
      that
        .$confirm(`确定要确定要${operationText}货主${obj.mock1}?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(async () => {
          const response = await that.$api.deleteShipper({ id });
          switch (response.code) {
            case Dict.SUCCESS:
              that.$messageSuccess(`${operationText}成功`);
              that.getList();
              break;
            default:
              that.$messageError(`${operationText}失败，${response.errMsg}`);
              break;
          }
        });
    },
    editItem(obj) {
      this.isEdit = true;
      this.shipperObj = obj;
      this.SET_MODAL_VISIBLE(true);
    },
    add() {
      this.isEdit = false;
      this.shipperObj = null;
      this.SET_MODAL_VISIBLE(true);
    },
    needfixed(fixed) {
      if (!fixed) {
        return false;
      } else {
        return fixed;
      }
    },
    needwidth(width) {
      if (!width) {
        return;
      } else {
        return width;
      }
    },
    init() {
      setTimeout(() => {
        this.perm();
        this.getList();
      }, 100);
      this.perm();
    },
    perm() {
      // this.datasync = judgeAuth("finance:tradedetail:datasync");
      // this.batchexport = judgeAuth("finance:tradedetail:export");
    }
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
</style>
