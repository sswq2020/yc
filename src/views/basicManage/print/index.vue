<template>
  <div class="container single-page">
    <HLBreadcrumb :data="breadTitle">
      <el-button type="primary" size="small" @click="add" icon="el-icon-plus">新增</el-button>
    </HLBreadcrumb>
    <PrintModal/>
  </div>
  
</template>

<script>
import {  mapMutations  } from 'vuex';
import HLBreadcrumb from "@/components/hl-breadcrumb";
import PrintModal from "./printModal.vue";
 
export default {
  name: "productNameManage",
  components: {
    HLBreadcrumb,
    PrintModal
  },
  data() {
    return {
      breadTitle: ["基础信息", "打印"],
    }
  },
  methods: {
    ...mapMutations('modal', ['SET_MODAL_VISIBLE']),
    add() {
      this.SET_MODAL_VISIBLE(true);
    },
  },
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
