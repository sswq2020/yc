<template>
  <div class="container single-page">
    <HLBreadcrumb :data="breadTitle">
      <el-button class="hlB_buts" size="small" @click="add" icon="el-icon-download">新增</el-button>
    </HLBreadcrumb>
    <div class="search-box">
      <div class="form-item">
        <label>交割库名称</label>
        <div class="form-control">
          <el-input v-model="listParams.name" placeholder="请输入" size="small"></el-input>
        </div>
      </div>
      <div class="form-item">
        <label>交割库地址</label>
        <div class="form-control">
          <el-input v-model="listParams.address" placeholder="请输入" size="small"></el-input>
        </div>
      </div>
      <div class="form-item">
        <label>交割库类型</label>
        <div class="form-control">
          <el-input v-model="listParams.type" placeholder="请输入" size="small"></el-input>
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
    <HLtable
      ref="tb"
      @sizeChange="changePageSize"
      @pageChange="changePage"
      :total="listData.totalCount"
      :currentPage="listParams.currentPage"
      :pageSize="listParams.pageSize"
      :data="listData.list"
      :loading="isListDataLoading"
      :multiple="true"
    >
      <el-table-column
        align="center"
        :prop="item.prop"
        :label="item.label"
        :key="item.id"
        v-for="(item) in tableHeader"
        :show-overflow-tooltip="true"
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
    </HLtable>
    <SettlementFormModal 
      :isEdit="isEdit"
      :settlementObj="editObj"
      :loading="isEditLoading"
      :confirmCb="modalConfirm"
    />
  </div>
  
</template>

<script>
import { mapMutations  } from 'vuex';
import Dict from "@/util/dict.js";
import HLBreadcrumb from "@/components/hl-breadcrumb";
import HLtable from "@/components/hl_table";
import SettlementFormModal from "./settlementFormModal.vue";

const defaultListParams = {
  currentPage: 1,
  pageSize: 20,
  name: '',
  address: '',
  type: ''
};
export default {
  name: "settlementStorageManage",
  components: {
    HLBreadcrumb,
    HLtable,
    SettlementFormModal
  },
  data() {
    return {
      breadTitle: ["基础信息", "交割库管理"],
      isListDataLoading: false,
      tableHeader: [
        {
          prop: "",
          label: "交割库名称",
          width: 180
        },
        {
          prop: "",
          label: "交割库地址",
          width: 300
        },
        {
          prop: "",
          label: "交割库库容量",
          width: 180
        },
        {
          prop: "",
          label: "交割库类型",
          width: 180
        },
        {
          prop: "",
          label: "负责人",
          width: 180
        },
        {
          prop: "",
          label: "联系电话",
          width: 180
        },
        {
          prop: "",
          label: "创建时间",
          width: 180
        },
        {
          prop: "",
          label: "状态",
          width: 180
        },
      ],
      listData: {
        totalCount: 0,
        list: []
      },
      listParams: {
        ...defaultListParams
      },
      isEdit: false,
      isEditLoading: false,
      editObj: {}
    }
  },
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
          this.listData = { ...defaultListData };
          this.$Message.error(res.errMsg);
          break;
      }
    },
    search() {

    },
    reset() {
      this.listParams = defaultListParams;
      this,getList();
    },
    changePageSize(pageSize) {
      this.listParams.pageSize = pageSize;
      this.getList();
    },
    changePage(currentPage) {
      this.listParams.currentPage = currentPage;
      this.getList();
    },
    add() {
      this.isEdit = false;
      this.editObj = null;
      this.SET_MODAL_VISIBLE(true);
    },
    editItem(obj) {
      console.log(obj);
      this.isEdit = true;
      this.editObj = obj;
      this.SET_MODAL_VISIBLE(true);
    },
    deleteItem(obj) {
      let that = this;
      const { id } = obj;
      this.$confirm(`此操作将永久删除${obj.mock1}, 是否继续?`, "提示", {
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
    modalConfirm() {
    }
  },
  mounted() {
    this.getList();
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
