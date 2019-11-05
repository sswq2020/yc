<template>
  <div class="cargoglass">
    <el-input placeholder="请选择货主" :value="value" :readonly="true" class="input-with-select">
      <el-button style="margin: -10px -20px;" :disabled="disabled" slot="append" icon="el-icon-search" @click="open"></el-button>
    </el-input>
    <el-dialog
      title="货主"
      width="1200px"
      :visible.sync="visible"
      :center="true"
      @close="cancel"
      :close-on-click-modal="false"
    >
      <div class="search-box">
        <div class="form-item">
          <label style="line-height:32px;">用户名</label>
          <div class="form-control">
            <el-input v-model="form.username" placeholder="请输入" size="small"></el-input>
          </div>
        </div>
        <div class="form-item">
          <label style="line-height:32px;">手机号</label>
          <div class="form-control">
            <el-input v-model="form.phone" placeholder="请输入" size="small"></el-input>
          </div>
        </div>
        <div class="form-item">
          <label style="line-height:32px;">公司名称</label>
          <div class="form-control">
            <el-input v-model="form.name" placeholder="请输入" size="small"></el-input>
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
const defaultFormData = {
  name: null,
  phone: null,
  username:null
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
    prop: "username",
    label: "用户名"
  },
  {
    prop: "phone",
    label: "手机号"
  },
  {
    prop: "name",
    label: "公司名称"
  },
  {
    prop: "telNo",
    label: "公司电话"
  },
  {
    prop: "addressText",
    label: "公司地址",
    width:"300px"
  },
];

const rowAdapter = list => {
  if (!list) {
    return [];
  }
  if (list.length > 0) {
    list = list.map(row => {
      return (row = {
        ...row,
        addressText:`${row.province || ''}${row.city || ''}${row.county || ''}${row.address || ''}`
      });
    });
  }
  return list;
};

export default {
  name: "cargoglass",
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
      this.value = this.currentRow.username || "";
      this.$emit('cargoSelect',this.currentRow);
      this.cancel();
    },
    handleCurrentChange(row) {
      this.currentRow = row;
    }
  },
  watch: {
    visible(newV, oldV) {
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

