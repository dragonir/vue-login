import router from '@/router';
import store from '@/store/store';
import axios from 'axios';

axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'https://api.github.com';

// 请求拦截
axios.interceptors.request.use((config) => {
  if (store.state.token) { // 如果存在token，则每个http header都加上token
    config.headers.Authorization = `token ${store.state.token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 响应拦截
axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response.status === 401) {
    // 状态码为401：需要清除token信息并跳转到登录页面
    store.commit('login');
    router.replace({
      path: 'login',
      query: { redirect: router.currentRoute.fullPath }
    });
  }
  return Promise.reject(error.response.data);
});

export default axios;