<template>
  <el-dialog
    :close-on-click-modal="false"
    width="1000px"
    :visible.sync="visible"
    :show-close="showClose"
    :center="true"
    :title="title"
  >
    <table id="customers" style="border-collapse: collapse;">
      <tr>
        <th colspan="3">质押方:镇江中友钢铁物资有限公司</th>
        <th colspan="3">质押方:001</th>
        <th colspan="2">业务类别:总量质押</th>
      </tr>
      <tr>
        <th>货主</th>
        <th>质押数量</th>
        <th>质押重量</th>
        <th>质押金额</th>
        <th>放款金额</th>
        <th>开始时间</th>
        <th>终止时间</th>
      </tr>
      <tr class="alt">
        <td>镇江中友钢铁物资有限公司</td>
        <td>0</td>
        <td>971.410</td>
        <td>5002721.50</td>
        <td>12123</td>
        <td>2009.12.11</td>
        <td>2009.12.30</td>
      </tr>
      <tr class="alt">
        <td>镇江中友钢铁物资有限公司</td>
        <td>0</td>
        <td>971.410</td>
        <td>5002721.50</td>
        <td>12123</td>
        <td>2009.12.11</td>
        <td>2009.12.30</td>
      </tr>
      <tr class="alt">
        <td>镇江中友钢铁物资有限公司</td>
        <td>0</td>
        <td>971.410</td>
        <td>5002721.50</td>
        <td>12123</td>
        <td>2009.12.11</td>
        <td>2009.12.30</td>
      </tr>
      <tr class="alt">
        <td>镇江中友钢铁物资有限公司</td>
        <td>0</td>
        <td>971.410</td>
        <td>5002721.50</td>
        <td>12123</td>
        <td>2009.12.11</td>
        <td>2009.12.30</td>
      </tr>
      <tr class="alt">
        <td>镇江中友钢铁物资有限公司</td>
        <td>0</td>
        <td>971.410</td>
        <td>5002721.50</td>
        <td>12123</td>
        <td>2009.12.11</td>
        <td>2009.12.30</td>
      </tr>
      <tr class="alt">
        <td>镇江中友钢铁物资有限公司</td>
        <td>0</td>
        <td>971.410</td>
        <td>5002721.50</td>
        <td>12123</td>
        <td>2009.12.11</td>
        <td>2009.12.30</td>
      </tr>
      <tr class="alt">
        <td>镇江中友钢铁物资有限公司</td>
        <td>0</td>
        <td>971.410</td>
        <td>5002721.50</td>
        <td>12123</td>
        <td>2009.12.11</td>
        <td>2009.12.30</td>
      </tr>
      <tr class="alt">
        <td>镇江中友钢铁物资有限公司</td>
        <td>0</td>
        <td>971.410</td>
        <td>5002721.50</td>
        <td>12123</td>
        <td>2009.12.11</td>
        <td>2009.12.30</td>
      </tr>
      <tr class="alt">
        <td>镇江中友钢铁物资有限公司</td>
        <td>0</td>
        <td>971.410</td>
        <td>5002721.50</td>
        <td>12123</td>
        <td>2009.12.11</td>
        <td>2009.12.30</td>
      </tr>
      <tr class="alt">
        <td>镇江中友钢铁物资有限公司</td>
        <td>0</td>
        <td>971.410</td>
        <td>5002721.50</td>
        <td>12123</td>
        <td>2009.12.11</td>
        <td>2009.12.30</td>
      </tr>
      <tr class="alt">
        <td>镇江中友钢铁物资有限公司</td>
        <td>0</td>
        <td>971.410</td>
        <td>5002721.50</td>
        <td>12123</td>
        <td>2009.12.11</td>
        <td>2009.12.30</td>
      </tr>
      <tr class="alt">
        <td>镇江中友钢铁物资有限公司</td>
        <td>0</td>
        <td>971.410</td>
        <td>5002721.50</td>
        <td>12123</td>
        <td>2009.12.11</td>
        <td>2009.12.30</td>
      </tr>

      <tr class="alt">
        <td>镇江中友钢铁物资有限公司</td>
        <td>0</td>
        <td>971.410</td>
        <td>5002721.50</td>
        <td>12123</td>
        <td>2009.12.11</td>
        <td>2009.12.30</td>
      </tr>
      <tr class="alt">
        <td>镇江中友钢铁物资有限公司</td>
        <td>0</td>
        <td>971.410</td>
        <td>5002721.50</td>
        <td>12123</td>
        <td>2009.12.11</td>
        <td>2009.12.30</td>
      </tr>
    </table>
    <div slot="footer" class="dialog-footer">
      <PrintBtn contentId="customers"/>
      <el-button @click="cancle()">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import PrintBtn from '@/components/print.vue';
export default {
  name: "tickets",
  components: {
    PrintBtn
  },  
  props: {
    title: {
      type: String,
      default: ""
    },
    visible: {
      type: Boolean,
      default: false
    },
    confirmCb: {
      type: Function,
      default: () => {}
    },
    cancelCb: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      showClose: false
    };
  },
  methods: {
    cancle() {
      this.cancelCb();
    },
    confirm() {
      this.confirmCb();
    }
  }
};
</script>
<style scoped lang="less">
#customers {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  width: 100%;
  border-collapse: collapse;
  font-size:12px;
}
#customers td,
#customers th {
  font-size:1em;
  border: 1px solid #000000;
  padding: 3px 7px 2px 7px;
}
#customers th {
  text-align: center;
  padding-top: 5px;
  padding-bottom: 4px;
  color: #000000;
}
#customers tr.alt td {
  color: #000000;
}
</style>
