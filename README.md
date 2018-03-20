# vue-login
vue + vue-router + vuex + axios实现登录、拦截功能。

参考：[一个项目学会前端实现登录](https://github.com/superman66/vue-axios-github)

访问首页，可以查看个人GitHub仓库，在此之前会提示，需要生成自己的 Github Personal Token（[生成Token](https://github.com/settings/tokens/new)）。

输入token回车，即可查看个人仓库列表。

### 登录逻辑

#### 路由拦截

在定义路由规则的时候需要添加一个字段`requireAuth`，在全局前置守卫的路由钩子里获取该字段，判断该路由的访问是否需要登录。如果已经登录，则可以进入去往的路由，否则进入登录页面。

```js
const routes = [
  { path: '/', component: ViewButton },
  {
    path: '/repository',
    component: Repository,
    meta: {
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
    }
  },
  { path: '/login', component: Login }
];
```

使用 `router.beforeEach` 注册一个全局前置守卫：

```js
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (store.state.token) { // 通过vuex state获取当前的token是否存在
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else {
    next();
  }
});
```

关于全局守卫：[详情](https://router.vuejs.org/zh-cn/advanced/navigation-guards.html)

#### axios拦截器

仅仅使用路由拦截是不够的，需要结合axios拦截器解决token失效的情况。当axios拦截到状态码401时，需要重新登录。

```js
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
```

关于axios：[axios](https://github.com/mzabriskie/axios)

#### vuex

登录状态是保存在vuex中的，对此需要进行些配置。

```js
// state.js
const state = {
  user: {},
  token: null,
  title: ''
};

export default state;
```



```js
// getters
export const login = state => state.login;
export const logout = state => state.logout;
export const title = state => state.title;
```



```js
// mutation-types
export const LOGIN = 'login';
export const LOGOUT = 'logout';
export const TITLE = 'title';
```



```js
// mutations
import * as types from './mutation-types';
const mutations = {
  [types.LOGIN] (state, data) {
    // localStorage.token = data;
    localStorage.setItem('token', data); // 登录设置
    state.token = data;
  },
  [types.LOGOUT] (state) {
    localStorage.removeItem('token'); // 退出清除
    state.token = null;
  },
  [types.TITLE] (state, data) {
    state.title = data;
  }
};

export default mutations;
```



```js
// store
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import state from './state';
import * as getters from './getters';
import mutations from './mutations';

export default new Vuex.Store({
  state,
  getters,
  mutations
});
```

关于vuex：[vuex](https://vuex.vuejs.org/zh-cn/)

