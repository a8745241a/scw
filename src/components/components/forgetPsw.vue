<template>
  <Modal
    v-model="model.show"
    title="密码重置
"
    @on-ok="ok"
    @on-cancel="cancel" class="loginModel">
    <Row>
      <Col span="8" class="col"> 用户注册邮箱 :</Col>

      <Col span="16" class="col">
        <Input  icon="email"  v-model="model.data.email"   placeholder="请输入邮箱名" clearable ></Input>
      </Col>
    </Row>
    <Row>
      <Col span="8" class="col"> 新密码:</Col>

      <Col span="16" class="col">
        <Input  icon="locked" type="password"  v-model="model.data.userpswd"   placeholder="请输入新密码" clearable ></Input>
      </Col>
    </Row>
    <Row>
      <Col span="8" class="col"> 确认密码 :</Col>

      <Col span="16" class="col">
        <Input  icon="locked" type="password"  v-model="model.data.pswdCheck"   placeholder="请确认新密码" clearable ></Input>
      </Col>

  </Row>
  </Modal>
</template>

<script>
import {ajaxUtil} from "../../js/ajaxUtils";
import {utils} from "../../js/utils";

export default {
    props:['model'],
    data(){
      return{
      }
    },
    computed:{
      checkPwd:function () {
        var patt = /^\w{5,12}$/;
        return  patt.test(this.loginInfo.password);
      }
    },
    methods:{
      ok () {
        var _this = this;
        var postdata={
          "email":this.model.data.email,
          "userpswd":this.model.data.userpswd,
        };
        ajaxUtil.memberAjax("resetPswd",postdata).then(function (data) {
          if(data.resultCode==0){
            utils.clearData(_this.model.data);
            _this.$Notice.success({
              title: '操作成功',
              desc: data.message,
              duration: 0
            });
          }else {
            _this.model.show=true;
          }

        },function (err) {
          _this.model.show=true;
          _this.$Message.info("错误");
        })

      },
      cancel () {
        var _this=this;
        utils.clearData(_this.model.data);
        // this.$Message.info('Clicked cancel');
      },
      setSessionUserInfo(data){
        window.sessionStorage.setItem("UID",data.userInfo.id);
        window.sessionStorage.setItem("nickName",data.userInfo.username);
      }
    }
  }
</script>

<style scoped>
  .col{
    margin-top: 20px;
  }
</style>
