var commondata ={
  pageInfo:{
    title:""
  },
  registInfo:{
    show:false,
    data:{
      id:"",
      userName:"",
      password:"",
      checkPasswrod:"",
      email:"",
      authCode:"",
      src:"",
      nickName :"",
      title:"",
    }
  },
  editInfo:{
    show:false,
    mode:"",
    data:{
      authCode:"",
      src:"",
      id:"",
      userName:"",
      password:"",
      checkPasswrod:"",
      email:"",
      nickName :""
    }
  },
  userInfo:{
    "loginacct": null,
    "username": "aaa",
    "email": null,
    "authstatus": null,
    "usertype": null,
    "realname": null,
    "cardnum": null,
    "accttype": null,
    "token": null
  },
  loginInfo:{
    // avatar:require('../../assets/img/default.jpg'),
    show:false,
      userName:"admin",
      password:"admin",
      logined:function () {
        console.log( window.sessionStorage.getItem("nickName")==null);
        return window.sessionStorage.getItem("nickName")==null?false:true;
      }(),
      nickName:window.sessionStorage.getItem("nickName")||""
  },
  carouselItems:{
    items:[require("../assets/img/carousel-1.jpg"),require("../assets/img/carousel-2.jpg"),require("../assets/img/carousel-3.jpg")]
  }
};
export {commondata}
