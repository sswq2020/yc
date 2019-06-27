import Vue from "vue";
import Vuex from "vuex";
import modal from "./modules/modal";
import app from "./modules/app";
import {inventoryManage} from "./modules/warehouseManage";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {

  },
  getters: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    modal,
    app,
    inventoryManage
  }
});

export default store;
