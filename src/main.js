import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from '@/plugins/vuetify'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
//import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
///Apexcharts
import VueApexCharts from 'vue-apexcharts'
import VueHtml2Canvas from 'vue-html2canvas';

//import evenHub
//import eventHub from './eventHub'
Vue.use(VueHtml2Canvas);

//Axios
//import axios from 'axios';
//pagina de r2d2
//axios.defaults.baseURL = 'http://localhost:8080/json/evaluacion_estudiantes?_format=json&field_user_espaciomaker_target_id_entityreference_filter=';
Vue.use(VueApexCharts);
Vue.component('apexchart', VueApexCharts);

//Bootstrap
Vue.use(BootstrapVue);
Vue.config.productionTip = false;
//eventos globales
//Vue.prototype.$eventHub = new Vue(); // Global event bus


new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
