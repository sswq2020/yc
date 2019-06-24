<template>
  <div class="container single-page">
    <hlBreadcrumb :data="breadTitle">
      <el-button class="hlB_buts" size="small" @click="add" icon="el-icon-download">新增</el-button>
    </hlBreadcrumb>
    <div class="search-box">
      <div class="form-item">
        <label>货主名称</label>
        <div class="form-control">
          <el-input v-model="form.param_1" placeholder="请输入" size="small"></el-input>
        </div>
      </div>
      <div class="form-item">
        <label>社会统一信用代码</label>
        <div class="form-control">
          <el-input v-model="form.param_2" placeholder="请输入" size="small"></el-input>
        </div>
      </div>
      <div class="form-item">
        <el-button type="primary" :loading="isListDataLoading" @click="getListData" size="small">查询</el-button>
        <el-button size="small" @click="clearListParams">重置</el-button>
      </div>
    </div>
    <heltable
      ref="tb"
      @sizeChange="changePageSize"
      @pageChange="changePage"
      :total="listData.paginator.totalCount"
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
          <el-button type="text" @click="deleteItem(listData.list[scope.$index])">删除</el-button>
        </template>
      </el-table-column>
    </heltable>
    <!-- <shipperformModal
      ref="modal"
      :loading="isEditLoading"
      :isEdit="isEdit"
      :confirmCb="pass"
      :shipperObj="shipperObj"
    ></shipperformModal> -->
    <shipperformModalTest
      ref="modal"
      :loading="isEditLoading"
      :isEdit="isEdit"
      :confirmCb="pass"
      :shipperObj="shipperObj"
    ></shipperformModalTest>
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
import shipperformModalTest from "./shipperformModalTest.vue";
const defaultFormData = {
  param_1: "",
  param_2: ""
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
    shipperformModalTest,
  },
  data() {
    return {
      breadTitle: ["基础信息", "货主管理"],
      // #region 查询的基本数据结构
      listParams: { ...defaultListParams }, // 页数
      form: { ...defaultFormData }, // 查询参数
      listData: { ...defaultListData }, // 返回list的数据结构
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
    _filter() {
      if (!_.isEqual(this.form, this.diff_form)) {
        this.diff_form = _.clone(Object.assign({}, this.form));
        this.listParams = _.clone(Object.assign({}, defaultListParams));
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
    changePageSize(pageSize) {
      this.listParams.pageSize = pageSize;
      this.getListData();
    },
    deleteItem(obj) {
      let that = this;
      const { id } = obj;
      that
        .$confirm(`此操作将永久删除${obj.mock1}, 是否继续?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(async () => {
          const response = await that.$api.deleteShipper({ id });
          switch (response.code) {
            case Dict.SUCCESS:
              that.$message("删除成功");
              that.getListData();
              break;
            default:
              that.$message(response.errMsg);
              break;
          }
        });
    },
    editItem(obj) {
      // this.isEdit = true;
      // this.shipperObj = obj;
      // this.$refs.modal.open();
      this.SET_MODAL_VISIBLE(true);
      this.shipperObj = obj;
    },
    add() {
      // this.isEdit = false;
      // this.shipperObj = null;
      // this.$refs.modal.open();
      this.SET_MODAL_VISIBLE(true);
    },
    async pass(obj) {
      console.log(obj);
      const serve = this.isEdit ? "updateShipper" : "createShipper";
      const response = await this.$api[serve]({ ...obj});
      switch (response.code) {
        case Dict.SUCCESS:
          this.$message(`${this.isEdit ? "修改" : "新增"}成功`);
          // this.$refs.modal.cancle();
          this.SET_MODAL_VISIBLE(false);
          this.getListData();
          break;
        default:
          this.$message(response.errMsg);
          break;
      }
    },
    async getListData() {
      let obj = this._filter();
      this.isListDataLoading = true;
      const res = await this.$api.getShipperManageList(obj);
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
        this.clearListParams();
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
  },
  created() {
    this.diff_form = { ...defaultFormData };
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
