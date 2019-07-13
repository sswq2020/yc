<template>
  <table :id="id" style="border-collapse: collapse;">
    <tr>
      <td colspan="10">
          <div style="display:flex;justify-content:flex-end ">
          <div>NO.SH1905050001</div>
        </div>
      </td>
    </tr>
    <tr>
      <th>提货单位</th>
      <th colspan="3">123123</th>
      <th>提单号</th>
      <th colspan="3">213213</th>
      <th>提货车船号</th>
      <th colspan="3">213213</th>
    </tr>
    <tr>
      <th>原始单据号</th>
      <th colspan="3">123123</th>
      <th>结算方式</th>
      <th colspan="3">213213</th>
      <th>证件号</th>
      <th colspan="3">213213</th>
    </tr>
    <tr>
      <th>类型</th>
      <th>区桩位</th>
      <th>炉号</th>
      <th>品名</th>
      <th>规格</th>
      <th>材质</th>
      <th>产地</th>
      <th>数量</th>
      <th>重量</th>
      <th>备注</th>
    </tr>
    <tr class="alt">
      <td>类型</td>
      <td>区桩位</td>
      <td>炉号</td>
      <td>品名</td>
      <td>规格</td>
      <td>材质</td>
      <td>产地</td>
      <td>数量</td>
      <td>重量</td>
      <td>备注</td>
    </tr>
    <tr class="alt">
      <td colspan="6">合计:</td>
      <td></td>
      <td>0</td>
      <td>1057.62</td>
      <td></td>
    </tr>
    <tr>
      <th colspan="12" height="300px">
        <div style="display:flex;justify-content:space-between">
          <div>制单人:曾问</div>
          <div>理货员(章)</div>
          <div>客户或代表(章)</div>
        </div>
      </th>
    </tr>
  </table>
</template>

<script>
import Dict from "@/util/dict.js";
import { normalTime } from "@/util/util.js";
export default {
  name: "releasePledgeticket",
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      Dict,
      normalTime
    };
  }
};
</script>

<style scoped lang="less">
#customers {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}
#customers td,
#customers th {
  font-size: 1em;
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