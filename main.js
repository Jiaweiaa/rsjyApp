import Vue from 'vue';
import App from './App';
import http from './config/index.js';
import store from './store/index.js';

import cuCustom from './colorui/components/cu-custom.vue';
Vue.component('cu-custom',cuCustom);

Vue.config.productionTip = false;

Vue.prototype.api = http.api;
Vue.prototype.request = http.request.default;
Vue.prototype.address = http.address;
Vue.prototype.$store = store;

App.mpType = 'app';

const app = new Vue({
    ...App
});
app.$mount();