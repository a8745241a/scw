// import $ from 'jquery'
import {commondata} from "./commonData";
import {vue} from "../main";
import iview from "iview"
import router from "../router"
// var prefix = "http://"+ window.location.host+"/admin-web/"
var prefix = " http://localhost:8080/admin-web/";
var ajaxUtil = (function () {
  function scwAjax(url,postData) {
    return $.ajax({
      url : prefix+url, // 请求地址
      "async": true,
      "crossDomain": true,
      "method": "POST",
      "data":JSON.stringify(postData),
      "crossDomain":true,
      "headers": {
        "Content-Type": "application/json",
        "UID": window.sessionStorage.getItem("UID")==null?-1:window.sessionStorage.getItem("UID").toString()
      },
      success:function(data) {
        console.log("成功1");
        console.log(data.resultCode);
        if (data.resultCode != undefined) {
          if (data.resultCode == 0&&data.message!=null) {
            iview.Message.success(data.message);
          } else {
            iview.Message.error(data.message);
          }
        }
      },
      error:function (err) {
        console.log(err.status);
        console.log(err);
        if(err.status==415){
          router.push({name:"index"});
          // window.location.href=window.location.origin+window.location.pathname;
          commondata.loginInfo.show=true;
        }
        iview.LoadingBar.error();
      },
      beforeSend:function(e){
        console.log("请求开始");
        iview.LoadingBar.start();
      },

      complete:function (e) {
        console.log(e);
        console.log("请求完成");
        iview.LoadingBar.finish();

      }
      // xhrFields: {
      //   withCredentials: true

    });
  }
  function scwFontAjax(url,postData) {
    return $.ajax({
      url : prefix+url, // 请求地址
      "async": true,
      "crossDomain": true,
      "method": "POST",
      "data":JSON.stringify(postData),
      "crossDomain":true,
      "headers": {
        "Content-Type": "application/json",
        "authentication": window.localStorage.getItem("token")||"nocheck"
      },
      success:function(data) {
        console.log(data.resultCode);
        if (data.resultCode != undefined) {
          if (data.resultCode == 0&&data.message!=null) {
            iview.Message.success(data.message);
          } else if(data.resultCode == 0&&data.message==null) {

          }else{
            iview.Message.error(data.message);

          }
        }
      },
      error:function (err) {
        console.log(err.status);
        console.log(err);
        if(err.status==415){
          router.push({name:"index"});
          // window.location.href=window.location.origin+window.location.pathname;
          commondata.loginInfo.show=true;
        }
        iview.LoadingBar.error();
      },
      beforeSend:function(e){
        console.log("请求开始");
        iview.LoadingBar.start();
      },

      complete:function (e) {
        console.log(e);
        console.log("请求完成");
        iview.LoadingBar.finish();

      }
      // xhrFields: {
      //   withCredentials: true

    });
  }
  function roleAjax(url,postdata){
    var url = "backstage/role/"+url;
    return  scwAjax(url,postdata);
  }
  function bUserAjax(url,postdata) {
    var url = "backstage/user/"+url;
    return  scwAjax(url,postdata);
  }
  function adverAjax(url,postdata) {
    var url = "backstage/advertisement/"+url;
    return  scwAjax(url,postdata);
  }
  function permissionAjax(url,postData) {
    var url = "backstage/permission/"+url;
    return  scwAjax(url,postData);
  }
  function memberAjax(url,postData) {
    var url = "front/Member/"+url;
    return  scwFontAjax(url,postData);
  }
  function projectAjax(url,postData) {
    var url = "front/project/"+url;
    return  scwFontAjax(url,postData);
  }
  function processtAjax(url,postData) {
    var url = "backstage/flow/"+url;
    return  scwAjax(url,postData);
  }
  function regist(postdata){
    var url = "front/user/regist";
    return  scwAjax(url,postdata);
  }
  function login(postdata) {
    var url="front/user/login";
    return  scwAjax(url,postdata);
  }
  function getMenus() {
    var url="backstage/controlPanel/menus";
    return  scwAjax(url,{});
  }
  function getUsers(data) {
    var url="backstage/user/query";
    return  scwAjax(url,data);
  }
  function checkLoginacc() {
    var url="front/user/checkLoginacc";
    return  scwAjax(url,postdata);
  }
  function checkEmail() {
    var url="front/user/checkEmail";
    return  scwAjax(url,postdata);
  }
  function checkLoginaccB(data) {
    var url="backstage/user/checkLoginacc";
    return  scwAjax(url,data);
  }
  function checkEmailB(data) {
    var url="backstage/user/checkEmail";
    return  scwAjax(url,data);
  }
  function addUser(data) {
    var url="backstage/user/add";
    return  scwAjax(url,data);
  }
  function editUser(data) {
    var url="backstage/user/update";
    return  scwAjax(url,data);
  }
  function deleteUsers(data) {
    var url="backstage/user/delete";
    return  scwAjax(url,data);
  }

  var res = {
    prefix:prefix,
    regist:regist,
    login:login,
    getMenus:getMenus,
    getUsers:getUsers,
    checkLoginacc:checkLoginacc,
    checkEmail:checkEmail,
    checkLoginaccB:checkLoginaccB,
    checkEmailB:checkEmailB,
    addUser:addUser,
    editUser:editUser,
    // deleteUsers:deleteUsers,
    scwAjax:scwAjax,
    roleAjax:roleAjax,
    bUserAjax:bUserAjax,
    adverAjax:adverAjax,
    permissionAjax:permissionAjax,
    memberAjax:memberAjax,
    projectAjax:projectAjax,
    processtAjax:processtAjax
  };

  return res;
})();
export {ajaxUtil}
