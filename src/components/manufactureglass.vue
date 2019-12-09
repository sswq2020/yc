<template>
  <div class="manufactureglass">
    <el-input placeholder="请选择生产商" :value="value" :readonly="true">
      <el-button style="margin: -10px -20px;" :disabled="disabled" slot="append" icon="el-icon-search" @click="open"></el-button>
    </el-input>
    <el-dialog
      title="生产商"
      width="1200px"
      :visible.sync="visible"
      :center="true"
      @close="cancel"
      :close-on-click-modal="false"
    >
      <div class="search-box" style="padding:0px;margin:0px 0px 10px 0px;">
        <div class="form-item">
          <label style="line-height:1">生产商名称</label>
          <div class="form-control">
            <el-input v-model="form.producerName" placeholder="请输入" size="small"></el-input>
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
          :align="item.align || 'left'"
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
      <div slot="footer" class="dialog-footer" style="float:right">
        <el-button @click="cancel" size="small">取消</el-button>
        <el-button type="primary" @click="comfirm" size="small">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Dict from "util/dict.js";
import moment from "moment";
const defaultFormData = {
  producerName: null
};

const defaultListParams = {
  pageSize: 5,
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
  name: "manufactureglass",
  props: {
    disabled:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      isListDataLoading: false,
      listParams: { ...defaultListParams }, // 页数
      form: { ...defaultFormData }, // 查询参数
      listData: { ...defaultListData }, // 返回list的数据结构
      tableHeader: [...defaultAuditResultTableHeader],
      currentRow:null, //选中的那一行数据
      value: null
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
      const res = await this.$api.getVIPList({
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
    clearValue(){
      this.value = ""
    },
    comfirm() {
      if(!this.currentRow) {
        this.$messageError("必须选中一行才能确认");
        return
      }
      this.value = this.currentRow.producerName || "";
      this.$emit('manufactureSelect',this.currentRow);
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
      margin-top: 20px;
    }
  }
}
.tb_pagination {
  text-align: right;
}
</style>

