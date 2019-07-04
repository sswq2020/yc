<template>
  <div class="container single-page">
    <hlBreadcrumb :data="breadTitle"></hlBreadcrumb>
    <div class="search-box">
      <div class="form-item">
        <label>货主名称</label>
        <div class="form-control">
          <el-select v-model="form.param_1" placeholder="请选择" size="small">
            <el-option
              v-for="(item,index) in ShipperList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
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
        <label>出库申请时间</label>
        <div class="form-control">
          <el-date-picker
            v-model="form.param_3"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
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
          <el-button type="text" @click="outer(listData.list[scope.$index])">出库</el-button>
        </template>
      </el-table-column>

    </heltable>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { baseMixin } from "@/common/mixin.js";
// import { judgeAuth } from "@/util/util.js";
import _ from "lodash";
import Dict from "@/util/dict.js";
import heltable from "@/components/hl_table";
import hlBreadcrumb from "@/components/hl-breadcrumb";

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
    label: "货主",
    width: "180"
  },
  {
    prop: "mock3",
    label: "申请出库数量",
    width: "180"
  },
  {
    prop: "mock4",
    label: "申请出库重量",
    width: "180"
  },
  {
    prop: "mock5",
    label: "申请出库时间",
    width: "180"
  }
];
export default {
  name: "waitCheckOuter",
  mixins: [baseMixin],
  components: {
    heltable,
    hlBreadcrumb
  },
  data() {
    return {
      breadTitle: ["仓储管理", "待验收出库"],
      // #region 各种lodaing
      isListDataLoading: false,
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
      titles: ["出库"]
    };
  },
  computed: {
    ...mapGetters("app", ["role", "userId", "username", "IS_SHIPPER"]),
    /**请求参数估计只要id*/
    ids() {
      return this.selectedItems.map(item => {
        return item.id;
      });
    }
  },
  methods: {
    ...mapMutations("waitCheckOuter", ["setRetrieval"]),
    _filter() {
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
          this.$messageError(res.errMsg);
          break;
      }
    },
    outer(item) {
      this.setRetrieval(item);
      this.$router.push({
        path: "/web/settlement/pageList/waitCheckOuter/CheckOuter"
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
