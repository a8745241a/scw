<template>
  <div>
    <Card >
      <p style="font-size: 20px" slot="title"><Icon type="ios-keypad"></Icon>数据列表</p>
      <div class="clearfix"style="margin-bottom: 20px;">
      <Input  v-model="condition" style="width: 50%;float: left;" >
      <span slot="prepend">查询条件</span>
      <Button @click="search" slot="append" type="primary"><Icon type="search"></Icon></Button>
      </Input>
      <span style="float: right">
        <!--<Button type="primary" style="margin-right: 10px" @click="add"> <Icon type="plus"></Icon>新增</Button>-->
         <Upload :action="action" :headers="headers" :on-success="success">
            <Button type="primary" icon="ios-cloud-upload-outline">上传流程</Button>
          </Upload>
      </span>
      </div>
      <Table border stripe  height="400"  :columns="tableInfo.columns" :data="datas" @on-selection-change="selectChange"></Table>
      <div style="text-align: center;margin-top: 10px;">
      <!--<Page :total="page.total"  :page-size="page.pageSize" :current="page.current" size="small"-->
            <!--@on-page-size-change="pageSizeChange" @on-change="pageing"-->
              <!--show-total show-elevator ></Page>-->
        {{condition}}
      </div>
    </Card>
  </div>
</template>

<script>
  import {utils} from "../../js/utils";
  import {ajaxUtil} from "../../js/ajaxUtils";

  export default {
    props:['tableInfo'],
  data () {
    return {
      headers:{
        uid:window.sessionStorage.getItem("UID")
      },
      action:ajaxUtil.prefix+"backstage/flow/upload",
      datas:this.tableInfo.data,
      condition:'',
      page:{
        current:1,
        total:100,
        pageSize:5
      },

    }
  },
    methods:{
      //  翻页
      success(){
        this.update();
      },
      // pageing(p){
      //   this.page.current = p;
      //   this.update();
      // },
      // pageSizeChange(p){
      //   this.page.pageSize = p;
      //   this.update();
      // },
      filter(data){
        console.log(data);
        console.log("filter");
        if (this.condition==''||this.condition==null){
          return true;
          }
        console.log(this.condition);
        console.log(data.name.indexOf(this.condition)>=0);
        return  data.name.indexOf(this.condition)>=0;
      },
      update(){
        var _this = this;
        var postData={
          // condition:_this.condition,
          // index:_this.page.current,
          // pageSize:_this.page.pageSize
        };
        _this.tableInfo.functions.query('query',postData).then(function (data) {
          _this.tableInfo.data = data;
          _this.datas=data;
          // _this.datas=data.filter(_this.filter)
          // _this.page.total= data.total;
        },function (err) {

        })
      },
      search(){
          var array = [];
        this.tableInfo.data.forEach(function (e) {
          array.push(utils.deepCopy(e))
        });
        this.datas=[].concat(array).filter(this.filter);
        // this.data= this.tableInfo.data.slice(2,5);
      },
      selectChange(p){
        var _this= this;
        console.log(p);
        var arr = [];
        var arr2=[];
        p.forEach(function (e) {
          arr.push(e[_this.tableInfo.selection.id]);
          arr2.push(e[_this.tableInfo.selection.name]);
        });
        this.tableInfo.selection.idList=arr;
        this.tableInfo.selection.nameList=arr2;
      }
    },
    mounted(){
    var _this = this;
      _this.update();
      this.$on("update",function () {
        _this.update();
        console.log("刷新")
      })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
