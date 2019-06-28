const store = {
    namespaced: true,
    state: {
        transferOwnership:[],
        checkout:[]
    },
    mutations: {
        setTransferOwnership(state,payload) {
            state.transferOwnership = payload;
        },
        setCheckout(state,payload){
            state.checkout = payload;
        }
    },
    actions: {

    }
}

export default store;