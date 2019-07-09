<template>
  <div class="container single-page">
    <HLBreadcrumb :data="breadTitle">
      <el-button type="primary" size="small" @click="add" icon="el-icon-plus">新增</el-button>
    </HLBreadcrumb>
    <div class="search-box">
      <div class="form-item">
        <label>仓库</label>
        <div class="form-control">
          <el-select v-model="listParams.storeId" placeholder="请选择">
            <el-option v-for="item in Object.keys(dropDownData.deliveryStoreMap)" :key="item" :label="dropDownData.deliveryStoreMap[item]" :value="item"></el-option>
          </el-select>
        </div>
      </div>
      <div class="form-item">
        <label>库区</label>
        <div class="form-control">
          <el-input v-model="listParams.reservoirArea" placeholder="请输入" size="small"></el-input>
        </div>
      </div>
      <div class="form-item">
        <label>货区</label>
        <div class="form-control">
          <el-input v-model="listParams.cargoArea" placeholder="请输入" size="small"></el-input>
        </div>
      </div>
       <div class="form-item">
        <label>仓位名称</label>
        <div class="form-control">
          <el-input v-model="listParams.positionName" placeholder="请输入" size="small"></el-input>
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
      :total="listData.paginator.totalCount"
      :currentPage="listParams.page"
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
          <el-button type="text" @click="forbiddenOrActiveItem(listData.list[scope.$index])">{{scope.row.pilePositionStatusCode == '0' ? '禁用' : '激活'}}</el-button>
        </template>
      </el-table-column>
    </HLtable>
    <PilePositionFormModal 
      :isEdit="isEdit"
      :editObj="editObj"
      :loading="isEditLoading"
      :confirmCb="modalConfirm"
    />
  </div>
  
</template>

<script>
import {  mapState, mapMutations, mapActions  } from 'vuex';
import Dict from "@/util/dict.js";
import HLBreadcrumb from "@/components/hl-breadcrumb";
import HLtable from "@/components/hl_table";
import PilePositionFormModal from "./pilePositionFormModal.vue";

const defaultListParams = {
  page: 1,
  pageSize: 20,
  cargoArea: '',
  positionName: '',
  reservoirArea: '',
  storeId: '',
};
export default {
  name: "pilePositionManage",
  components: {
    HLBreadcrumb,
    HLtable,
    PilePositionFormModal
  },
  data() {
    return {
      breadTitle: ["基础信息", "区桩位管理"],
      isListDataLoading: false,
      tableHeader: [
        {
          prop: "deliveryStore",
          label: "仓库",
          width: 180
        },
        {
          prop: "reservoirArea",
          label: "库区",
          width: 300
        },
        {
          prop: "cargoArea",
          label: "货区",
          width: 180
        },
        {
          prop: "positionName",
          label: "仓位名称",
          width: 180
        },
        {
          prop: "createdTime",
          label: "录入时间",
          width: 180
        },
        {
          prop: "pilePositionStatusText",
          label: "状态",
          width: 180
        },
      ],
      listData: {
        paginator: {
          totalCount: 0,
        },
        list: []
      },
      listParams: {
        ...defaultListParams
      },
      isEdit: false,
      isEditLoading: false,
      editObj: {},
      warehouseList: []
    }
  },
  computed: {
    ...mapState('modal', ['dropDownData'])
  },
  methods: {
    ...mapMutations('modal', ['SET_MODAL_VISIBLE']),
    ...mapActions('modal', ['getDropDownData']),
    async getList() {
      this.isListDataLoading = true;
      const res = await this.$api.getPilePositionsList(this.listParams);
      this.isListDataLoading = false;
      switch (res.code) {
        case Dict.SUCCESS:
          this.listData = res.data;
          break;
        default:
          this.$messageError(res.mesg);
          break;
      }
    },
    search() {
      this.listParams.page = 1;
      this.getList();
    },
    reset() {
      this.listParams = {...defaultListParams};
      this.getList();
    },
    changePageSize(pageSize) {
      this.listParams.pageSize = pageSize;
      this.getList();
    },
    changePage(currentPage) {
      this.listParams.page = currentPage;
      this.getList();
    },
    add() {
      this.isEdit = false;
      this.editObj = {};
      this.SET_MODAL_VISIBLE(true);
    },
    editItem(obj) {
      this.isEdit = true;
      this.editObj = obj;
      this.SET_MODAL_VISIBLE(true);
    },
    forbiddenOrActiveItem(obj) {
      let that = this;
      const { id, pilePositionStatusCode, reservoirArea, cargoArea, positionName } = obj;
      const operationText = pilePositionStatusCode == '0' ? '禁用' : '激活';
      const apiUrl = pilePositionStatusCode == '0' ? 'disablePilePositions' : 'activePilePositions';
      this.$confirm(`确定要确定要${operationText}区桩位${reservoirArea}-${cargoArea}-${positionName}?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
      })
      .then(async () => {
        const response = await that.$api[apiUrl]({ id });
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
    async modalConfirm(obj) {
      const serve = this.isEdit ? "updatePilePositions" : "addPilePositions";
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
    }
  },
  created() {
    this.getDropDownData();
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
