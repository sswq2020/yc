<template>
  <div class="commodityglass">
    <el-input placeholder="请选择物资信息" :value="value" :readonly="true">
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
          <label>物资代码</label>
          <div class="form-control">
            <el-input v-model="form.goodCode" placeholder="请输入" size="small"></el-input>
          </div>
        </div>
        <div class="form-item">
          <label>大类</label>
          <div class="form-control">
            <el-select v-model="form.productTypeCode" placeholder="请选择">
              <el-option
                v-for="item in Object.keys(productTypeCodeData)"
                :key="item"
                :label="productTypeCodeData[item]"
                :value="item"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="form-item">
          <label>品名</label>
          <div class="form-control">
            <el-select v-model="form.productNameId" placeholder="请选择">
              <el-option
                v-for="item in Object.keys(productNameData)"
                :key="item"
                :label="productNameData[item]"
                :value="item"
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
        <el-button @click="cancel" size="small">取消</el-button>
        <el-button type="primary" @click="comfirm" size="small">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";
import Dict from "util/dict.js";
import { baseMixin, dictMixin } from "common/mixin.js";
const defaultFormData = {
  goodCode: null,
  productTypeCode: null, // 品名大类Code
  productNameId: null // 品名Id
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

const defaultAuditResultTableHeader = [
  {
    prop: "goodCode",
    label: "物资代码"
  },
  {
    prop: "productTypeText",
    label: "大类"
  },
  {
    prop: "productName",
    label: "品名"
  },
  {
    prop: "materialName",
    label: "材质"
  },
  {
    prop: "specificationsName",
    label: "规格"
  },
  {
    prop: "originPlaceName",
    label: "产地"
  },
  {
    prop: "createdTimeText",
    label: "录入时间"
  },
  {
    prop: "goodsStatusText",
    label: "状态"
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
        createdTimeText: row.createdTime
          ? moment(row.createdTime).format("YYYY-MM-DD HH:mm:ss")
          : ""
      });
    });
  }
  return list;
};

export default {
  name: "commodityglass",
  mixins: [baseMixin, dictMixin],
  data() {
    return {
      visible: false,
      isListDataLoading: false,
      listParams: { ...defaultListParams }, // 页数
      form: { ...defaultFormData }, // 查询参数
      listData: { ...defaultListData }, // 返回list的数据结构
      tableHeader: [...defaultAuditResultTableHeader],
      productNameData: {}, // 品名下拉数据
      currentRow: null, //选中的那一行数据
      value: null
    };
  },
  computed: mapState("app", ["productTypeCodeData"]),
  methods: {
    ...mapActions("app", ["setYcData"]),
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
      const res = await this.$api.getGoodsList({
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
    /**
     * @author: xh
     * @description: 品名下拉列表
     */
    async getProductNameDropdownData() {
        const res = await this.$api.getProductNameData();
      switch (res.code) {
        case Dict.SUCCESS:
          this.productNameData = res.data;
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
      this.value = this.currentRow.goodCode;
      this.$emit("commoditySelect", this.currentRow);
      this.cancel();
    },
    handleCurrentChange(row) {
      this.currentRow = row;
    }
  },
  created() {
    this.getProductNameDropdownData(); 
    this.setYcData(); // 获取字典项
  },  
  watch: {
    visible(newV) {
      if (newV) {
        this.clearListParams();
      }
    }
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

