<template>
  <div class="container single-page">
    <hlBreadcrumb :data="breadTitle">
      <el-button type="primary" size="small" @click="add" icon="el-icon-plus">新增</el-button>
    </hlBreadcrumb>
    <div class="search-box">
      <div class="form-item">
        <label>生产商名称</label>
        <div class="form-control">
          <el-input v-model="listParams.producerName" placeholder="请输入" size="small"></el-input>
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
          >{{ scope.row.producerStateCode === Dict.STATE_NORMAL ? '禁用' : '激活' }}</el-button>
        </template>
      </el-table-column>
    </heltable>
    <manufactureformModal
      ref="modal"
      :loading="isEditLoading"
      :isEdit="isEdit"
      :confirmCb="modalConfirm"
      :manufactureObj="manufactureObj"
    ></manufactureformModal>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import moment from "moment";
// import { judgeAuth } from "@/util/util.js";
import Dict from "@/util/dict.js";
import heltable from "@/components/hl_table";
import hlBreadcrumb from "@/components/hl-breadcrumb";
import manufactureformModal from "./manufactureformModal.vue";

const defaultListParams = {
  pageSize: 20,
  page: 1,
  producerName: null
};
const defaulttableHeader = [
  {
    prop: "producerName",
    label: "生产商名称",
    width: "180"
  },
  {
    prop: "remark",
    label: "备注",
    width: "180"
  },
  {
    prop: "createdTimeText",
    label: "录入时间",
    width: "180"
  },
  {
    prop: "producerStateText",
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
  name: "manufactureManage",
  components: {
    heltable,
    hlBreadcrumb,
    manufactureformModal
  },
  data() {
    return {
      breadTitle: ["基础信息", "生产商管理"], // 面包屑title
      Dict:Dict,
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
      manufactureObj: null
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
      const res = await this.$api.getProducersList(this.listParams);
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
    async modalConfirm(obj) {
      const serve = this.isEdit ? "updateProducer" : "addProducer";
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
      const { id, producerStateCode, producerName } = obj;
      const operationText = producerStateCode === Dict.STATE_NORMAL ? "禁用" : "激活";
      const serve = producerStateCode === Dict.STATE_NORMAL ? "disableProducer" : "activeProducer";
      that
        .$confirm(`确定要确定要${operationText}生产商${producerName}?`, "提示", {
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
      const { id, producerName, remark } = obj;
      this.manufactureObj = {
        id,
        producerName,
        remark
      };
      this.SET_MODAL_VISIBLE(true);
    },
    add() {
      this.isEdit = false;
      this.manufactureObj = null;
      this.SET_MODAL_VISIBLE(true);
    }
  },
  created() {
    this.clearListParams();
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
