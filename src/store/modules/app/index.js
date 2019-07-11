import * as type from './mutations-types';
import api from "@/api";
import Dict from "@/util/dict.js";
const store = {
    namespaced: true,
    state: {
        role:null,
        userId:null,
        username:null,
        productTypeCodeData: {},
        deliveryStoreTypeData: {},
    },
    getters: {
      role: state => state.role,
      userId: state => state.userId,
      username: state => state.username,
      IS_SHIPPER: state => state.role === "1", // 判断是否是货主
      productTypeCodeData: state => state.productTypeCodeData, 
      deliveryStoreTypeData: state => state.deliveryStoreTypeData, 
    },
    mutations: {
      [type.SET_ROLE](state,payload){
        state.role = payload
      },
      [type.SET_USER_ID](state,payload){
        state.userId = payload
      },
      [type.SET_USER_NAME](state,payload){
        state.username = payload
      },
      [type.SET_YC_PRODUCT_TYPE](state,payload) {
        state.productTypeCodeData = payload;
      },    
      [type.SET_YC_DELIVERY_STORE](state,payload) {
        state.deliveryStoreTypeData = payload;
      },
    },
    actions: {
      async setYcProductTypeCodeData({ commit  }) {
        const dictionaryData = {
          YcProductType: 'SET_YC_DELIVERY_STORE',
          YcDeliveryStoreType: 'SET_YC_DELIVERY_STORE'
        }; 
        const res = await api.getValidList({
          entryCode: Object.keys(dictionaryData).join(),
          tenantId: 'hlyc'
        });
        switch (res.code) {
          case Dict.SUCCESS:
            Object.keys(dictionaryData).forEach(item => {
              const listData = {};
              res.data.forEach(data => {
                if(data.entryCode === item) {
                  listData[data.dictCode] = data.dictName;
                }
              });
              commit(dictionaryData[item], listData);
            })
            break;
          default:
            break;
        }
      },
    }
}

export default store;