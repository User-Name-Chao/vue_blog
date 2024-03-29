// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routers from './router'
import './assets/css/common.css'
import './assets/css/input_cat.css'
import './assets/mdcss/cmdcss.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// import mavonEditor from 'mavon-editor' // 全局引入
// Vue.use(mavonEditor)

Vue.use(ElementUI);
// aiox需要的包
import axios from 'axios'
//aciox基础url

// axios.defaults.baseURL = 'http://39.98.139.205:81/';
axios.defaults.baseURL = 'http://localhost:8081/';

//将axios写成vue的原型属性
Vue.prototype.$axios = axios;
//为post请求设置默认请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
//vue2中使用axios，我们请求的参数仍为json类型，是并没有序列化的。我们需要使用querystring解决该问题
import qs from 'qs';
Vue.prototype.qs = qs;
//引入vuex
// import Vuex from "./vuex";
// Vue.use(Vuex)
import store from './store/store'

Vue.use(routers)
Vue.config.productionTip = false
//导入时间插件
import moment from 'moment';
//定义全局时间过滤器
Vue.filter('dataFormat',function (datastr,pattern="YYYY-MM-DD HH:mm"){
  return moment(datastr).format(pattern)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router:routers,
  store,
  components: { App },
  template: '<App/>'
})
