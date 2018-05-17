// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/style/common.scss'
import './assets/js/common'
// import './assets/js/UserLogin'  // 静默登录
import './assets/js/GetOpenid' // 获取openid
import './assets/js/CheckLogin' // 检测登录
import './components/'  // 引入自定义组件
import store from './vuex/store'

Vue.config.productionTip = false

Vue.use(VueLazyload, {
  repload: 1,
  error: '',
  loading: '',
  attempt: 1
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})