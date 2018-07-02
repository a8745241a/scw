<template>
  <Modal
    v-model="loginInfo.show"
    title="用户登陆"
    @on-ok="ok"
    @on-cancel="cancel" class-name="loginModel">
    <div class="loginModel">
      <p>用户名称:
          <Input icon="person" v-model="loginInfo.userName" placeholder="请输入用户名" clearable style="width: 200px" ></Input>
          <span v-show="!checkUser">用户名不合法</span>
      </p>
      <p>用户密码:
        <Input icon="locked" v-model="loginInfo.password" type="password" placeholder="请输入密码" clearable style="width: 200px"></Input>
        <span v-show="!checkPwd">密码不合法</span>
        <span style="cursor: pointer" @click="forgetPsw" v-if="mode=='0'">忘记密码</span>
      </p>
      <p>
        登录类型:
        <Select v-model="mode" clearable  style="width: 200px" >
          <Option value=0 key="会员">会员</Option>
          <Option value=1 key="管理">管理</Option>
        </Select>
      </p>
    </div>
    <!--<img src="http://localhost:8080/myBook/Kaptcha.jpg" alt="">-->
  </Modal>
</template>

<script>
import {ajaxUtil} from "../../js/ajaxUtils";
import {commondata} from "../../js/commonData";

export default {
    props:['loginInfo'],
    data(){
      return{
        mode:"0"
      }
    },
    computed:{
      checkUser:function () {
        var patt = /^\w{5,12}$/;
        return patt.test(this.loginInfo.userName);
      },
      checkPwd:function () {
        var patt = /^\w{5,12}$/;
        return  patt.test(this.loginInfo.password);
      }
    },
    methods:{
      ok () {
        var _this = this;
        var postdata={
          "loginacct":commondata.loginInfo.userName,
          "userpswd":commondata.loginInfo.password,
        };
        switch (_this.mode){
          case "0":
                  _this.memberLogin(postdata);
            break;
          case "1":
                  _this.adminLogin(postdata);
            break;
          default:
            break
        }


      },
      memberLogin(postData){
        var _this = this;
        ajaxUtil.memberAjax('login',postData).then(function (data) {
          console.log(data);
          commondata.loginInfo.nickName=data.data.username;
          commondata.loginInfo.logined=true;
          window.localStorage.setItem("token",data.data.token);
        })
      },
      adminLogin(postdata){
        var _this = this;
        ajaxUtil.login(postdata).then(function (data) {
          if(data.resultCode==0){
            commondata.loginInfo.nickName=data.userInfo.username;
            commondata.loginInfo.logined=true;
            _this.setSessionUserInfo(data);
            _this.$router.push({name:"panelIndex"});
          }else {
            commondata.loginInfo.show=true
            // _this.$Message.info(data.message);
          }

        },function (err) {
          commondata.loginInfo.show=true;
          _this.$Message.info("错误");
        })
      },

      cancel () {
        // this.$Message.info('Clicked cancel');
      },
      setSessionUserInfo(data){
        window.sessionStorage.setItem("UID",data.userInfo.id);
        window.sessionStorage.setItem("nickName",data.userInfo.username);
      },
      forgetPsw(){
        commondata.loginInfo.show=false;
        this.$emit('showFPsw');
      }
    }
  }
</script>

<style scoped>
  .loginModel{
    background-image: url("../../assets/img/49D58FDC23392E221702357F8BD8A904.gif");
  }
  p{
    margin: 10px;
  }
</style>
