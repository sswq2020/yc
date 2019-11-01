import pathToRegexp from "path-to-regexp";
import mockjs from "mockjs";

export const hostList = {
    // dev: '//192.168.4.16:25092/hletoil', // 易凯/
    // dev: '//192.168.4.16:25084/hletoil', // 周扬
    development: '//oil.hlet.com/hletoil', // 测试
    // dev: '//192.168.4.16:25091/hletoil', // 佘慧   13888888888   888888       admin 888888
    // dev: '//test.hletong.com/hletoil', // 佘慧   13888888888   888888       admin 888888
    test: '//10.1.15.106:8445',
    ywtest:'//10.1.15.110:8445',
    production: '//yc.hletong.com/apis',
    default: ""
};

const IS_MOCK = true;
const storageURL = ""

const dict = { 'SUCCESS': "000000" }

const body = {
    "code": dict.SUCCESS,
    "mesg": "处理成功",
    "timestamp": new Date().getTime(),
    "data": {},

}

const body_fail = {
    "code": "HL070002000",
    "data": {
        "failMap": {
            "key1": "系统错误1",
            "key2": "系统错误2",
            "key3": "系统错误3",
            "key4": "系统错误4",
        },
        successList: [],
    },
    "mesg": "系统错误"
}

const shipperManageList = {
    "id|+1": "@INTEGER(1,2019690999)",
    "mock1": "12344435", //业务单号
    "mock2": "CYJY@INTEGER(2019690000,2019690999)", //业务单号
    "mock3": "@PICK('盖蓬费', '超损费','车船运费')", // 款项
    "mock4": "@float(200,999)", // 金额(元)
    "mock5": "@PICK(1,0)", // 数据来源
    "mock6": "集配货运", // 数据来源 名称
    "mock7": "惠龙易通@CITY()公司", // 转出账户名
    "mock8": "65521464564654987654", // 转出账户号
    "mock9": "@CNAME()", // 转入账户名 
    "mock10": "65521464564654987654", // 转入账户号
    "mock11": "@PICK('中国','中信')银行", // 转入账户开户机构名称
}

const InventoryTableList = {
    "id|+1": "@INTEGER(1,2019690999)",
    "availableNumInventory": 0,
    "availableWeightInventory": 12,
    "createdBy": "",
    "createdTime": "",
    "disableNumInventory": 0,
    "disableWeightInventory": 0,
    "incomingId": "CYJY@INTEGER(2019690000,2019690999)", //入库单号
    "incomingTime": '@DATE("yyyy-MM-dd HH:mm:ss")', // 入库时间
    "incomingType": "1",
    "isDeleted": 0,
    "measuring": "1",
    "remark": "",
    "updatedBy": "",
    "updatedTime": "",
    "version": 0,
    "volumeNumSold": 0,
    "volumeWeightSold": 0,
    "deliveryStoreId": "",
    "deliveryStore": "@PICK('仓库一','仓库二')", // 仓库
    "userId": "@PICK('1','2')",
    "name": "@PICK('货主1','货主2')", // 货主
    "pilePositionId": "",
    "pilePosition": "A",// 区桩位
    "piles": '054', // 层数
    "productNameId": "",
    "productName": "H型钢", // 品名
    "materialId": "",
    "materialName": "Q235", // 材质
    "specificationsId": "",
    "specificationsName": "350*175", // 规格
    "originPlaceId": "",
    "originPlaceName": "江苏镇江沙钢", // 产地
    "totalNumInventory": 96, // 库存数量
    "numUnit": "支", // 数量单位
    "totalWeightInventory": 6, // 库存重量
    "weightUnit": "吨", // 重量单位
    "numUnitTypeEnum": { code: "1", text: "件" }, // 数量单位
    "measuringTypeEnum": { code: "1", text: "理算" }, // 计量方式
    "wareHousingTypeEnum": { code: "1", text: "过货入库" }, //入库类型
    "incomingDays": 0, //入库天数
    "oilTankCode": "@PICK('1','2')号罐", // 油罐编号
    "oilTankId": "@PICK('1','2')号罐", // 油罐Id
    "firstCatalogId": "2", // 品类id
    "firstCatalogName": "汽油",
    "secondCatalogId":"",
    "secondCatalogName":"@PICK('92','95')", // 牌号
    "trademark": "@PICK('0','92','95')", // 牌号
    "emissionStandard": "@PICK('国五','国六')",// 排放标准
    "productNumber": "型号1", // 型号
    "density": "100", //密度
    "producerId": "",
    "producerName": "生产商1", // 生产商
}

const InventoryDetailList = {
    "id|+1": "@INTEGER(1,2019690999)", // 主键
    "createdBy": "",
    "createdTime": '@DATE("yyyy-MM-dd HH:mm:ss")',
    "isDeleted": 0,
    "remark": "",
    "state": "@PICK('0','1','2','3')",
    "updatedBy": "",
    "updatedTime": '@DATE("yyyy-MM-dd HH:mm:ss")',
    "version": 0,
    "totalNumInventory": 96, // 库存数量
    "numUnit": "支", // 数量单位
    "totalWeightInventory": 6, // 库存重量
    "weightUnit": "吨", // 重量单位
    "operateNum": 34, // 操作数量
    "operateWeight": 185, // 操作重量
    "stockInventoryId|+1": "@INTEGER(1,2019690999)" // 库存id
}

const StockRegisterDetailList = {
    ...InventoryTableList,
    "num": 23,
    "weight": 243,
    "registerId": "SH1905060002"
}

const StockRegisterList = {
    ...InventoryTableList,
    "num": 23, // 实收数量
    "weight": 243,//实收重量
    "supposedNum": 56, // 应收数量
    "supposedWeight": 130, // 应收重量
    "registerTime": '@DATE("yyyy-MM-dd HH:mm:ss")'
}

