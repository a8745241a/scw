<template>
  <div id="app">
     <Layout>
       <Affix  @on-change="change">
       <Header>
         <h1 class="title">尚筹网{{pageInfo.title}}</h1>
         <div style="float: right" v-show="!loginInfo.logined">
           <Button type="info"  @click="login">登录</Button>
           <Button type="info"  @click="regist" >注册</Button>
         </div>
         <div style="float: right" v-show="loginInfo.logined">
           <Dropdown @on-click="click">
             <Button type="info" >
               <Icon type="person"></Icon>
               {{loginInfo.nickName}}
               <Icon type="arrow-down-b"></Icon>
             </Button>
             <DropdownMenu slot="list">
               <DropdownItem name="userCenter"><Icon type="person"></Icon> 会员中心</DropdownItem>
               <DropdownItem name="message"><Icon type="chatbox-working"></Icon> 消息</DropdownItem>
               <DropdownItem name="loginOut" divided><Icon type="log-out"></Icon> <span > 退出</span></DropdownItem>
             </DropdownMenu>
           </Dropdown>
         </div>
       </Header>
    </Affix>
       <router-view/>

    <Footer class="layout-footer-center"><div id="footer">
      <div class="footerNav">
        <a rel="nofollow" href="http://www.atguigu.com">关于我们</a> | <a rel="nofollow" href="http://www.atguigu.com">服务条款</a> | <a rel="nofollow" href="http://www.atguigu.com">免责声明</a> | <a rel="nofollow" href="http://www.atguigu.com">网站地图</a> | <a rel="nofollow" href="http://www.atguigu.com">联系我们</a>
      </div>
      <div class="copyRight">
        Copyright ?2017-2017atguigu.com 版权所有
      </div>
    </div></Footer>
     </Layout>
    <regist :registInfo="registInfo"></regist>
    <login :loginInfo="loginInfo" @showFPsw="showModel"></login>
    <forgetPsw :model="model"></forgetPsw>
  </div>
</template>

<script>
  import regist from "./components/components/regist"
  import login from  "./components/components/login"
  import {commondata} from "./js/commonData"
  import forgetPsw from "./components/components/forgetPsw"
  import {utils} from "./js/utils";
  import {ajaxUtil} from "./js/ajaxUtils";

  export default {
  name: 'App',
  data(){
    return{
      pageInfo:commondata.pageInfo,
      registInfo:commondata.registInfo,
      loginInfo:commondata.loginInfo,
      carouselItems:commondata.carouselItems.items,
      model:{
        show:false,
        data:{
          email:"",
          userpswd:"",
          pswdCheck:""
        }
      }
    }
  },
  mounted(){
    //初始化公共信息
    this.init();
  },
  methods:{
    change(status){
      // this.$Message.info(`Status: ${status}`);
    },
    login(){
      commondata.loginInfo.show=true
    },
    regist(){
      commondata.registInfo.show=true
    },
    showModel(){
      this.model.show=true
    },
    init(){
      // this.registInfo= commondata.registInfo;
      // this.loginInfo= commondata.loginInfo;
      // this.carouselItems=commondata.carouselItems.items;
      ajaxUtil.memberAjax("info").then(function (data) {
        if (data.resultCode==0){
          // commondata.userInfo=data.data
          for(var index in data.data){
            commondata.userInfo[index]= data.data[index];
          }
          window.sessionStorage.setItem("nickName",data.data.username)
        }
      })
    },
    loginOut(){
      commondata.loginInfo.logined=false;
      this.$Message.success("已退出登录");
      this.$router.push({path:'/'});
      window.sessionStorage.removeItem("UID");
      window.sessionStorage.removeItem("nickName");
      window.localStorage.removeItem("token");
    },
    go(name){
      this.$router.push({name:name});
      console.log("1")
    },
    click(e){
      var _this = this;
      switch(e)
      {
        case "userCenter":
          _this.go("memberCenter");
          break;
        case "message":
          console.log("message");
          break;
        case "loginOut":
          _this.loginOut();
          break;
        default:
          console.log("other");
      }
    }
  },
  components:{
    regist,
    login,
    forgetPsw
  }
}
</script>

<style lang="less">
  .clearfix:after {

    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
  }
  .clearfix { display: inline-table; }
  /* Hides from IE-mac \*/
  * html .clearfix { height: 1%; }
  .clearfix { display: block; }
 #app>{
   background-color: white;
    .title{
     color: white;
      display: inline-block;
      cursor: pointer;

      &:hover{
        color: grey;
      }
    }
 }
 .layout-footer-center{
   text-align: center;
 }
</style>
