import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/store';

Vue.use(Router);

import ViewButton from '@/components/ViewButton';
import Repository from '@/components/Repository';
import Login from '@/components/Login';

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

// 页面刷新时，重新赋值token
if (localStorage.getItem('token')) {
  store.commit('login', localStorage.getItem('token'));
}

const router = new Router({
  routes
});

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

export default router;