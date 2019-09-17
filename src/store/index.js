import Vue from "vue";
import Vuex from "vuex";
import modal from "./modules/modal";
import app from "./modules/app";
import {inventoryManage,waitCheckEnter,waitCheckOuter,togglePledgeManage} from "./modules/warehouseManage";
import {oilQualityInfo} from "./modules/basicManage";

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
    inventoryManage,
    waitCheckEnter,
    waitCheckOuter,
    togglePledgeManage,
    oilQualityInfo
  }
});

export default store;
