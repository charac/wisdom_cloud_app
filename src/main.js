import Vue from "vue";
import App from "./App.vue";
import router from "./router/";
import store from './store/' // store
import 'amfe-flexible/index.js'
import FastClick from 'fastclick'
import './icons' // 引入icon
import { setVant } from './plugins/setVant.js';   // vant 全局组件信息
import '@/config/validate.js'

// 解决点击延迟
if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
  }, false);
}
setVant();


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
