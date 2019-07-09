import * as type from './mutations-types';
import api from "@/api";
const store = {
    namespaced: true,
    state: {
        role:null,
        userId:null,
        username:null,
        productTypeCodeData: {}
    },
    getters: {
      role: state => state.role,
      userId: state => state.userId,
      username: state => state.username,
      IS_SHIPPER: state => state.role === "1", // 判断是否是货主
      productTypeCodeData: state => state.productTypeCodeData, 
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
      },
      [type.SET_YC_PRODUCT_TYPE](state,payload) {
        state.productTypeCodeData = payload;
      }    
    },
    actions: {
      async setYcProductTypeCodeData({ commit  }) {
        const res = await api.getValidList({
          entryCode: 'YcProductType',
          tenantId: 'root'
        });
        const listData = {};
        res.data[0].items.forEach(item => {
          listData[item.id] = item.text;
        });
        commit('SET_YC_PRODUCT_TYPE', listData);
      },
    }
}

export default store;