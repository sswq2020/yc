const store = {
    namespaced: true,
    state: {
        role:null,
        userId:null,
        username:null
    },
    getters: {
      role: state => state.role,
      userId: state => state.userId,
      username: state => state.username,
      IS_SHIPPER: state => state.role === "1" // 判断是否是货主
    },
    mutations: {
      setRole(state,payload){
        state.role = payload
      },
      setUserId(state,payload){
        state.userId = payload
      },
      setUsername(state,payload){
        state.username = payload
      }    
    },
    actions: {
    }
}

export default store;