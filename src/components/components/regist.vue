<template>
  <Modal
    v-model="registInfo.show"
    title="用户注册"
    @on-ok="ok"
    @on-cancel="cancel" class="registModel">
    <p>用户昵称 :
      <Input  icon="person"  v-model="registInfo.data.nickName" @on-change="change" placeholder="请输入用户名" clearable style="width: 200px"></Input>
      <span v-show="!checkNickName">用户名不合法</span>
    </p>
    <p>用户账户*:
      <Input  icon="person"  v-model="registInfo.data.userName" @on-change="change" placeholder="请输入用户名" clearable style="width: 200px"></Input>
      <span v-show="!checkUser">用户名不合法</span>
    </p>
    <p>用户密码*:
      <Input icon="locked" v-model="registInfo.data.password" @on-change="change" type="password" placeholder="请输入密码" clearable style="width: 200px"></Input>
      <span v-show="!checkPwd">密码不合法</span>
    </p>
    <p>确认密码*:
      <Input icon="locked" v-model="registInfo.data.checkPasswrod" @on-change="change" type="password" placeholder="请再次输入密码" clearable style="width: 200px"></Input>
      <span v-show="!checkPwdAg">密码不一致</span>
    </p>
    <p>验证邮箱*:
      <Input icon="email" v-model="registInfo.data.email" type="email" placeholder="请输入邮箱" clearable style="width: 200px"></Input>
      <span v-show="!checkEmail">邮箱不合法</span>
    </p>
    <p>
      注册类型:
      <Select v-model="mode" clearable  style="width: 200px" >
        <Option value=0 key="会员">会员</Option>
        <Option value=1 key="管理">管理</Option>
      </Select>
    </p>
    <!--<p>验证码:-->
    <!--<Input icon="code" v-model="registInfo.authCode" type="email" placeholder="请输入验证码" clearable style="width: 200px;margin-left: 12px"></Input>-->
    <!--<span v-show="registInfo.authCode ==''">验证码不能为空</span>-->
    <!--</p>-->
    <!--<p> <img style="width: 150px;height: 32px;display: block;" :src="registInfo.src" alt=""></p>-->

  </Modal>
</template>

<script>
  import {commondata} from "../../js/commonData";
  import {ajaxUtil} from "../../js/ajaxUtils";

  export default {
    props:['registInfo'],
    data(){
      return{
        mode:"0"
      }
    },
    computed:{
      checkUser:function () {
        var patt = /^\w{5,12}$/;
        return patt.test(this.registInfo.data.userName);
      },
      checkPwd:function () {
        var patt = /^\w{5,12}$/;
        return  patt.test(this.registInfo.data.password);
      },
      checkPwdAg:function () {
        return this.registInfo.data.password==this.registInfo.data.checkPasswrod;
      },
      checkEmail:function () {
        var emailPatt = /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/;
        return emailPatt.test(this.registInfo.data.email);
      },
      checkNickName:function () {
        var patt = /^\w{3,12}$/;
        return patt.test(this.registInfo.data.nickName);
      }

    },
    methods:{
      change(e){
        console.log(e.target.value)
      },
      ok (e) {
        var _this = this;
        var postData={
          username:commondata.registInfo.data.nickName,
          loginacct:commondata.registInfo.data.userName,
          userpswd:commondata.registInfo.data.password,
          email:commondata.registInfo.data.email
          // code:commondata.registInfo.authCode
        };

        if(this.checkEmail&&this.checkUser&&this.checkPwd&&this.checkPwdAg){
          //&&this.registInfo.authCode !=''

          switch (_this.mode){
            case "0":
              _this.memberRegist(postData);
              break;
            case "1":
              _this.managerRegist(postData);
              break;
            default:
              break
          }
        }else {
          console.log(e);
          _this.$Message.error("请按正确的规则填写信息");

        }


      },
      memberRegist(postData){
        var _this = this;
        ajaxUtil.memberAjax("regist",postData).then(function (data) {

        },function (err) {
          _this.$Message.error("注册失败");
        })

      },
      managerRegist(postData){
        var _this = this;
        ajaxUtil.regist(postData).then(function (data) {

        },function (err) {
          console.log(err);
          _this.$Message.error("注册失败");
        });
        commondata.registInfo.data.src="";
      },
      cancel () {
        this.registInfo.src="";

      }
    }
  }
</script>

<style scoped lang="less">
  p{
    margin: 10px;
  }
  p span{
    color: red;
  }
  .registModel{
    .ivu-modal{
      background-color:black;
    }
  }
</style>
