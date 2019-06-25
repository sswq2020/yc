<template>
  <div class="container single-page">
    库存表
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "inventoryTable",
  computed: {
    ...mapState("app",["role", "userId", "username"])    
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
