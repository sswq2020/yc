import pathToRegexp from "path-to-regexp";
import mockjs from "mockjs";

const hostList = {
    default: ""
};

const IS_MOCK = true
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
    "mock1": "12344435", //业务单号
    "mock2": "CYJY@INTEGER(2019690000,2019690999)", //业务单号
    "mock3": "@PICK('盖蓬费', '超损费','车船运费')", // 款项
    "mock4": "@float(200,999)", // 金额(元)
    "mock5": "@PICK(1,0)", // 数据来源
    "shipper": "货主@PICK('1','2','3','4','5')", // 数据来源 名称
    "mock6": "集配货运", // 数据来源 名称
    "mock7": "惠龙易通@CITY()公司", // 转出账户名
    "mock8": "65521464564654987654", // 转出账户号
    "mock9": "@CNAME()", // 转入账户名 
    "mock10": "65521464564654987654", // 转入账户号
    "mock11": "@PICK('中国','中信')银行", // 转入账户开户机构名称
}


const ShipperList = [{"0": "mock1"},{"1": "mock2"}]
const SpecificationList = [{"0": "mock1"},{"1": "mock2"}]
const MaterialList = [{"0": "mock1"},{"1": "mock2"}]
const ProductNameList = [{"0": "mock1"},{"1": "mock2"}]
const OriginPlaceList = [{"0": "mock1"},{"1": "mock2"}]
const storageList = [{"0": "mock1"},{"1": "mock2"}]


const MockRole = {
    role: "@PICK('1','2')"  // 货主 1,仓管员 2
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
    
    // #endregion

    // #region 仓储信息

        // #region  获取库存表列表
            {
                isMock: IS_MOCK,
                methods: 'post',
                router: storageURL + '/web/settlement/pageList/InventoryTable',
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

    // #region  字典项
        {
            isMock: IS_MOCK,
            methods: 'get',
            router: '/web/systemData/getAllBaseInfo',
            result() {
                return {
                    ...body,
                    data: {
                        "ShipperList": ShipperList,
                        "SpecificationList": SpecificationList,
                        "MaterialList": MaterialList,
                        "ProductNameList": ProductNameList,
                        "OriginPlaceList": OriginPlaceList,
                        "storageList": storageList
                    }
                };
            }
        },
        {
            isMock: IS_MOCK,
            methods: 'get',
            router: 'payacc/web/systemData/appInfo',
            result() {
                return {
                    ...body,
                    data: {
                        "10000": "导入",
                        "10010": "集配平台",
                        "10020": "电商平台",
                    }
                };
            }
        },
        {
            isMock: IS_MOCK,
            methods: 'get',
            router: 'payacc/web/systemData/settlementPayOrderStatus',
            result() {
                return {
                    ...body,
                    data: StatusList
                };
            }
        },
        {
            isMock: IS_MOCK,
            methods: 'get',
            router: 'payacc/web/systemData/bankDic',
            result() {
                return {
                    ...body,
                    data: {
                        "10000": "中国建设银行",
                        "10010": "中国农业银行",
                        "10020": "交通银行",
                    }
                };
            }
        },
    // #endregion                 
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