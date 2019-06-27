const store = {
    namespaced: true,
    state: {
        transferOwnership:[],
        checkout:[]
    },
    mutations: {
        overrideStateProps(state, payload) {
            Object.keys(payload).forEach(key => {
                state[key] = payload[key];
            });
        },
        updateStateProps(state, payload) {
            const { name, value } = payload;
            if (typeof state[name] === "object" && Array.isArray(state[name]) !== true) {
                state[name] = { ...state[name], ...value };
            } else {
                state[name] = value;
            }
        },
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