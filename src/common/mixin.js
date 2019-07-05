import api from '@/api'
import Dict from '@/util/dict.js'
import { _toNeedArray_ } from './util'
export const baseMixin = {
    data() {
        return {
            ShipperList: [],
            SpecificationList: [],
            MaterialList: [],
            ProductNameList: [],
            OriginPlaceList: [],
            storageList: []
        }
    },
    methods: {
        async _getAllBaseInfo() {
            let _this = this;
            const response = await api.getAllBaseInfo()
            switch (response.code) {
                case Dict.SUCCESS:
                    Object.keys(response.data).forEach((item) => {
                        _this[item] = _toNeedArray_(response.data[item])
                    })
                    break;
                default:
                    break;
            }
        }
    },
    created() {
        this._getAllBaseInfo()

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
