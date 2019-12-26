const DICT = Object.create(null);
/** 成功 */
DICT.SUCCESS = '000000';
/** 导入 */
DICT.IMPORT = '10000';
/** 集配平台 */
DICT.JPPT_PLANT = '10010';
/** 电商平台 */
DICT.BUSINESS_ONLINE_PLANT = '10020';


DICT.APP_INFO = {
    [DICT.IMPORT]:'导入',
    [DICT.JPPT_PLANT]:'集配平台',
    [DICT.BUSINESS_ONLINE_PLANT]:'电商平台'
}

/** 库存正常状态 */
DICT.INVENTORY_NORMAL = '0'
/** 库存冻结状态 */
DICT.INVENTORY_FROZEN = '1'
/** 库存待出库状态 */
DICT.INVENTORY_WAITCHECKOUT = '2'
/** 库存挂牌状态 */
DICT.INVENTORY_HANGOUT = '3'

/** 库存状态 */
DICT.INVENTORY_STATUS = {
    [DICT.INVENTORY_NORMAL]: "正常",
    [DICT.INVENTORY_FROZEN]: "冻结中",
    [DICT.INVENTORY_WAITCHECKOUT]: "待出库",
    [DICT.INVENTORY_HANGOUT]: "挂牌中",
}

/**总量质押*/
DICT.TOTAL_PLEDGE = '0'
/**质押业务类型*/
DICT.PLEDGE_BUSINESS_TYPE = {
    [DICT.TOTAL_PLEDGE]: "总量质押"
}

/**转账过户*/
DICT.ACCOUNT_TRANSFER = '0'
/**过户业务类型*/
DICT.TRANSFER_OWNERSHIP_BUSINESS_TYPE = {
    [DICT.ACCOUNT_TRANSFER]: "转账过户"
}


/**正常状态***/
DICT.STATE_NORMAL = "0"
/**禁用状态***/
DICT.STATE_BAN = "1"



/**钢木*/
DICT.STORAGE_TYPE_STEEL_WOOD = '00'
DICT.STORAGE_TYPE_OIL = '01'

/**存储类型*/
DICT.STORAGE_TYPE = {
 [DICT.STORAGE_TYPE_STEEL_WOOD]:"钢木",
 [DICT.STORAGE_TYPE_OIL]:"石油",
} 

/**钢材*/
DICT.PRODUCT_STELL = '00'
/**石化*/
DICT.PRODUCT_OIL = '01'
/**木材*/
DICT.PRODUCT_WOOD = '02'

/**商品大类*/
DICT.PRODUCT_CATEGORY = {
    [DICT.PRODUCT_STELL]:"钢材",
    [DICT.PRODUCT_OIL]:"石化",
    [DICT.PRODUCT_WOOD]:"木材",
}


/**会员状态禁用*/
DICT.VIP_STATUS_FROZEN = 0
/**会员状态正常*/
DICT.VIP_STATUS_NORMAL = 1


/**会员状态 */
DICT.VIP_STATUS = {
    [DICT.VIP_STATUS_NORMAL]: "正常",
    [DICT.VIP_STATUS_FROZEN]: "禁用",
}

/**允许重复交易*/
DICT.RETRADE_ABLE = "0"
/**禁止重复交易*/
DICT.RETRADE_DISABLE = "1"

DICT.RETRADE_STATUS = {
    [DICT.RETRADE_ABLE]:"允许",
    [DICT.RETRADE_DISABLE]:"不允许"
}

/**线上协议 */
DICT.AGREE_ONLINE = "0"
/**线下协议 */
DICT.AGREE_OFFLINE = "1"
/**协议类型 */
DICT.AGREE_TYPE = {
    [DICT.AGREE_ONLINE]: "线上协议",
    [DICT.AGREE_OFFLINE]: "线下协议",
}

/***内部用户***/
DICT.INTERNAL_USER = 1;
/***会员用户***/
DICT.VIP_USER = 3;

DICT.USERTYPE = {
    [DICT.INTERNAL_USER]:'内部用户',
    [DICT.VIP_USER]:'会员用户'
}

/***吨***/
DICT.TON = "00";
/***立方***/
DICT.CUTE = "01";
/***计量单位***/
DICT.MEASURE_UNIT ={
  [DICT.TON]:"吨",
  [DICT.CUTE]:"立方",
}

/***磅计***/
DICT.POUND = "0";
/***检尺***/
DICT.CULL = "1";
/***体积流量计***/
DICT.VOLUME_FLOWMETER = "2";
/***质量流量计***/
DICT.MASS_FLOWMETER = "3";
/***计量方式***/
DICT.MEASURE_TYPE ={
  [DICT.POUND]:"磅计",
  [DICT.CULL]:"检尺",
  [DICT.VOLUME_FLOWMETER]:"体积流量计",
  [DICT.MASS_FLOWMETER]:"质量流量计",
}

/***收货入库***/
DICT.TAKE_IN_STORAGE = "0"
/***过货入库***/
DICT.TRANSFER_IN_STORAGE = "1"
/***入库方式***/
DICT.ENTER_STORAGE_TYPE = {
    [DICT.TAKE_IN_STORAGE]:"收货入库",
    [DICT.TRANSFER_IN_STORAGE]:"过货入库",
}

/***自提***/
DICT.PICK_UP_SELF = "0"
/***平台代运***/
DICT.PICK_UP_PLANT = "1"
/***提货方式***/
DICT.PICK_UP_TYPE = {
    [DICT.PICK_UP_SELF]:"自提",
    [DICT.PICK_UP_PLANT]:"平台代运",
}



export default DICT;