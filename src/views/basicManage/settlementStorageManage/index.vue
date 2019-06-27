<template>
  <div class="container single-page">
    <HLBreadcrumb :data="breadTitle">
      <el-button type="primary" size="small" @click="add" icon="el-icon-plus">新增</el-button>
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
          <el-select v-model="listParams.address" placeholder="请选择">
            <el-option v-for="item in addressList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
      </div>
      <div class="form-item">
        <label>交割库类型</label>
        <div class="form-control">
          <el-select v-model="listParams.type" placeholder="请选择">
            <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
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
          <el-button type="text" @click="forbiddenOrActiveItem(listData.list[scope.$index])">{{scope.row.status === 1 ? '禁用' : '激活'}}</el-button>
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
      editObj: {},
      addressList: [],
      typeList: []
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
          this.$messageError(res.errMsg);
          break;
      }
    },
    search() {
      this.listParams.currentPage = 1;
      this.getList();
    },
    reset() {
      this.listParams = {...defaultListParams};
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
      this.isEdit = true;
      this.editObj = obj;
      this.SET_MODAL_VISIBLE(true);
    },
    forbiddenOrActiveItem(obj) {
      let that = this;
      const { id, status } = obj;
      const operationText = status === 1 ? '禁用' : '激活';
      const apiUrl = status === 1 ? 'forbiddenUrl' : 'activeUrl';
      this.$confirm(`确定要确定要${operationText}交割库${obj.mock1}?`, "提示", {
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
            that.$message(`${operationText}失败，${response.errMsg}`);
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
