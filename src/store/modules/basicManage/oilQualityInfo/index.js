const store = {
    namespaced: true,
    state: {
        id: null, // 油品信息分页传递的id
        isEdit: false // 默认编辑新增
    },
    mutations: {
        setId(state,payload){
            state.id = payload;
        },
        setIsEdit(state,payload){
            state.isEdit=payload;
        }
    },
    actions: {

    }
}

export default store;