import Dict from 'util/dict.js'
const store = {
    namespaced: true,
    state: {
        inspection:[], // 入户
        productType:Dict.PRODUCT_OIL // 默认进来的是石油
    },
    mutations: {
        setInspection(state,payload) {
            state.inspection = payload;
        },
        setProductType(state,payload){
            state.productType=payload;
        }
    },
    actions: {

    }
}

export default store;