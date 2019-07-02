<template>
  <div class="container single-page">
    <hlBreadcrumb :data="breadTitle">
      <el-button
        class="hlB_buts"
        size="small"
        icon="el-icon-download"
        @click="()=>{this.batchInspectionVisible = true}"
      >入库登记</el-button>
    </hlBreadcrumb>
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
        <label>品名</label>
        <div class="form-control">
          <el-select v-model="form.param_3" placeholder="请选择" size="small">
            <el-option
              v-for="(item,index) in ProductNameList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="form-item">
        <label>材质</label>
        <div class="form-control">
          <el-select v-model="form.param_4" placeholder="请选择" size="small">
            <el-option
              v-for="(item,index) in MaterialList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="form-item">
        <label>规格</label>
        <div class="form-control">
          <el-select v-model="form.param_5" placeholder="请选择" size="small">
            <el-option
              v-for="(item,index) in SpecificationList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="form-item">
        <label>产地</label>
        <div class="form-control">
          <el-select v-model="form.param_6" placeholder="请选择" size="small">
            <el-option
              v-for="(item,index) in OriginPlaceList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
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
      @selection-change="selectChange"
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
    </heltable>
    <transitiondialog
      :data="selectedItems"
      :tableHeader="tableHeader.slice(0,8)"
      :confirmCb="batchInspection"
      :visible="batchInspectionVisible"
      :cancelCb="()=>{this.batchInspectionVisible = false}"
      :title="titles[0]"
    ></transitiondialog>
  </div>
</template>

<script>
import { mapGetters,mapMutations } from "vuex";
import { baseMixin } from "@/common/mixin.js";
// import { judgeAuth } from "@/util/util.js";
import _ from "lodash";
import Dict from "@/util/dict.js";
import heltable from "@/components/hl_table";
import hlBreadcrumb from "@/components/hl-breadcrumb";
import transitiondialog from "@/components/transitiondialog";

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
    prop: "mock4",
    label: "货主",
    width: "180"
  },
  {
    prop: "mock5",
    label: "区桩位",
    width: "180"
  },
  {
    prop: "mock7",
    label: "品名",
    width: "180"
  },
  {
    prop: "mock8",
    label: "材质",
    width: "180"
  },
  {
    prop: "mock9",
    label: "规格",
    width: "180"
  },
  {
    prop: "mock10",
    label: "产地",
    width: "180"
  },
  {
    prop: "mock11",
    label: "应收数量",
    width: "180"
  },
  {
    prop: "mock12",
    label: "数量单位",
    width: "180"
  },
  {
    prop: "reserveweight",
    label: "应收重量",
    width: "180"
  },
  {
    prop: "mock14",
    label: "重量单位",
    width: "180"
  },
  {
    prop: "mock15",
    label: "计量方式",
    width: "180"
  }
];
export default {
  name: "waitCheckEnter",
  mixins: [baseMixin],
  components: {
    heltable,
    hlBreadcrumb,
    transitiondialog
  },
  data() {
    return {
      breadTitle: ["仓储管理", "待验收入库"],
      // #region 各种lodaing
      isListDataLoading: false,
      batchInspectionVisible: false,
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
      selectedItems: [],
      titles: ["入库"]
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
    ...mapMutations("waitCheckEnter", ["setInspection"]),
    selectChange(selection) {
      this.selectedItems = selection.slice();
    },
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
          this.$Message.error(res.errMsg);
          break;
      }
    },
    batchInspection() {
        this.setInspection(this.selectedItems);
        this.$router.push({
          path: "/web/settlement/pageList/waitCheckEnter/checkEnter"
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
