<template>
  <div class="container single-page">
    <HletongBreadcrumb :data="breadTitle">
      <el-button type="primary" size="small" @click="add" icon="el-icon-plus" plain class="text-btn">新增</el-button>
    </HletongBreadcrumb>
    <div class="search-box">
      <div class="form-item">
        <label>大类</label>
        <div class="form-control">
          <el-select v-model="listParams.productTypeCode" placeholder="请选择" size="small">
            <el-option
              v-for="(item,index) in TypeProductDatas"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="form-item">
        <label>品类名称</label>
        <div class="form-control">
          <el-select v-model="listParams.categoryId" placeholder="请选择" size="small">
            <el-option
              v-for="(item,index) in selectList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="form-item">
        <label>规格/牌号名称</label>
        <div class="form-control">
          <el-input v-model="listParams.brandName" placeholder="请输入" size="small"></el-input>
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
          >{{ scope.row.brandStateCode == Dict.STATE_NORMAL ? '禁用' : '激活' }}</el-button>
        </template>
      </el-table-column>
    </HletongTable>
    <trademarkformModal
      ref="modal"
      :loading="isEditLoading"
      :isEdit="isEdit"
      :productTypes="TypeProductDatas"
      :confirmCb="modalConfirm"
      :trademarkObj="trademarkObj"
      :list="outerlist"
    ></trademarkformModal>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import moment from "moment";
// import { judgeAuth } from "@/util/util.js";
import { DICT_SELECT_ARR } from "common/util";
import Dict from "util/dict.js";
import trademarkformModal from "./trademarkformModal.vue";
import { _toArray_ } from "common/util.js";

const TypeProductDatas = DICT_SELECT_ARR(Dict.PRODUCT_CATEGORY);

const defaultListParams = {
  pageSize: 20,
  page: 1,
  brandName: null,
  categoryId: null,
  productTypeCode:null
};
const defaulttableHeader = [
  {
    prop: "categoryName",
    label: "品类",
    width: "180"
  },
  {
    prop: "brandNameText",
    label: "规格/牌号",
    width: "180"
  },
  {
    prop: "createdTimeText",
    label: "录入时间",
    width: "180"
  },
  {
    prop: "brandStateText",
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
          : "",
        brandNameText : (row.productTypeCode !== Dict.PRODUCT_OIL ? row.brandName : `${row.brandName}(${row.emissionStandard})`)
      });
    });
  }
  return list;
};

export default {
  name: "trademarkManage",
  components: {
    trademarkformModal
  },
  data() {
    return {
      breadTitle: ["基础信息", "规格/牌号管理"], // 面包屑title
      Dict,
      TypeProductDatas,
      selectList: [],
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
      trademarkObj: null,
      outerlist:[]
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
      const res = await this.$api.getBrandsList(this.listParams);
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
    async _getCategorySelectList(productTypeCode) {
      const res = await this.$api.getCategorySelectList(productTypeCode);
      switch (res.code) {
        case Dict.SUCCESS:
          return _toArray_(res.data);
        default:
          this.$messageError(res.mesg);
          break;
      }
    },
    async modalConfirm(obj) {
      this.isEditLoading = true;
      const serve = this.isEdit ? "updateBrand" : "addBrand";
      const response = await this.$api[serve]({ ...obj });
      this.isEditLoading = false;
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
      const { id, brandStateCode, brandName, categoryName } = obj;
      const operationText = brandStateCode == Dict.STATE_NORMAL ? "禁用" : "激活";
      const serve = brandStateCode == Dict.STATE_NORMAL ? "disableBrand" : "activeBrand";
      that
        .$confirm(
          `确定要确定要${operationText}${categoryName}-${brandName}?`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
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
      const { id, brandName,categoryId,productTypeCode,emissionStandard,remark } = obj;
      this.trademarkObj = {
        id,
        brandName,
        categoryId,
        productTypeCode,
        emissionStandard,
        remark
      };
      this._getCategorySelectList(productTypeCode).then(list => {
        this.outerlist = list || []
        this.SET_MODAL_VISIBLE(true);
      })
    },
    add() {
      this.isEdit = false;
      this.trademarkObj = null;
      this.SET_MODAL_VISIBLE(true);
    }
  },
  created() {
    this.clearListParams();
  },
  watch:{
    'listParams.productTypeCode':{
      handler(newV,oldV) {
        let that = this;
        if(!newV) {return}
        if(newV !== oldV){
          this.selectList = [];
          setTimeout(()=>{
             this._getCategorySelectList(newV).then(list => {
               that.selectList = list || []
             })
          },50)
        }
      }
    }
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
