import * as type from './mutations-types';
import Dict from "@/util/dict.js";
import api from "@/api";
const modal = {
  namespaced: true,
  state: {
    visible: false,
    dropDownData: {
      cargoMap: {}, // 货主list
      deliveryStoreMap: {}, // 仓库list
      materialMap: {}, // 材质list
      originPlaceMap: {}, // 产地list
      productNameMap: {}, // 品名list
      specificationsMap: {}, // 规格list
    },
    isEdit: false, // 是否是编辑
    editObj: {}, // 编辑时对象
  },
  getters: {
    visible: state => state.visible,
    dropDownData: state => state.dropDownData,
    editObj: state => state.isEdit,
  },
  mutations: {
    [type.SET_MODAL_VISIBLE] (state, payload) {
      state.visible = payload;
    },
    [type.SET_DROP_DOWN_DATA] (state, payload) {
      state.dropDownData = payload;
    },
    [type.SET_IS_EDIT] (state, payload) {
      state.isEdit = payload;
    },
    [type.SET_EDIT_OBJ] (state, payload) {
      state.editObj = payload;
    },
  },
  actions: {
    /**
     * @author: xh
     * @description: 获取下拉数据列表
     */
    async getDropDownData({commit}) {
      const res = await api.getDropDownList();
      switch (res.code) {
        case Dict.SUCCESS:
          commit('SET_DROP_DOWN_DATA', res.data);
          break;
        default:
          break;
      }
    }
  }
}
export default modal;