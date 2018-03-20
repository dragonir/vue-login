// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/store';

// 初始化样式文件
import '@/assets/base.css';
// 字体
import '@/assets/font-awesome-4.7.0/css/font-awesome.css';

import axios from '@/common/axios-config';
Vue.prototype.$axios = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
