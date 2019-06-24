import * as type from './mutations-types';
const modal = {
  namespaced: true,
  state: {
    visible: false,
  },
  getters: {
    visible: state => state.visible,
  },
  mutations: {
    [type.SET_MODAL_VISIBLE] (state, payload) {
      state.visible = payload;
    },
  }
}
export default modal;