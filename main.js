import Vue from 'vue';
import App from './App';
import http from './config/index.js';
import store from './store/index.js';

import basics from './pages/basics/home.vue';
Vue.component('basics',basics)

import components from './pages/component/home.vue';
Vue.component('components',components);

import plugin from './pages/plugin/home.vue';
Vue.component('plugin',plugin);

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