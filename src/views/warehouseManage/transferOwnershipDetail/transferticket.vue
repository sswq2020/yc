<template>
  <table :id="id" style="border-collapse: collapse;" v-if="data&&data.length">
    <tr>
      <td colspan="10">
          <div style="display:flex;justify-content:flex-end ">
          <div>NO.{{data[0]&&data[0].incomingId || "-"}}</div>
        </div>
      </td>
    </tr>
    <tr>
      <th>调入货主</th>
      <th colspan="3">{{data[0].originalShipperName || "-"}}</th>
      <th>日期</th>
      <th>{{data[0].transferTime || "-"}}</th>
      <th></th>
      <th colspan="3"></th>
    </tr>
    <tr>
      <th>调出货主</th>
      <th colspan="3">{{data[0].newShipperName || "-"}}</th>
      <th>提单号</th>
      <th></th>
      <th></th>
      <th colspan="3"></th>
    </tr>
    <tr>
      <th v-if="productType!==Dict.PRODUCT_OIL">类型</th>
      <th v-if="productType!==Dict.PRODUCT_OIL">区桩位</th>
      <th v-if="productType!==Dict.PRODUCT_OIL">炉号</th>
      <th v-if="productType!==Dict.PRODUCT_OIL">品名</th>
      <th v-if="productType!==Dict.PRODUCT_OIL">规格</th>
      <th v-if="productType!==Dict.PRODUCT_OIL">材质</th>
      <th v-if="productType!==Dict.PRODUCT_OIL">产地</th>

      <th v-if="productType===Dict.PRODUCT_OIL">储罐编号</th>
      <th v-if="productType===Dict.PRODUCT_OIL">品类</th>
      <th v-if="productType===Dict.PRODUCT_OIL">牌号</th>
      <th v-if="productType===Dict.PRODUCT_OIL">排放标准</th>
      <th v-if="productType===Dict.PRODUCT_OIL">密度</th>
      <th v-if="productType===Dict.PRODUCT_OIL">型号</th>
      <th v-if="productType===Dict.PRODUCT_OIL">生产商</th>  


      <th>数量</th>
      <th>重量</th>
      <th>备注</th>
    </tr>
    <tr class="alt"  v-for="(item,index) in data" :key="index">
      <td v-if="productType!==Dict.PRODUCT_OIL">{{item.transferTypeText || ""}}</td>
      <td v-if="productType!==Dict.PRODUCT_OIL">{{item.pilePosition || ""}}</td>
      <td v-if="productType!==Dict.PRODUCT_OIL">--</td>
      <td v-if="productType!==Dict.PRODUCT_OIL">{{item.productName || ""}}</td>
      <td v-if="productType!==Dict.PRODUCT_OIL">{{item.specificationsName || ""}}</td>
      <td v-if="productType!==Dict.PRODUCT_OIL">{{item.materialName || ""}}</td>
      <td v-if="productType!==Dict.PRODUCT_OIL">{{item.originPlaceName || ""}}</td>

      <td v-if="productType===Dict.PRODUCT_OIL">{{item.oiltank || "--"}}</td>
      <td v-if="productType===Dict.PRODUCT_OIL">{{item.firstCatalog || "--"}}</td>
      <td v-if="productType===Dict.PRODUCT_OIL">{{item.trademark || "--"}}</td>
      <td v-if="productType===Dict.PRODUCT_OIL">{{item.emissionStandard || "--"}}</td>
      <td v-if="productType===Dict.PRODUCT_OIL">{{item.models || "--"}}</td>
      <td v-if="productType===Dict.PRODUCT_OIL">{{item.density || "--"}}</td>
      <td v-if="productType===Dict.PRODUCT_OIL">{{item.manufacturer || "--"}}</td>



      <td>{{item.realTransferNums || ""}}</td>
      <td>{{item.realTransferWeights || ""}}</td>
      <td>{{item.remark || ""}}</td>
    </tr>
    <tr class="alt">
      <td colspan="6">合计:{{data[0].chineseWeights || "--"}}</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th colspan="10" height="300px">
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
  name: "releasePledgeticket",
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