const StockRemovalDetailList = {
    ...InventoryTableList,
    "removalId|+1": "@INTEGER(1,2019690999)",
    "actualRemovalNum": 65,
    "actualRemovalWeight": 99,
    "applyRemovalTime": '@DATE("yyyy-MM-dd HH:mm:ss")',
    "supposedRemovalNum": 65,
    "supposedRemovalWeight": 84,
    "consignee": '@CNAME()',
    'pickUpPassword': 12323,
    'outsideType': '库存发货'
}


const StockRemovalList = {
    ...InventoryTableList,
    "removalId|+1": "@INTEGER(1,2019690999)",
    "actualRemovalNum": 65,
    "actualRemovalWeight": 99,
    "applyRemovalTime": '@DATE("yyyy-MM-dd HH:mm:ss")',
    "supposedRemovalNum": 65,
    "supposedRemovalWeight": 84,
}

const TransferinfoList = {
    ...InventoryTableList,
    availableNumInventory: "@INTEGER(100,250)",
    availableWeightInventory: "@INTEGER(100,250)"
}

const TransferDetailList = {
    ...InventoryTableList,
    newShipperName: "@CNAME()", // 新货主
    originalShipperName: "@CNAME()", // 原货主
    realTransferNums: 34, // 实际过户数量
    realTransferWeights: 168, // 实际过户重量
    transferNums: 65, // 过户数量
    transferWeights: 897, // 过户重量
    transferTime: '@DATE("yyyy-MM-dd HH:mm:ss")', // 过户时间
    transferType: "@PICK('收货入库','过货入库')" // 过户类型
}

const RetrievalList = {
    ...InventoryTableList,
    "removalId|+1": "@INTEGER(1,2019690999)",
    "actualRemovalNum": 65,
    "actualRemovalWeight": 99,
    "applyRemovalTime": '@DATE("yyyy-MM-dd HH:mm:ss")',
    "supposedRemovalNum": 65,
    "supposedRemovalWeight": 84,
    "pickUpPassword": "",
}

const PledgeinfolIST = {
    "id|+1": "@INTEGER(1,2019690999)",
    "cargoName": "@CNAME()",
    "cargoId": "@INTEGER(1,2019690999)",
    "createdBy": "system",
    "createdTime": '@DATE("yyyy-MM-dd HH:mm:ss")',
    "pledgeCode": "@INTEGER(34345656546,99345656546)",
    "inventoryTotalNums": "@INTEGER(2,1000)",
    "inventoryTotalWeight": "@INTEGER(11,100)",
    "isDeleted": "@PICK(0,1)",
    "remark": "@CTITLE(2,10)",
    "inventoryAvailableWeight": "@PICK(0,67,100,150)",
    "totalPledgeNums": "@INTEGER(1000,2000)",
    "totalPledgeWeight": "@INTEGER(100,200)",
    "updatedBy": "admin",
    "updatedTime": '@DATE("yyyy-MM-dd HH:mm:ss")'
}

const PledgeDetailList = {
    "id|+1": "@INTEGER(1,2019690999)",
    "cargoName": "@CNAME()",
    "cargoId": "@INTEGER(1,2019690999)",
    "createdBy": "system",
    "createdTime": '@DATE("yyyy-MM-dd HH:mm:ss")',
    "inventoryTotalNums": "@INTEGER(2,1000)",
    "inventoryTotalWeight": "@INTEGER(11,100)",
    "pledgeCargo": "@CNAME()",
    "pledgeCode": "@INTEGER(34345656546,99345656546)",
    "pledgeNums": "@INTEGER(1000,2000)",
    "pledgeType": "@PICK(0,1)",
    "pledgeWeight": "@INTEGER(100,200)",
    "pledgeTime": '@DATE("yyyy-MM-dd HH:mm:ss")',
    "updatedBy": "admin",
    "updatedTime": '@DATE("yyyy-MM-dd HH:mm:ss")'
}

const ReleasePledgeDetailList = {
    "id|+1": "@INTEGER(1,2019690999)",
    "cargoName": "@CNAME()",
    "cargoId": "@INTEGER(1,2019690999)",
    "createdBy": "system",
    "createdTime": '@DATE("yyyy-MM-dd HH:mm:ss")',
    "inventoryTotalNums": "@INTEGER(2,1000)",
    "inventoryTotalWeight": "@INTEGER(11,100)",
    "pledgeCargo": "@CNAME()",
    "releaseCode": "@INTEGER(34345656546,99345656546)",
    "releaseNums": "@INTEGER(1000,2000)",
    "pledgeType": "@PICK(0,1)",
    "releaseWeight": "@INTEGER(100,200)",
    "releaseTime": '@DATE("yyyy-MM-dd HH:mm:ss")',
    "updatedBy": "admin",
    "updatedTime": '@DATE("yyyy-MM-dd HH:mm:ss")'
}

const stockRemovalBill = {
    ...InventoryTableList,
    "removalId|+1": "@INTEGER(1,2019690999)", // 出库单号
    "actualRemovalNum": 65,
    "actualRemovalWeight": 99,
    "applyRemovalTime": '@DATE("yyyy-MM-dd HH:mm:ss")',
    "consignee": '@CNAME()',
    'pickUpPassword': 12323,
    'outsideType': '库存发货'
}

const paramsData =
{
    classifyId: "7",
    "id": "@INTEGER(2,2019690999)",
    paraName: "@CTITLE(2,4)"
}

const paraValue =
{
    ...paramsData,
    paraValue: "@CTITLE(6,7)"
}

