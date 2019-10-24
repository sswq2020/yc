<template>
  <div class="oilQualityInfoglass">
    <el-input placeholder="请选择油品信息" :value="value"   :readonly="true">
      <el-button slot="append" icon="el-icon-search" @click="open"></el-button>
    </el-input>
    <el-dialog
      title="油品信息"
      width="1200px"
      :visible.sync="visible"
      :center="true"
      @close="cancel"
      :close-on-click-modal="false"
    >
      <div class="search-box">
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
          <label>牌号</label>
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
          <label>排放标准</label>
          <div class="form-control">
            <el-select v-model="form.emissionStandard" placeholder="请选择" size="small">
              <el-option
                v-for="(item,index) in HywEmissionStandardList"
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
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="comfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Dict from "util/dict.js";
import moment from "moment";
import { baseMixin, dictMixin } from "common/mixin.js";
import { findIndexByValue } from "common/util.js";
const defaultFormData = {
  firstCatalogId: null,
  secondCatalogId: null,
  emissionStandard: null
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
    prop: "emissionStandardEnumText",
    label: "排放标准",
    width: "120"
  },
  {
    prop: "density",
    label: "密度",
    width: "120"
  },
  {
    prop: "serialNumber",
    label: "产品型号"
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
        emissionStandardEnumText: row.emissionStandardEnum.text || "--", // 排放标准
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
  data() {
    return {
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
    open() {
      this.visible = true;
    },
    cancel() {
      this.visible = false;
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
    "form.firstCatalogId": {
      handler(newV, oldV) {
        if (newV !== oldV) {
          this.form.secondCatalogId = null;
          if (newV) {
            setTimeout(() => {
              const index = findIndexByValue(this.firstCatalogList, newV);
              this.trademarkList = this.firstCatalogList[index].child;
            }, 20);
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
      margin-top: 36px;
    }
  }
}
.tb_pagination {
  text-align: right;
}
</style>

