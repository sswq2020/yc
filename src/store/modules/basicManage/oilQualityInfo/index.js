const store = {
    namespaced: true,
    state: {
        oilQualityInfoId: null, // 油品信息分页传递的id
        isEdit: false // 默认编辑新增
    },
    mutations: {
        setoilQualityInfoId(state,payload){
            state.oilQualityInfoId = payload;
        },
        setIsEdit(state,payload){
            state.isEdit=payload;
        }
    },
    actions: {

    }
}

export default store;