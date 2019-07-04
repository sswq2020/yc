const DICT = {};
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
DICT.INVENTORY.NORMAL = '0'
/** 库存冻结状态 */
DICT.INVENTORY.FROZEN = '1'
/** 库存待出库状态 */
DICT.INVENTORY.WAITCHECKOUT = '2'
/** 库存挂牌状态 */
DICT.INVENTORY.HANGOUT = '3'

DICT.INVENTORY_STATUS = {
    [DICT.INVENTORY.NORMAL]: "正常",
    [DICT.INVENTORY.FROZEN]: "冻结中",
    [DICT.INVENTORY.WAITCHECKOUT]: "待出库",
    [DICT.INVENTORY.HANGOUT]: "挂牌中",
}




export default DICT;