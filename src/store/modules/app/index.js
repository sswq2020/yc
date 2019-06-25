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