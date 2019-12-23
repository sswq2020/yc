<template>
  <div class="container single-page">
    <HletongBreadcrumb :data="breadTitle">
      <el-button type="primary" size="small" @click="add" icon="el-icon-plus" plain class="text-btn">新增</el-button>
    </HletongBreadcrumb>
    <div class="search-box">
      <div class="form-item">
        <label>大类</label>
        <div class="form-control">
          <el-select v-model="form.productTypeCode" placeholder="请选择" size="small">
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
        <label>品类</label>
        <div class="form-control">
          <el-select v-model="form.firstCatalogId" placeholder="请选择" size="small">
            <el-option
              v-for="(item,index) in firstCatalogList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="form-item">
        <label>牌号名称</label>
        <div class="form-control">
          <el-select v-model="form.secondCatalogId" placeholder="请选择" size="small">
            <el-option
              v-for="(item,index) in trademarkList"
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
            @click="switchState(listData.list[scope.$index])"
          >{{ scope.row.sellState == Dict.STATE_NORMAL ? '禁用' : '激活' }}</el-button>
        </template>
      </el-table-column>
    </HletongTable>
  </div>
</template>

<script>
import {mapMutations } from "vuex";
import moment from "moment";
// import { judgeAuth } from "@/util/util.js";
import Dict from "util/dict.js";
import { DICT_SELECT_ARR,_toArray_ } from "common/util.js";

const TypeProductDatas = DICT_SELECT_ARR(Dict.PRODUCT_CATEGORY);


const defaultFormData = {
   /**商品大类code*/ 
  productTypeCode:null,
  /**品类code*/ 
  firstCatalogId: null,
  /**牌号/规格code*/ 
  secondCatalogId: null
};

const defaultListParams = {
  pageSize: 20,
  page: 1
};
const defaulttableHeader = [
  {
    prop: "productTypeCodeText",
    label: "大类",
    width: "150"    
  },
  {
    prop: "firstCatalogName",
    label: "品类名称",
    width: "150"
  },
  {
    prop: "secondCatalogName",
    label: "牌号",
    width: "150"
  },
  {
    prop: "manufacturerName",
    label: "生产商"
  },
  {
    prop: "measuringName",
    label: "计量方式"
  },
  {
    prop: "createdTimeText",
    label: "录入时间"
  },
  {
    prop: "sellStateText",
    label: "状态"
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
        productTypeCodeText: Dict.PRODUCT_CATEGORY[row.productTypeCode],
        sellStateText: Dict.STATE_NORMAL === row.sellState ? "正常" : "禁用",
        createdTimeText: row.createdTime
          ? moment(row.createdTime).format("YYYY-MM-DD HH:mm:ss")
          : ""
      });
    });
  }
  return list;
};

export default {
  name: "oilQualityInfo",
  data() {
    return {
      breadTitle: ["基础信息", "信息库"], // 面包屑title
      Dict,
      TypeProductDatas,
      // #region 查询的基本数据结构
      listParams: { ...defaultListParams }, // 页数
      listData: { ...defaultListData },
      form: { ...defaultFormData },
      // #endgion

      firstCatalogList: [], //品类
      trademarkList: [], // 牌号联动品类,作为子集
      
      // #region 表格相关
      isListDataLoading: false,
      isdeleteLoading: false,
      isEditLoading: false,
      tableHeader: defaulttableHeader,
      showOverflowTooltip: true,
      // #endgion

      // #region 弹窗相关
      isEdit: false,
      trademarkObj: null
      // #endgion
    };
  },
  methods: {
    ...mapMutations("oilQualityInfo", ["setIsEdit", "setoilQualityInfoId","setProductTypeCode"]),
    GoForm(){
         this.$router.push({
        path: "/web/yc/product/product/pageForSale/form"
      });
    },
    clearListParams() {
      this.form = { ...defaultFormData };
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
      const res = await this.$api.getOilQualityInfoList({
        ...this.listParams,
        ...this.form
      });
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
    /**品类下拉*/
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
    /** 牌号/规格下拉*/
    async _getBrandSelect(categoryId){
      const res = await this.$api.getBrandSelect(categoryId);
      switch (res.code) {
        case Dict.SUCCESS:
          return _toArray_(res.data);
        default:
          this.$messageError(res.mesg);
          break;
      }
    },
    switchState(obj) {
      let that = this;
      const { id, sellState, secondCatalogName, firstCatalogName } = obj;
      const operationText = sellState == Dict.STATE_NORMAL ? "禁用" : "激活";
      that
        .$confirm(
          `确定要${operationText}${firstCatalogName}-${secondCatalogName}?`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
        .then(async () => {
          const response = await that.$api.switchOilQualityInfoState({
            id,
            sellState: sellState === Dict.STATE_NORMAL ? Dict.STATE_BAN : Dict.STATE_NORMAL
          });
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
       let {id,productTypeCode} = obj;
       this.setIsEdit(true);
       this.setProductTypeCode(productTypeCode);
       this.setoilQualityInfoId(id);
       this.GoForm()
    },
    add() {
       this.setIsEdit(false);
       this.setProductTypeCode(null);
       this.setoilQualityInfoId(null)
       this.GoForm()
    }
  },
  created() {
      this.clearListParams();
  },
  watch: {
    'form.productTypeCode':{
      handler(newV,oldV) {
        let that = this;
        if(!newV) {return}
        if(newV !== oldV){
          this.form.firstCatalogId = null
          this.firstCatalogList = [];
          setTimeout(()=>{
             that._getCategorySelectList(newV).then(list => {
               that.firstCatalogList = list || []
             })
          },50)
        }
      }
    },
    "form.firstCatalogId": {
      handler(newV, oldV) {
        let that = this;
        if (newV !== oldV) {
          this.form.secondCatalogId = null;
          this.trademarkList = [];
          if (newV) {
            setTimeout(() => {
             this._getBrandSelect(newV).then(list => {
               that.trademarkList = list || []
             })
            }, 50);
          }
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