const cargoList = {
    "id|+1": "@INTEGER(1,2019690999)",
    "text": "@CNAME()",
    "sonSearchList": []
}
const specificationsList = {
    "id|+1": "@INTEGER(1,2019690999)",
    "text": "@INTEGER(1,20)mm*@INTEGER(1,20)mm*30mm",
    "sonSearchList": []
}
const materialList = { id: "8293674dcc74426e97983b85f5bfd305", text: "ABC1", sonSearchList: [] }
const originPlaceList = { id: "bc5ecc7158f44eccae90cada6e986165", text: "测试1", sonSearchList: [] }
const productNameList = {
    "id|+1": "@INTEGER(1,2019690999)",
    "text": "@PICK('粗石油','H型钢')@INTEGER(1,222)",
    "sonSearchList": []
}
const pilePositionList = {
    "id|+1": "@INTEGER(1,2019690999)",
    "text": "区桩@PICK('A','B','C','D','E')",
    "sonSearchList": []
}
const emissionStandardList = {
    "id|+1": "@INTEGER(1,2019690999)",
    "text": "('国六','国五')",
    "sonSearchList": []
}

const pageMemberList = {
    "id|+1": "@INTEGER(1,2019690999)",
    "phone": "@INTEGER(13012819898,18912819898)",
    "name": "@CTITLE(7,9)公司",
    "username": "@CNAME(2,3)",
    "telNo": "@INTEGER(13012819898,18912819898)",
    "address": '@PROVINCE()@CITY()@CTITLE(2,10)@INTEGER(1,100)号',
    "grantTime": '@DATE("yyyy-MM-dd HH:mm:ss")',
    "state": "@PICK('0','1')",  // 1正常 0禁止
    "userId": "@INTEGER(1,2019690999)",  // 会员id
}

const EnterpriseList = {
    "id|+1":"@INTEGER(1,2019690999)",
    "extInfo": {
        "address": '@PROVINCE()@CITY()@CTITLE(2,10)@INTEGER(1,100)号', // 地址
        "bizIdNo": "@INTEGER(321102199108120001,321102200208120034)",  //业务联系人身份证号
        "bizName": "@CNAME()", //业务联系人名称
        "city": "@CITY()", // 所属市
        "county": "@COUNTY()", // 所属区/县
        "creditCode": "@INTEGER(321102199108120001,321102200208120034)", // 统一社会信用代码
        "effectiveDt": '@DATE("yyyy-MM-dd")', //营业生效日期
        "entType_": "@PICK('股份有限公司','有限责任公司')", // 企业类型Text
        "expireDt": '@DATE("yyyy-MM-dd")', // //营业到期日期
        "legalPersonName": "@CNAME()", // 法人姓名
        "name": "@CNAME()", // 企业名称
        "province": "@PROVINCE()", //所属省
        "userId": "@INTEGER(1,2019690999)", //用户id
        "isRetrade":"@PICK('0','1')" // 重复交易
    }
}

const PICLIST1 = [
'https://gss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3764408578,1682053584&fm=173&app=49&f=JPEG?w=218&h=146&s=EEBA33C344B0359C0B9CD01A0100C092',
'https://gss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1704057549,3981133715&fm=173&app=49&f=JPEG?w=218&h=146&s=2D9306D971B8EE3ED25DA1DA0300D033',
]

const PICLIST2 = [
    'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        'https://gss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3245319348,1127212882&fm=173&app=49&f=PNG?w=218&h=146&s=BD01703354107BC2122849CF0300E030'
    ]

const agreementList = {
    "agreementName": "买方@CTITLE(2)协议", // 协议名称
    "contractCompany": "惠龙易通",
    "contractCompanyId":"0",
    "dueTime": null, // 到期时间
    "effectTime": new Date(), // 生效时间
    "fileIdList":new Array(4).fill('984ffb1bcd4145e4951d47573f037415'), // 图片的fileId数组
    "picUrlList": Math.random() > 0.3 ?  PICLIST1 : PICLIST2 , // 图片的fileId数组对应的URL
    "id|+1":"@INTEGER(1,2019690999)", // 每一行的主键，但是新增的没有
}

const VIPInfoData = {
    ...EnterpriseList.extInfo,
    "agreementList|2-3":[agreementList]
}


const MockRole = {
    role: "@PICK('1','2')"  // 货主 1,仓管员 2
}

const oilQualityInfoList = {
    "id|+1": "@INTEGER(1,2019690999)",
    "createdTime": '@DATE("yyyy-MM-dd HH:mm:ss")',
    "sellState": "@PICK('0','1')",
    "productNumber": "@INTEGER(1,2019690999)",
    "density": "34",
    "emissionStandard": "0",
    "emissionStandardEnum": { text: "惠龙排放标准1" },
    "fileId": "324234",
    "firstCatalogId": "@INTEGER(1,2019690999)",
    "firstCatalogName": "@CTITLE(2,4)",
    "manufacturerId": "@INTEGER(1,2019690999)",
    "manufacturerName": "@CTITLE(2,4)公司",
    "picUrl": "",
    "secondCatalogId": "@INTEGER(1,2019690999)",
    "secondCatalogName": "@CTITLE(2,4)",
    "sellStateEnum": "",
    "parameterList": [
        {
            "classifyId": 0,
            "id": 0,
            "paraName": "",
            "paraType": "",
            "paraValue": "",
            "sort": 0
        }
    ],
}


