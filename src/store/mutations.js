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