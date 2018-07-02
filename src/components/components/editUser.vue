<template>
  <Modal
    v-model="registInfo.show"
    :title="registInfo.mode=='addUser'?'新增用户':'修改用户'"
    @on-ok="ok"
    @on-cancel="cancel" class="registModel">
    <p>用户昵称 :
      <Input  icon="person"  v-model="registInfo.data.nickName"  @on-change="change" placeholder="请输入用户名" clearable style="width: 200px"></Input>
      <span v-show="!checkNickName">用户名不合法</span>
    </p>
    <p>用户账户*:
      <Input  icon="person"  v-model="registInfo.data.userName" @on-blur="Loginacc(registInfo.data.userName)" @on-change="change" placeholder="请输入用户名" clearable style="width: 200px"></Input>
      <span v-show="!checkUser">用户名不合法</span> <span v-show="accCheckRes.resultCode==-1">{{accCheckRes.message}}</span>
    </p>
    <!--<p>用户密码*:-->
      <!--<Input icon="locked" v-model="registInfo.data.password" @on-change="change" type="password" placeholder="请输入密码" clearable style="width: 200px"></Input>-->
      <!--<span v-show="!checkPwd">密码不合法</span>-->
    <!--</p>-->
    <!--<p>确认密码*:-->
      <!--<Input icon="locked" v-model="registInfo.data.checkPasswrod" @on-change="change" type="password" placeholder="请再次输入密码" clearable style="width: 200px"></Input>-->
      <!--<span v-show="!checkPwdAg">密码不一致</span>-->
    <!--</p>-->
    <p>验证邮箱*:
      <Input icon="email" v-model="registInfo.data.email" @on-blur="emailExit(registInfo.data.email)" type="email" placeholder="请输入邮箱" clearable style="width: 200px"></Input>
      <span v-show="!checkEmail">邮箱不合法</span> <span v-show="emailCheckRes.resultCode==-1">{{emailCheckRes.message}}</span>
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
          accCheckRes:{
            resultCode:-1,
            message:"",
          },
          emailCheckRes:{
            resultCode:-1,
            message:"",
          }

       }
    },
    computed:{
      checkUser:function () {
        var patt = /^\w{5,12}$/;
        return patt.test(this.registInfo.data.userName);
      },

      // checkPwd:function () {
      //   var patt = /^\w{5,12}$/;
      //   return  patt.test(this.registInfo.data.password);
      // },
      // checkPwdAg:function () {
      //   return this.registInfo.data.password==this.registInfo.data.checkPasswrod;
      // },
      checkEmail:function () {
        var emailPatt = /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/;
        return emailPatt.test(this.registInfo.data.email);
      },
      checkNickName:function () {
        var patt = /^\S{3,12}$/;
        return patt.test(this.registInfo.data.nickName);
      }

    },
    methods:{
      emailExit(e){
        var data = {
          email:e
        };
        var _this=this;
        if(_this.checkEmail){
          ajaxUtil.checkEmailB(data).then(function (data) {
            _this.emailCheckRes=data
          },function (err) {
            console.log(err);
          })
        }
      },
      Loginacc(e){
        var _this=this;
        var data = {
          loginacct:e
        };
        if(_this.checkUser) {
          ajaxUtil.checkLoginaccB(data).then(function (data) {
            _this.accCheckRes = data

          }, function (err) {
            console.log(err);

          })
        }
      },
      change(e){
        // console.log(e.target.value)
      },
      ok (e) {
        var _this = this;
        switch (this.registInfo.mode){
          case "addUser":
            _this.addUser();
            break;
          case "editUser":
            _this.editUser();
            break;
          default:
            break
        }
      },
      editUser(){
        var _this = this;
        var postData={
          id:this.registInfo.data.id,
          username:this.registInfo.data.nickName,
          loginacct:this.registInfo.data.userName,
          email:this.registInfo.data.email
        };
        if(this.checkEmail&&this.checkUser){
          // &&this.checkPwd&&this.checkPwdAg
          //&&this.registInfo.authCode !=''
          ajaxUtil.bUserAjax('update',postData).then(function (data) {
            if (data.resultCode==0) {
              // _this.$Message.success("操作成功");
              _this.clearData(commondata.editInfo.data);
              _this.clearData(_this.accCheckRes);
              _this.clearData(_this.emailCheckRes);
              _this.$emit("update");
            }else {
              // _this.$Message.error(data.message);
            }
          },function (err) {
            console.log(err);
            _this.$Message.error("操作失败");
          });
          _this.registInfo.data.src="";
        }else {
          _this.$Message.error("请按正确的规则填写信息");

        }
      },
      addUser(){
        var _this = this;
        var postData={
          username:this.registInfo.data.nickName,
          loginacct:this.registInfo.data.userName,
          // userpswd:this.registInfo.data.password,
          email:this.registInfo.data.email
          // code:commondata.registInfo.authCode
        };

        if(this.checkEmail&&this.checkUser&&(this.accCheckRes.resultCode==0&&this.emailCheckRes.resultCode==0)){
          // &&this.checkPwd&&this.checkPwdAg
          //&&this.registInfo.authCode !=''
          ajaxUtil.bUserAjax('add',postData).then(function (data) {
            if (data.resultCode==0) {
              // _this.$Message.success("操作成功");
              _this.clearData(commondata.editInfo.data);
              _this.clearData(_this.accCheckRes);
              _this.clearData(_this.emailCheckRes);
              _this.$emit("update");
            }else {
              // _this.$Message.error(data.message);
            }
          },function (err) {
            console.log(err);
            _this.$Message.error("操作失败");
          });
          _this.registInfo.data.src="";
        }else {
          console.log(e);
          _this.$Message.error("请按正确的规则填写信息");

        }
      },
      cancel () {
        this.registInfo.src="";
        if(this.registInfo.mode=="editUser"){
          this.clearData(commondata.editInfo.data);
        }
      },
      clearData(data){
        for (var p in data){
          data[p]="";
        }
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
