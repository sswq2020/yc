<template>
  <div class="container single-page">
    <hlBreadcrumb :data="breadTitle">
    </hlBreadcrumb>
    入库登记
  </div>
</template>

<script>
import hlBreadcrumb from "@/components/hl-breadcrumb";
export default {
  name: "enterStorageRegister",
  components: {
    hlBreadcrumb
  },
    data() {
    return {
      breadTitle: ["仓储管理", "库存表", "入库登记"],
    };
  },   
}
</script>
>

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
