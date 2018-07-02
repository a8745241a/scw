<template>
  <Modal
    v-model="model.show"
    :title="model.mode=='add'?'新增权限':'修改权限'"
    @on-ok="ok"
    @on-cancel="cancel" :mask-closable="closable" >
    <div class="clearfix">
      <!--<p>{{model.selectedP}}</p>-->
      <Row v-if="model.mode=='add'&&model.pid>-1||model.mode=='edit'&&model.data.pid>0">
        <Col span="8" class="col"> 父菜单: </Col >
        <Col span="16" class="col">
          <Select v-model="model.selectedP" clearable >
            <Option v-for="item in model.parents" :value="item.id" :key="item.name"><Icon :type="item.icon"></Icon>{{ item.name }}</Option>
          </Select>
        </Col >
      </Row>
      <Row>
        <Col span="8" class="col"> 权限名称 :</Col>

        <Col span="16" class="col">
        <Input  icon=""  v-model="model.data.name"   placeholder="请输入权限名" clearable ></Input>
        </Col>
      </Row>
      <Row>
          <Col span="8" class="col"> icon:</Col>
        <Col span="16" class="col">
        <Input  :icon="model.data.icon"  v-model="model.data.icon"   placeholder="请输入icon" ></Input>
        </Col>
      </Row>
        <Row>
           <Col span="8" class="col"> url:</Col>
        <Col span="16" class="col">
        <Input  icon=""  v-model="model.data.url"   placeholder="请输入url" clearable ></Input>
        </Col>
        </Row>
    </div>
  </Modal>
</template>

<script>
  import {ajaxUtil} from "../../js/ajaxUtils";

  export default {
    props:['model'],
    data(){
       return{
         closable:false
       }
    },
    mounted(){
      console.log(this.model.pid);
      console.log(this.model.pid<=-1)

    },
    methods:{

      ok () {

        switch (this.model.mode) {
          case "add":
            var postData={
              pid:this.model.selectedP,
              name:this.model.data.name,
              icon:this.model.data.icon,
              url:this.model.data.url
            };
            this.add(postData);
            break;
          case "edit":
            var postData={
              id:this.model.data.id,
              pid:this.model.selectedP,
              name:this.model.data.name,
              icon:this.model.data.icon,
              url:this.model.data.url
            };
            this.edit(postData);
             break;
          default:
            break;
        }

      },
      add(postData){
        var _this = this;
        ajaxUtil.permissionAjax("add",postData).then(function (data) {
          _this.clearData(_this.model.data);
          _this.$emit("update");
        })
      },
      edit(postData){
        var _this = this;
        ajaxUtil.permissionAjax("update",postData).then(function (data) {
          _this.clearData(_this.model.data);
          _this.$emit("update");
        })
      },
      cancel () {
        this.clearData(this.model.data);
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
      /*text-align: right;*/

    }
    .col{
      height: 30px;
      line-height: 30px;
      margin-top: 10px;
      margin-bottom: 10px;
      padding:0  20px 0 20px;
    }
  p span{
    color: red;
  }

</style>
