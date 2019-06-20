import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import './assets/styles/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import VueCropper from 'vue-cropper'
import Hletong from 'hletong-ui'
import 'hletong-ui/lib/hletong-ui.css'
import {router} from './router'
import api from '@/api'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Hletong);
Vue.use(VueCropper);
Vue.prototype.$api = api;

new Vue({
	router,
  render: h => h(App)
}).$mount('#app')
