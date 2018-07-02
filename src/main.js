// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import  $ from "jquery"
import iView from 'iview';
import 'iview/dist/styles/iview.css';

import {commondata} from "./js/commonData";

Vue.use(iView);

Vue.config.productionTip = false;


/* eslint-disable no-new */
 var vue=new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
vue.$Loading.config({
  color: 'yellow',
  failedColor: '#f0ad4e',
  height: 5
});
var  msg = null;
//设置全局ajax属性
// $.ajaxSetup({
//   beforeSend:function(e){
//     console.log("请求开始")
//     vue.$Loading.start();
//     //  msg = vue.$Message.loading({
//     //   content: 'Loading...',
//     //   duration: 0
//     // });
//
//   },
//
//   complete:function (e) {
//     console.log(e)
//     console.log("请求完成")
//     vue.$Loading.finish();
//     // msg();
//   }
// });
router.beforeEach((to, from, next) => {
  commondata.pageInfo.title=to.meta.title;
  iView.LoadingBar.start();
      next()
});
router.afterEach(route => {
  iView.LoadingBar.finish();
});
