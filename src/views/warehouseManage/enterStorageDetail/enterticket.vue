<template>
  <table :id="id" style="border-collapse: collapse;" v-if="data&&data.length">
    <tr>
      <td :colspan="productType === Dict.PRODUCT_OIL ? 12: 11">
          <div style="display:flex;justify-content:space-between">
          <div>入单日期:{{data[0]&&normalTime(data[0].incomingTime)}}</div>
          <div>NO.{{data[0]&&data[0].incomingId || "-"}}</div>
        </div>
      </td>
    </tr>
    <tr>
      <th>存货单位</th>
      <th :colspan="productType === Dict.PRODUCT_OIL ? 5: 4"></th>
      <th>车船号</th>
      <th colspan="5"></th>
    </tr>
    <tr>
      <th>原始单据号</th>
      <th :colspan="productType === Dict.PRODUCT_OIL ? 3: 2">{{data[0]&&data[0].oldIncomingId || "-"}}</th>
      <th>操作过程</th>
      <th></th>
      <th>收货单号</th>
      <th colspan="5"></th>
    </tr>
    <tr>
      <th v-if="productType!==Dict.PRODUCT_OIL">品名</th>
      <th v-if="productType!==Dict.PRODUCT_OIL">材质</th>
      <th v-if="productType!==Dict.PRODUCT_OIL">规格</th>
      <th v-if="productType!==Dict.PRODUCT_OIL">炉号</th>
      <th v-if="productType!==Dict.PRODUCT_OIL">产地</th>
      <th v-if="productType!==Dict.PRODUCT_OIL">区桩位</th>

      <th v-if="productType===Dict.PRODUCT_OIL">储罐编号</th>
      <th v-if="productType===Dict.PRODUCT_OIL">品类</th>
      <th v-if="productType===Dict.PRODUCT_OIL">牌号</th>
      <th v-if="productType===Dict.PRODUCT_OIL">排放标准</th>
      <th v-if="productType===Dict.PRODUCT_OIL">密度</th>
      <th v-if="productType===Dict.PRODUCT_OIL">型号</th>
      <th v-if="productType===Dict.PRODUCT_OIL">生产商</th>

      <th>数量</th>
      <th>计量单位</th>
      <th>重量</th>
      <th>计量方式</th>
      <th>备注</th>
    </tr>
    <tr class="alt" v-for="(item,index) in data" :key="index">
      <td v-if="productType!==Dict.PRODUCT_OIL">{{item.productName || "--"}}</td>
      <td v-if="productType!==Dict.PRODUCT_OIL">{{item.materialName || "--"}}</td>
      <td v-if="productType!==Dict.PRODUCT_OIL">{{item.specificationsName || "--"}}</td>
      <td v-if="productType!==Dict.PRODUCT_OIL">--</td>
      <td v-if="productType!==Dict.PRODUCT_OIL">{{item.originPlaceName || "--"}}</td>
      <td v-if="productType!==Dict.PRODUCT_OIL">{{item.pilePosition || "--"}}</td>

      <td v-if="productType===Dict.PRODUCT_OIL">{{item.oilTankCode || "--"}}</td>
      <td v-if="productType===Dict.PRODUCT_OIL">{{item.firstCatalogName || "--"}}</td>
      <td v-if="productType===Dict.PRODUCT_OIL">{{item.secondCatalogName || "--"}}</td>
      <td v-if="productType===Dict.PRODUCT_OIL">{{item.emissionStandardText || "--"}}</td>
      <td v-if="productType===Dict.PRODUCT_OIL">{{item.density || "--"}}</td>
      <td v-if="productType===Dict.PRODUCT_OIL">{{item.serialNumber || "--"}}</td>
      <td v-if="productType===Dict.PRODUCT_OIL">{{item.manufacturerName || "--"}}</td>



      <td>{{item.num || 0}}</td>
      <td>{{item.weightUnitTypeEnum && item.weightUnitTypeEnum.text || "--"}}</td>
      <td>{{item.weight || "--"}}</td>
      <td>{{item.measuringTypeEnum && item.measuringTypeEnum.text || "--"}}</td>
      <td>{{item.remark || "--"}}</td>
    </tr>
    <tr class="alt">
      <td :colspan="productType === Dict.PRODUCT_OIL ? 7: 6">合计:{{data[0].summation || "--"}}</td>
      <td>--</td>
      <td>--</td>
      <td>--</td>
      <td colspan="2"></td>
    </tr>
    <tr class="alt">
      <td :colspan="productType === Dict.PRODUCT_OIL ? 12: 11">摘要</td>
    </tr>
    <tr>
      <th :colspan="productType === Dict.PRODUCT_OIL ? 12: 11" height="300px">
        <div style="display:flex">
          <div style="flex:2;text-align:left">制单人:</div>
          <div style="flex:2;text-align:left">理货员(章):</div>
          <div style="flex:1;text-align:left">客户或代表(章):</div>
        </div>
      </th>
    </tr>
  </table>
</template>

<script>
import Dict from "@/util/dict.js";
import { normalTime } from "@/util/util.js";
export default {
  name: "enterticket",
  props: {
    id: {
      type: String,
      required: true
    },
    data:{
     type: Array,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return []
      }        
    },
    productType:{
      type: String,
      default:Dict.PRODUCT_OIL
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