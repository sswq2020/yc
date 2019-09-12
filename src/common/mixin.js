import api from '@/api'
import Dict from '@/util/dict.js'
import { _toArray_,handleFilterSelf } from './util'
import { DICT_SELECT_ARR } from "common/util";
const TypeProductDatas = DICT_SELECT_ARR(Dict.PRODUCT_CATEGORY);

const _DICT_SERVE_ = [
    "HywEmissionStandard",
    "YcNumUnit",
    "YcWeightUnit",
    "YcIncomingType",
    "YcMeasuringType"
]


export const baseMixin = {
    data() {
        return {
            cargoList: [],
            specificationsList: [],
            materialList: [],
            productNameList: [],
            originPlaceList: [],
            pilePositionList: [],
            emissionStandardList: [],
            /**四个关联特殊的**/
            deliveryStoreList: [], // 仓库
            oiltankList: [], // 油罐编号联动仓库,作为子集

            firstCatalogList: [], //品类
            trademarkList: [], // 牌号联动品类,作为子集

            /**商品大类数据源*/ 
            typeProductDatas: TypeProductDatas,
            /**商品大类默认石油*/
            storageclass: Dict.PRODUCT_OIL
        }
    },
    methods: {
        async _getAllBaseInfo(productType) {
            const res = await api.getAllBaseInfo(productType)
            switch (res.code) {
                case Dict.SUCCESS:
                    Object.keys(res.data).forEach((key) => {
                        this[key] = handleFilterSelf(res.data[key])
                    })
                    break;
                default:
                    break;
            }
        }
    }
}

export const bankMixin = {
    data() {
        return {
            bankList: [],
        }
    },
    methods: {
        async _getBankList() {
            const res = await api.getBankList()
            switch (res.code) {
                case Dict.SUCCESS:
                    this.bankList = res.data.map((item) => {
                        return {
                            value: item.id,
                            label: item.affiliateBank
                        }
                    })
                    break;
                default:
                    break;
            }
        }
    },
    created() {
        this._getBankList()
    }
}


export const dictMixin = {
    data() {
        return {
            HywEmissionStandardList: [],
            YcNumUnitList: [],
            YcWeightUnitList: [],
            YcIncomingTypeList: [],
            YcMeasuringTypeList: []
        }
    },
    methods: {
        async _getValidList() {
            let that = this
            const res = await api.getValidList({
                entryCodes: _DICT_SERVE_.join(),
                tenantId: 'hlyc'
            })
            switch (res.code) {
                case Dict.SUCCESS:
                    res.data.forEach((obj) => {
                        that[obj.entryCode + 'List'] = obj.items.map((item) => {
                            return {
                                value: item.id,
                                label: item.text
                            }
                        })
                    })
                    break;
                default:
                    break;
            }
        }
    },
    created() {
        this._getValidList()
    }
}