const mockRouterMap = {
    [hostList.default]: [
        // #region 基础信息

        // #region  查询货主管理列表
        {
            isMock: IS_MOCK,
            methods: 'get',
            router: storageURL + '/web/settlement/pageList/shipperManage',
            result(params) {
                return {
                    ...body,
                    ...{
                        data: {
                            'list|1-10': [shipperManageList],
                            "paginator": {
                                "currentPage": params.page,
                                "pageSize": params.pageSize,
                                "totalCount": 1000,
                                "totalPage": 1000 / params.pageSize
                            }
                        },
                    },
                };
            }
        },
        // #endregion 

        // #region  删除货主
        {
            isMock: IS_MOCK,
            methods: 'post',
            router: '/web/Shipper/delete',
            result(params) {
                return {
                    ...body,
                };
            }
        },
        // #endregion    

        // #region  编辑货主
        {
            isMock: IS_MOCK,
            methods: 'post',
            router: '/web/Shipper/update',
            result() {
                return {
                    ...body,
                };
            }
        },
        // #endregion    

        // #region  新增货主
        {
            isMock: IS_MOCK,
            methods: 'post',
            router: '/web/Shipper/create',
            result() {
                return {
                    ...body,
                };
            }
        },
        // #endregion    

        // #region  货主检索条件
        {
            isMock: IS_MOCK,
            methods: 'get',
            router: storageURL + '/web/yc/search/cargo',
            result() {
                return {
                    ...body,
                    "data|5-6": [cargoList],
                };
            }
        },
        // #endregion 

        // #region  交割库下拉(专门为入库登记设计)
        {
            isMock: IS_MOCK,
            methods: 'get',
            router: storageURL + '/web/yc/base/deliveryStoreManage/select',
            result() {
                return {
                    ...body,
                    data: {
                        "bc5ecc7158f44eccae90cada6e986165": "仓库1",
                        "bc5ecc7158f44ecc56": "仓库2"
                    },
                };
            }
        },
        // #endregion 

        // #region  油罐下拉(专门为入库登记设计,与交割库联动)
        {
            isMock: IS_MOCK,
            methods: 'get',
            router: storageURL + '/web/yc/base/oilTank/select',
            result() {
                return {
                    ...body,
                    data: {
                        "778": "1号罐",
                        "212": "2号罐",
                        "333": "6号罐",
                    },
                };
            }
        },
        // #endregion 

        // #region  区装位下拉列表(根据仓库id,专门为入库登记设计)
        {
            isMock: IS_MOCK,
            methods: 'get',
            router: storageURL + '/web/yc/base/pilePosition/select',
            result() {
                return {
                    ...body,
                    data: {
                        "1212": "区装位1",
                        "3333": "区装位2"
                    }
                };
            }
        },
        // #endregion 

        // #region  油品信息分页查询
        {
            isMock: IS_MOCK,
            methods: 'post',
            router: storageURL + '/web/yc/product/product/pageForSale',
            result(params) {
                return {
                    ...body,
                    ...{
                        data: {
                            'list|10-20': [oilQualityInfoList],
                            "paginator": {
                                "currentPage": params.page,
                                "pageSize": params.pageSize,
                                "totalCount": 1000,
                                "totalPage": 1000 / params.pageSize
                            }
                        },
                    },
                };
            }
        },
        // #endregion 

        // #region  品类下拉列表
        {
            isMock: IS_MOCK,
            methods: 'post',
            router: storageURL + '/web/yc/base/category/select',
            result() {
                return {
                    ...body,
                    ...{
                        data: {
                            '787822':"汽油",
                            '787866':"柴油",
                            '787888':"润滑油",                           
                        },
                    },
                };
            }
        },
        // #endregion 

        // #region  商品详情页/编辑查询
        {
            isMock: IS_MOCK,
            methods: 'get',
            router: storageURL + '/web/yc/open/product/product/get',
            result(params) {
                return {
                    ...body,
                    data: {
                        id: params.id,
                        fileId: '121212',
                        firstCatalogId: '5',
                        secondCatalogId: '51',
                        emissionStandard: "0",
                        density: 'mock',
                        productNumber : 'mock',
                        addressProvince:"@PROVINCE()",
                        manufacturerId: "213123123",
                        price: '23',
                        totalWeightInventory: "12",
                        sellState: "1",
                        picUrl:"https://gss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2324433426,425917240&fm=173&app=25&f=JPEG?w=218&h=146&s=6A814187406328AE248498A7030040A1",
                        'parameterList|23': [paraValue]
                    }
                };
            }
        },
        // #endregion 

        // #region  牌号下动态加载的各个参数
        {
            isMock: IS_MOCK,
            methods: 'get',
            router: storageURL +  '/web/yc/getParameterById',
            result(params) {
                return {
                    ...body,
                    'data|20-40': [{ ...paramsData, ...{ classifyId: params.id } }]
                };
            }
        },


        // #endregion

        // #region  生产商下拉列表
        {
            isMock: IS_MOCK,
            methods: 'get',
            router: storageURL + '/web/yc/base/producer/select',
            result() {
                return {
                    ...body,
                    ...{
                        data: {
                            '213123123':"生产商1",
                            '213123156':"生产商2",
                            '213123173':"生产商3"                         
                        },
                    },
                };
            }
        },
        // #endregion 


        // #region 仓储信息

        // #region  入库登记
        {
            isMock: IS_MOCK,
            methods: 'post',
            router: storageURL + '/web/yc/base/stockRegister/add',
            result(params) {
                return {
                    ...body
                };
            }
        },
        // #endregion 

        // #region  获取库存表列表
        {
            isMock: IS_MOCK,
            methods: 'post',
            router: storageURL + '/web/yc/storage/stockInventory/page',
            result(params) {
                return {
                    ...body,
                    ...{
                        data: {
                            'list|10-20': [InventoryTableList],
                            "paginator": {
                                "currentPage": params.page,
                                "pageSize": params.pageSize,
                                "totalCount": 1000,
                                "totalPage": 1000 / params.pageSize
                            }
                        },
                    },
                };
            }
        },
        // #endregion 

        // #region  获取库存明细分页
        {
            isMock: IS_MOCK,
            methods: 'post',
            router: storageURL + '/web/yc/storage/stockInventoryDetail/page',
            result(params) {
                return {
                    ...body,
                    ...{
                        data: {
                            'list|10-20': [InventoryDetailList],
                            "paginator": {
                                "currentPage": params.page,
                                "pageSize": params.pageSize,
                                "totalCount": 1000,
                                "totalPage": 1000 / params.pageSize
                            }
                        },
                    },
                };
            }
        },
        // #endregion 

        // #region  查询选中的是否还有余量
        {
            isMock: IS_MOCK,
            methods: 'post',
            router: storageURL + '/web/InventoryTable/surplus',
            result() {
                return {
                    ...body,
                    ...{
                        data: {
                            HasSurPlus: Math.random() > 0.0001 ? true : false
                        },
                    },
                };
            }
        },
        // #endregion 

        // #region  选中的进行冻结
        {
            isMock: IS_MOCK,
            methods: 'post',
            router: storageURL + '/web/yc/inventory/frozen',
            result() {
                return {
                    ...body,
                };
            }
        },
        // #endregion 

        // #region  选中的进行解冻
        {
            isMock: IS_MOCK,
            methods: 'post',
            router: storageURL + '/web/yc/inventory/unfrozen',
            result() {
                return {
                    ...body,
                };
            }
        },
        // #endregion 

        // #region  取消出库
        {
            isMock: IS_MOCK,
            methods: 'post',
            router: storageURL + '/web/yc/base/stockInventoryDetail/cancelRemoval',
            result() {
                return {
                    ...body,
                };
            }
        },
        // #endregion 

        // #region  待验收出库选中某一仓库,根据申请出库重量，给出详细的列表信息
        {
            isMock: IS_MOCK,
            methods: 'post',
            router: storageURL + '/web/yc/storage/stockRemoval/list',
            result() {
                return {
                    ...body,
                    'data|1-2': [RetrievalList]

                };
            }
        },
        // #endregion 

        // #region 获取过户信息
        {
            isMock: IS_MOCK,
            methods: 'post',
            router: storageURL + '/web/yc/inventory/transferinfo',
            result() {
                return {
                    ...body,
                    "data|1-2": [TransferinfoList]
                };
            }
        },
        // #endregion 

        // #region  过户的最大可用量量
        {
            isMock: IS_MOCK,
            methods: 'get',
            router: storageURL + '/web/yc/inventory/transfer/available',
            result() {
                return {
                    ...body,
                    data: '55'
                };
            }
        },
        // #endregion 

        // #region 操作过户
        {
            isMock: IS_MOCK,
            methods: 'post',
            router: storageURL + '/web/yc/inventory/transfer',
            result() {
                return {
                    ...body,
                };
            }
        },
        // #endregion 

        // #region  待验收出库列表
        {
            isMock: IS_MOCK,
            methods: 'post',
            router: storageURL + '/web/yc/storage/stockRemoval/page',
            result(params) {
                return {
                    ...body,
                    data: {
                        'list|10-20': [StockRemovalList],
                        "paginator": {
                            "currentPage": params.page,
                            "pageSize": params.pageSize,
                            "totalCount": 1000,
                            "totalPage": 1000 / params.pageSize
                        }
                    },

                };
            }
        },
        // #endregion 

        // #region  验收出库
        {
            isMock: IS_MOCK,
            methods: 'post',
            router: storageURL + '/web/yc/base/stockRemoval/removal',
            result() {
                return {
                    ...body,
                };
            }
        },
        // #endregion 

        // #region  出库申请
        {
            isMock: IS_MOCK,
            methods: 'post',
            router: storageURL + '/web/yc/base/stockRemoval/apply',
            result() {
                return {
                    ...body,
                };
            }
        },
        // #endregion 

        // #region  待验收入库列表
        {
            isMock: IS_MOCK,
            methods: 'post',
            router: storageURL + '/web/yc/storage/stockRegister/page',
            result(params) {
                return {
                    ...body,
                    data: {
                        'list|10-20': [StockRegisterList],
                        "paginator": {
                            "currentPage": params.page,
                            "pageSize": params.pageSize,
                            "totalCount": 1000,
                            "totalPage": 1000 / params.pageSize
                        }
                    },

                };
            }
        },
        // #endregion 

        // #region  验收入库
        {
            isMock: IS_MOCK,
            methods: 'post',
            router: storageURL + '/web/yc/base/stockRegister/examine',
            result() {
                return {
                    ...body,
                };
            }
        },
        // #endregion 

        // #region  获取质押解押管理列表
        {
            isMock: IS_MOCK,
            methods: 'post',
            router: storageURL + '/web/yc/pledgeinfo/page',
            result(params) {
                return {
                    ...body,
                    data: {
                        'list|10-20': [PledgeinfolIST],
                        "paginator": {
                            "currentPage": params.page,
                            "pageSize": params.pageSize,
                            "totalCount": 1000,
                            "totalPage": 1000 / params.pageSize
                        }
                    },

                };
            }
        },
        // #endregion 

        // #region  解押管理页面专门获取质押信息
        {
            isMock: IS_MOCK,
            methods: 'get',
            router: storageURL + '/web/yc/pledgeinfo/cargo/info',
            result(params) {
                return {
                    ...body,
                    data: {
                        "bankId": "1", //质权方id(银行id)
                        "bankName": "中国银行", // 质权方名称
                    },

                };
            }
        },
        // #endregion 

        // #region  获取质押总量
        {
            isMock: IS_MOCK,
            methods: 'get',
            router: storageURL + '/web/yc/pledgeinfo/pledgeNum',
            result() {
                return {
                    ...body,
                    data: {
                        totalPledgeNums: 78,
                        totalPledgeWeight: 200
                    },

                };
            }
        },
        // #endregion 

        // #region  获取可用总量
        {
            isMock: IS_MOCK,
            methods: 'get',
            router: storageURL + '/web/yc/pledgeinfo/available',
            result() {
                return {
                    ...body,
                    data: 185
                };
            }
        },
        // #endregion 

        // #region  质押操作
        {
            isMock: IS_MOCK,
            methods: 'post',
            router: storageURL + '/web/yc/pledgeinfo/pledge',
            result() {
                return {
                    ...body
                };
            }
        },
        // #endregion 

        // #region  解押操作
        {
            isMock: IS_MOCK,
            methods: 'post',
            router: storageURL + '/web/yc/releaseinfo/release',
            result() {
                return {
                    ...body
                };
            }
        },
        // #endregion         

        // #region  出库明细列表
        {
            isMock: IS_MOCK,
            methods: 'post',
            router: storageURL + '/web/yc/storage/stockRemovalDetail/page',
            result(params) {
                return {
                    ...body,
                    data: {
                        'list|10-20': [StockRemovalDetailList],
                        "paginator": {
                            "currentPage": params.page,
                            "pageSize": params.pageSize,
                            "totalCount": 1000,
                            "totalPage": 1000 / params.pageSize
                        }
                    },

                };
            }
        },
        // #endregion 

        // #region  出库单
        {
            isMock: IS_MOCK,
            methods: 'get',
            router: storageURL + '/web/yc/storage/stockRemovalDetail/get',
            result() {
                return {
                    ...body,
                    data: {
                        "createdBy": "",
                        "createdTime": "",
                        "summation": "",
                        "list|1-2": [stockRemovalBill]
                    },

                };
            }
        },
        // #endregion 

        // #region  入库明细列表
        {
            isMock: IS_MOCK,
            methods: 'post',
            router: storageURL + '/web/yc/storage/stockRegisterDetail/page',
            result(params) {
                return {
                    ...body,
                    data: {
                        'list|10-20': [StockRegisterDetailList],
                        "paginator": {
                            "currentPage": params.page,
                            "pageSize": params.pageSize,
                            "totalCount": 1000,
                            "totalPage": 1000 / params.pageSize
                        }
                    },

                };
            }
        },
        // #endregion 

        // #region  入库单
        {
            isMock: IS_MOCK,
            methods: 'get',
            router: storageURL + '/web/yc/storage/stockRegisterDetail/get',
            result() {
                return {
                    ...body,
                    data: {
                        ...InventoryTableList,
                        "num": 23,
                        "weight": 243,
                        "registerId": "SH1905060002",
                        "registerTime": '@DATE("yyyy-MM-dd HH:mm:ss")',
                        "summation": 87,
                        "remark": "备注",
                        "productTypeCode": "34234"
                    },

                };
            }
        },
        // #endregion 

        // #region  过户明细列表
        {
            isMock: IS_MOCK,
            methods: 'post',
            router: storageURL + '/web/yc/inventory/transfer/detail',
            result(params) {
                return {
                    ...body,
                    data: {
                        'list|10-20': [TransferDetailList],
                        "paginator": {
                            "currentPage": params.page,
                            "pageSize": params.pageSize,
                            "totalCount": 1000,
                            "totalPage": 1000 / params.pageSize
                        }
                    },

                };
            }
        },
        // #endregion 

        // #region  过户单
        {
            isMock: IS_MOCK,
            methods: 'get',
            router: storageURL + '/web/yc/inventory/transfer/bill',
            result() {
                return {
                    ...body,
                    data: {
                        ...TransferDetailList,
                        "num": 23,
                        "weight": 243,
                        "registerId": "SH1905060002",
                        "registerTime": '@DATE("yyyy-MM-dd HH:mm:ss")',
                        "summation": 87,
                        "remark": "备注",
                        "chineseWeights": "" // 中文重量
                    },

                };
            }
        },
        // #endregion 


        // #region  质押明细列表
        {
            isMock: IS_MOCK,
            methods: 'post',
            router: storageURL + '/web/yc/pledgeinfo/detail',
            result(params) {
                return {
                    ...body,
                    data: {
                        'list|10-20': [PledgeDetailList],
                        "paginator": {
                            "currentPage": params.page,
                            "pageSize": params.pageSize,
                            "totalCount": 1000,
                            "totalPage": 1000 / params.pageSize
                        }
                    },

                };
            }
        },
        // #endregion 

        // #region  质押单
        {
            isMock: IS_MOCK,
            methods: 'get',
            router: storageURL + '/web/yc/pledgeinfo/bill',
            result() {
                return {
                    ...body,
                    data: {
                        "bankName": "中国银行", //质权方名称
                        "cargoId": "1",
                        "cargoName": "@CNAME()", // 开始时间
                        "createdTime": '@DATE("yyyy-MM-dd HH:mm:ss")',
                        "id": "11213",
                        "inventoryTotalNums": 98, // 库存数量
                        "inventoryTotalWeight": 86, // 库存总重量
                        "pledgeCargo": "@CNAME()",  // 质押方
                        "pledgeCode": "67216312", // 质押单号
                        "pledgeNums": 76, // 质押数量
                        "pledgeType": "0", // 质押类型
                        "pledgeWeight": 976, //质押重量
                    },

                };
            }
        },
        // #endregion 

        // #region  解押明细列表
        {
            isMock: IS_MOCK,
            methods: 'post',
            router: storageURL + '/web/yc/releaseinfo/detail',
            result(params) {
                return {
                    ...body,
                    data: {
                        'list|10-20': [ReleasePledgeDetailList],
                        "paginator": {
                            "currentPage": params.page,
                            "pageSize": params.pageSize,
                            "totalCount": 1000,
                            "totalPage": 1000 / params.pageSize
                        }
                    },

                };
            }
        },
        // #endregion 

        // #region  解押单
        {
            isMock: IS_MOCK,
            methods: 'get',
            router: storageURL + '/web/yc/releaseinfo/bill',
            result() {
                return {
                    ...body,
                    data: {
                        "bankName": "中国银行", //质权方名称
                        "cargoId": "1",
                        "cargoName": "@CNAME()", // 货主
                        "createdTime": '@DATE("yyyy-MM-dd HH:mm:ss")', // 开始时间
                        "id": "11213",
                        "inventoryTotalNums": 98, // 库存数量
                        "inventoryTotalWeight": 86, // 库存总重量
                        "pledgeCargo": "@CNAME()",  // 质押方
                        "releaseCode": "67216312", // 解押单号
                        "releaseNums": 76, // 解押数量
                        "releaseWeight": 976, //解押重量
                    },

                };
            }
        },
        // #endregion 

        // #endregion

        // #region 系统参数

        // #region  获取用户信息
        {
            isMock: IS_MOCK,
            methods: 'get',
            router: '/system/manage/user/getUser',
            result() {
                return {
                    ...body,
                    data: {
                        avatar: "https://file.hletong.com/group1/M00/00/00/CgESM10JhOeAMwkYAACpkiPEWEc863.png?token=0175c2599f38e9285a5c46f9aa563460&ts=1561431795",
                        createdBy: "admin",
                        createdTime: "2019-06-24 08:41:15.0",
                        email: "",
                        locked: 1,
                        password: "92bf7f66349ac7c8ede0aedc81f41a663c720a4510dd032991f985983dd976e5",
                        phone: "18652860219",
                        realname: "施少伟奇",
                        updatedBy: "admin",
                        updatedTime: "2019-06-24 08:41:15.0",
                        userId: "174466677793095680",
                        username: "18652860219",
                        version: "1"
                    }
                };
            }
        },
        // #endregion    

        // #region  获取用户系统跳转
        {
            isMock: IS_MOCK,
            methods: 'get',
            router: '/system/manage/user/getSystems',
            result() {
                return {
                    ...body,
                    "data": [
                        {
                            "path": "https://pay.hletong.com",
                            "systemCode": "cwzx",
                            "systemId": "166948708439556096",
                            "systemName": "惠龙云仓"
                        }],
                }
            }
        },
        // #endregion    

        // #region  获取用户角色
        {
            isMock: IS_MOCK,
            methods: 'get',
            router: '/system/manage/user/getUserRole',
            result() {
                return {
                    ...body,
                    data: {
                        ...MockRole
                    }
                };
            }
        },
        // #endregion   

        // #endregion

        // #region 会员管理

        // #region  交易会员管理列表
        {
            isMock: IS_MOCK,
            methods: 'post',
            router: '/web/yc/member/page',
            result(params) {
                return {
                    ...body,
                    data: {
                        'list|10-20': [pageMemberList],
                        "paginator": {
                            "currentPage": params.page,
                            "pageSize": params.pageSize,
                            "totalCount": 1000,
                            "totalPage": 1000 / params.pageSize
                        }
                    },
                };
            }
        },
        // #endregion

        // #region  会员启用禁用
        {
            isMock: IS_MOCK,
            methods: 'post',
            router: '/web/yc/member/updateState',
            result() {
                return {
                    ...body
                };
            }
        },
        // #endregion

        // #region  获取会员信息
        {
            isMock: IS_MOCK,
            methods: 'get',
            router: '/web/yc/member/get',
            result(params) {
                return {
                    ...body,
                    data:{...VIPInfoData,userId:params.userId}                                          
                };
            }
        },
        // #endregion

        // #region  新增会员
        {
            isMock: IS_MOCK,
            methods: 'post',
            router: '/web/yc/member/add',
            result() {
                return {
                    ...body
                };
            }
        },
        // #endregion

        // #region  更新会员
        {
            isMock: IS_MOCK,
            methods: 'post',
            router: '/web/yc/member/update',
            result() {
                return {
                    ...body
                };
            }
        },
        // #endregion

        // #endregion

        // #region 预警管理

        // #region  新增协议
        {
            isMock: IS_MOCK,
            methods: 'post',
            router: '/web/yc/agreement/add',
            result() {
                return {
                    ...body
                };
            }
        },
        // #endregion

        // #region  更新协议
        {
            isMock: IS_MOCK,
            methods: 'post',
            router: '/web/yc/agreement/update',
            result() {
                return {
                    ...body
                };
            }
        },
        // #endregion

        // #region  删除协议
        {
            isMock: IS_MOCK,
            methods: 'post',
            router: '/web/yc/agreement/delete',
            result() {
                return {
                    ...body
                };
            }
        },
        // #endregion        

        // #region  协议到期预警列表
        {
            isMock: IS_MOCK,
            methods: 'post',
            router: '/web/yc/agreement/page',
            result(params) {
                return {
                    ...body,
                    data: {
                        'list|3-4': [agreementList],
                        "paginator": {
                            "currentPage": params.page,
                            "pageSize": params.pageSize,
                            "totalCount": 1000,
                            "totalPage": 1000 / params.pageSize
                        }
                    },
                };
            }
        },
        // #endregion

        // #endregion

        // #region  字典项
        {
            isMock: IS_MOCK,
            methods: 'get',
            router: '/web/yc/inventory/transfer/base',
            result(productType) {
                return {
                    ...body,
                    data: {
                        "cargoList|3": [cargoList],
                        "specificationsList|3": [specificationsList],
                        "originPlaceList": [originPlaceList],
                        "productNameList|3": [productNameList],
                        "pilePositionList|3": [pilePositionList],
                        "emissionStandardList|2": [emissionStandardList],
                        "materialList": [materialList],
                        "firstCatalogList": [{
                            "id": "5",
                            "text": '汽油',
                            "sonSearchList": [
                                { 'id': '51', 'text': "92" },
                                { 'id': '52', 'text': '95' }
                            ]
                        },
                        {
                            "id": "6",
                            "text": '柴油',
                            "sonSearchList": [
                                { 'id': '61', 'text': "-10" },
                                { 'id': '62', 'text': '-20' }
                            ]
                        }
                        ],
                        "deliveryStoreList": [{
                            "id": "2",
                            "text": '仓库一',
                            "sonSearchList": [
                                { 'id': '21', 'text': "1号罐" },
                                { 'id': '22', 'text': '2号罐' }
                            ]
                        },
                        {
                            "id": "3",
                            "text": '仓库二',
                            "sonSearchList": [
                                { 'id': '31', 'text': '3号罐' },
                                { 'id': '32', 'text': '4号罐' }
                            ]
                        }
                        ],
                    }
                };
            }
        },
        {
            isMock: IS_MOCK,
            methods: 'get',
            router: '/web/yc/bank/info',
            result() {
                return {
                    ...body,
                    data: [
                        {
                            "affiliateBank": "中信银行",
                            "bankIphone": "15952903666",
                            "bankStatus": "0",
                            "cityId": "321100",
                            "cityName": "镇江市",
                            "createdTime": "2019-07-04 17:49:45.0",
                            "detailAddress": "长江路301号",
                            "id": "1",
                            "iphone": "15952903985",
                            "isDeleted": 0,
                            "provinceId": "320000",
                            "provinceName": "江苏省",
                            "regionId": "321111",
                            "regionName": "润州区",
                            "subbranch": "润州支行",
                            "updatedTime": "2019-07-04 17:49:48.0"
                        },
                        {
                            "affiliateBank": "中国银行",
                            "bankIphone": "15952903666",
                            "bankStatus": "0",
                            "cityId": "321100",
                            "cityName": "镇江市",
                            "createdTime": "2019-07-04 17:49:45.0",
                            "detailAddress": "长江路301号",
                            "id": "2",
                            "iphone": "15952903985",
                            "isDeleted": 0,
                            "provinceId": "320000",
                            "provinceName": "江苏省",
                            "regionId": "321111",
                            "regionName": "润州区",
                            "subbranch": "润州支行",
                            "updatedTime": "2019-07-04 17:49:48.0"
                        }

                    ]
                };
            }
        },
        // #endregion     

        // #region  企业用户分页查询
        {
            isMock: IS_MOCK,
            methods: 'post',
            router: '/userinfo/enterprise/list/search',
            result(params) {
                return {
                    ...body,
                    data: {
                        'list|10': [EnterpriseList],
                        "paginator": {
                            "currentPage": params.page,
                            "pageSize": params.pageSize,
                            "totalCount": 1000,
                            "totalPage": 1000 / params.pageSize
                        }
                    },
                };
            }
        },
        // #endregion

        // 数据字段项
        {
            isMock: IS_MOCK,
            methods: 'get',
            router: '/baseserve/dict/item/valid/options/get',
            result() {
                return {
                    ...body,
                    "data": [
                        {
                            "entryCode": "YcDeliveryStoreType",
                            "entryName": "交割库类型",
                            "items": [
                                {
                                    "disabled": false,
                                    "id": "0",
                                    "orderBy": 0,
                                    "selected": 0,
                                    "text": "室内库"
                                },
                                {
                                    "disabled": false,
                                    "id": "1",
                                    "orderBy": 1,
                                    "selected": 0,
                                    "text": "室外库"
                                }
                            ]
                        },
                        {
                            "entryCode": "YcProductType",
                            "entryName": "品名大类",
                            "items": [
                                {
                                    "disabled": false,
                                    "id": "00",
                                    "orderBy": 0,
                                    "selected": 0,
                                    "text": "钢材"
                                },
                                {
                                    "disabled": false,
                                    "id": "01",
                                    "orderBy": 1,
                                    "selected": 0,
                                    "text": "石油"
                                },
                                {
                                    "disabled": false,
                                    "id": "02",
                                    "orderBy": 2,
                                    "selected": 0,
                                    "text": "木材"
                                }
                            ]
                        },
                        {
                            "entryCode": "ycEmissionStandard",
                            "entryName": "排放标准",
                            "items": [
                                {
                                    "disabled": false,
                                    "id": "0",
                                    "orderBy": 0,
                                    "selected": 0,
                                    "text": "排放标准1"
                                },
                                {
                                    "disabled": false,
                                    "id": "1",
                                    "orderBy": 1,
                                    "selected": 0,
                                    "text": "排放标准2"
                                }
                            ]
                        },
                    ]
                };
            }
        },
    ]
};

export const isMock = ({ url, methods, params = {}, host = "", version = "" }) => {
    let hasMock = {
        isMock: false
    };
    const path = version !== "" ? `/${version}url` : url;
    if (mockRouterMap[host] !== undefined) {
        mockRouterMap[host].forEach(routerObject => {
            if (routerObject.methods.toUpperCase() === methods.toUpperCase() && routerObject.isMock === true) {
                if (pathToRegexp(routerObject.router).exec(path) !== null) {
                    hasMock = { ...routerObject };
                    hasMock.mock = mockjs.mock(routerObject.result(params));
                }
            }
        });
    }
    return hasMock;
};