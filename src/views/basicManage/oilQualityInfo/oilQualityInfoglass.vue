<template>
  <div class="oilQualityInfoglass">
    <el-input placeholder="请选择" :value="value" :readonly="true">
      <el-button :disabled="disabled" style="margin: -10px -20px;" slot="append" icon="el-icon-search" @click="open"></el-button>
    </el-input>
    <el-dialog
      title="信息库"
      width="1200px"
      :visible.sync="visible"
      :center="true"
      @close="cancel"
      :close-on-click-modal="false"
    >
      <div class="search-box" style="padding:0px;margin:0px 0px 10px 0px;">
        <div class="form-item">
          <label style="line-height:1">大类</label>
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
          <label style="line-height:1">品类</label>
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
          <label style="line-height:1">牌号</label>
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
      <el-table
        v-loading="isListDataLoading"
        stylestripe
        border
        highlight-current-row
        :data="listData.list"
        @current-change="handleCurrentChange"
      >
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :width="item.width || 'auto'"
          :align="item.align || 'center'"
          header-align="center"
          :key="index"
          v-for="(item,index) in tableHeader"
        >
          <template slot-scope="scope">
            <span>{{listData.list[scope.$index][item.prop]}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="tb_pagination">
        <el-pagination
          @current-change="changePage"
          :current-page="listParams.page"
          :page-size="listParams.pageSize"
          layout="total, prev, pager, next"
          :total="listData.paginator.totalCount"
        ></el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel" size="small">取消</el-button>
        <el-button type="primary" @click="comfirm" size="small">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Dict from "util/dict.js";
import { DICT_SELECT_ARR,_toArray_ } from "common/util.js";
import moment from "moment";
import { baseMixin, dictMixin } from "common/mixin.js";

const TypeProductDatas = DICT_SELECT_ARR(Dict.PRODUCT_CATEGORY);

const defaultFormData = {
  productTypeCode:null,
  firstCatalogId: null,
  secondCatalogId: null
};

const defaultListParams = {
  pageSize: 10,
  page: 1
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
    prop: "productTypeCodeText",
    label: "大类",
    width: "150"    
  },
  {
    prop: "firstCatalogName",
    label: "品类",
    width: "150"
  },
  {
    prop: "secondCatalogName",
    label: "规格/牌号",
    width: "150"
  },
  {
    prop: "measuringName",
    label: "计量方式"
  },  
  {
    prop: "manufacturerName",
    label: "生产商"
  },
  {
    prop: "createdTimeText",
    label: "录入时间"
  }
];

const rowAdapter = list => {
  if (!list) {
    return [];
  }
  if (list.length > 0) {
    list = list.map(row => {
      return (row = {
        ...row,
        productTypeCodeText: Dict.PRODUCT_CATEGORY[row.productTypeCode],
        createdTimeText: row.createdTime
          ? moment(row.createdTime).format("YYYY-MM-DD HH:mm:ss")
          : ""
      });
    });
  }
  return list;
};

export default {
  name: "oilQualityInfoglass",
  mixins: [baseMixin, dictMixin],
  props: {
    disabled:{
      type: Boolean,
      default: false
    }
  },  
  data() {
    return {
      TypeProductDatas,
      firstCatalogList: [], //品类
      trademarkList: [], // 牌号联动品类,作为子集

      visible: false,
      isListDataLoading: false,
      listParams: { ...defaultListParams }, // 页数
      form: { ...defaultFormData }, // 查询参数
      listData: { ...defaultListData }, // 返回list的数据结构
      tableHeader: [...defaulttableHeader],
      currentRow: null, //选中的那一行数据
      value:null
    };
  },
  methods: {
    changePage(page) {
      this.listParams.page = page;
      this.getListData();
    },
    changePageSize(pageSize) {
      this.listParams = { ...defaultListParams, pageSize: pageSize };
      this.getListData();
    },
    getListDataBylistParams() {
      this.listParams = { ...defaultListParams };
      this.getListData();
    },
    clearListParams() {
      this.currentRow = null;
      this.form = { ...defaultFormData };
      this.listParams = { ...defaultListParams };
      this.listData = { ...defaultListData };
      this.getListData();
    },
    async getListData() {
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
    open() {
      this.visible = true;
    },
    cancel() {
      this.visible = false;
    },
    clearValue(){
      this.value = ""
    },
    comfirm() {
      if (!this.currentRow) {
        this.$messageError("必须选中一行才能确认");
        return;
      }
      this.value = this.currentRow.firstCatalogName;
      this.$emit("oilQualityInfoSelect", this.currentRow);
      this.cancel();
    },
    handleCurrentChange(row) {
      this.currentRow = row;
    }
  },
  watch: {
    visible(newV) {
      if (newV) {
        this.clearListParams();
      }
    },
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
  },
  created(){
    this._getAllBaseInfo(Dict.PRODUCT_OIL);
  }
};
</script>

<style scoped lang="less">
.search-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 10px;
  padding: 0px 20px;
  background-color: white;
  font-size: 14px;
  .form-item {
    .el-button {
      margin-top: 20px;
    }
  }
}
.tb_pagination {
  text-align: right;
}
</style>

