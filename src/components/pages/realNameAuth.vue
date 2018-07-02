<template>
      <div style="background-color: white">

          <Row style="width: 80%;margin-left: 10%">
            <h1 style="border-bottom: 1px solid grey;margin: 50px 0 50px 0">实名认证 - 申请</h1>

            <Steps :current="current">
              <Step title="基本信息" icon="person"></Step>
              <Step title="资质文件上传" icon="camera"></Step>
              <Step title="邮箱确认" icon="email"></Step>
              <Step title="申请确认" icon="navigate"></Step>
            </Steps>

          </Row>
          <Row v-if="current==0" style="width: 80%;margin-left: 10%">
            <Col span="18" class="col">
              <Input v-model="userInfo.name">
              <span slot="prepend">真实姓名</span>
              </Input>
            </Col>
            <Col span="18" class="col">
              <Input v-model="userInfo.name">
              <span slot="prepend">身份证号</span>
              </Input>
            </Col>
            <Col span="18" class="col">
              <Input v-model="userInfo.phone">
              <span slot="prepend">电话号码</span>
              </Input>
            </Col>
          </Row>
          <Row v-if="current==1" style="width: 80%;margin-left: 10%">
              <div style="margin-top: 50px">
                <Upload
                  :before-upload="handleUpload"
                  :action="action">
                  <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
                </Upload>
                <div v-if="file !== null">Upload file: {{ file.name }} <Button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? '上传中' : '点击上传' }}</Button></div>
              </div>
          </Row>
          <Row style="width: 80%;margin-left: 10%">
            <Col style="margin: 50px 0 50px 0;text-align: left" span="12" ><Button @click="pre" type="warning" style="margin-left: 10px;margin-right: 10px">上一步</Button><Button v-if="current<3" @click="next" type="info" >下一步</Button><Button v-if="current==3" type="info" >确认申请</Button></Col>
          </Row>

      </div>
</template>

<script>
  import {ajaxUtil} from "../../js/ajaxUtils";

  export default {
        name: "realNameAuth",
      data(){
          return{
            file: null,
            loadingStatus: false,
            current:0,
            action:ajaxUtil.prefix+"system/imgUpload",
            userInfo:{
              name:'',
              phone:''
            }
          }
      },
      methods:{
        handleUpload (file) {
          this.file = file;
          return false;
        },
        upload () {
          this.loadingStatus = true;
          setTimeout(() => {
            this.file = null;
            this.loadingStatus = false;
            this.$Message.success('Success')
          }, 1500);
        },
        pre(){
          if (this.current>0) {
            this.current--
          }
        },
        next(){
          if (this.current<3) {
            this.current++
          }
        }
      }
    }
</script>

<style scoped>

  .col{
    margin-top: 50px;
  }
</style>
