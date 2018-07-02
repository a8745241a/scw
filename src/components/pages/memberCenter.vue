<template>
  <div class="containner">
      <Row style="width: 90%;margin-left: 5%;">
        <Col span="6">
          <Card style="width: 80%;margin-left: 10%;text-align: center">
            <img src="../../assets/img/services-box1.jpg"  style="width: 100%" alt="">
            <h1>{{userInfo.username}}</h1>
            <Button type="error" v-if="userInfo.authstatus==0" @click="go('accttype')"> 未实名认证</Button>
            <Button type="success" v-if="userInfo.authstatus==1"> 已实名认证</Button>
          </Card>
        </Col>
        <Col span="18"><h1>我的钱包</h1></Col>
      </Row>
  </div>
</template>

<script>
  import {commondata} from "../../js/commonData";
  import {ajaxUtil} from "../../js/ajaxUtils";
  import {routerUtils} from "../../js/routerUtils";

  export default {
  name: 'memberCenter',
  data () {
    return {
      userInfo:commondata.userInfo
    }
  },
    methods:{
      go(name){
        routerUtils.goByName(name);
      }
    },
    mounted(){
    var _this = this;
    ajaxUtil.memberAjax("info").then(function (data) {
      if (data.resultCode==0){
        for(var index in data.data){
          commondata.userInfo[index]= data.data[index];
        }
        window.sessionStorage.setItem("nickName",data.data.username)
      }
    })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .containner{
    background-color: white;
    padding: 10px;
  }
</style>
