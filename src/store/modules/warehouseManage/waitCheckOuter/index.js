import Dict from 'util/dict.js'
const store = {
    namespaced: true,
    state: {
        retrieval:null, // 出库
        productType:Dict.PRODUCT_OIL // 默认进来的是石油
    },
    mutations: {
        setRetrieval(state,payload) {
            state.retrieval = payload;
        },
        setProductType(state,payload){
            state.productType=payload;
        }
    },
    actions: {

    }
}

export default store;