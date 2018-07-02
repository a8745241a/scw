<template>
      <div style="background-color: white">

          <Row style="width: 80%;margin-left: 10%">
            <h1 style="border-bottom: 1px solid grey;margin: 50px 0 50px 0">实名认证 - 账户类型选择</h1>
            <RadioGroup v-model="button4" type="button" size="large">
            <Col span="6">

                <card style="width: 80%;margin-left: 10%;cursor: pointer">
                  <img style="width: 100%;height: 150px" src="../../assets/img/services-box1.jpg" alt="">
                  <Radio label="0">商业公司</Radio>
                </card>
            </Col>
            <Col span="6">
              <card style="width: 80%;margin-left: 10%;cursor: pointer">
                <img style="width: 100%;height: 150px" src="../../assets/img/services-box2.jpg" alt="">
                <Radio label="1">个体工商户</Radio>
              </card>
            </Col>
            <Col span="6">
              <card style="width: 80%;margin-left: 10%;cursor: pointer">
                <img style="width: 100%;height: 150px" src="../../assets/img/services-box3.jpg" alt="">
                <Radio label="2">个人经营</Radio>
              </card>
            </Col>
            <Col span="6">
              <card style="width: 80%;margin-left: 10%;cursor: pointer">
                <img style="width: 100%;height: 150px" src="../../assets/img/services-box4.jpg" alt="">
                <Radio label="3">政府及非营利组织</Radio>
              </card>
            </Col>
            </RadioGroup>

          </Row>
          <Row style="width: 80%;margin-left: 10%">
            <Col style="margin: 50px 0 50px 0" span="24"> <Button type="error" long @click="apply">认证申请</Button></Col>
          </Row>

      </div>
</template>

<script>
  import {routerUtils} from "../../js/routerUtils";

  export default {
        name: "accttype",
      data(){
          return{
            button4:"0"
          }
      },
    methods:{
          apply(){
            routerUtils.goByName("realNameAuth")
          }
    }
    }
</script>

<style scoped>

</style>
