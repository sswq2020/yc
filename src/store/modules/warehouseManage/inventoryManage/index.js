import Dict from 'util/dict.js'
const store = {
    namespaced: true,
    state: {
        transferOwnership:[], // 过户
        checkout:[], // 出库申请
        findDetail:null, //查看明细
        productType:Dict.PRODUCT_OIL // 默认进来的是石油
    },
    mutations: {
        setTransferOwnership(state,payload) {
            state.transferOwnership = payload;
        },
        setCheckout(state,payload){
            state.checkout = payload;
        },
        setFindDetail(state,payload){
            state.findDetail = payload;
        },
        setProductType(state,payload){
            state.productType=payload;
        }
    },
    actions: {

    }
}

export default store;