<template>
  <div>
    <Card >
      <p style="font-size: 20px" slot="title"><Icon type="ios-keypad"></Icon>数据列表</p>
      <div class="clearfix"style="margin-bottom: 20px;">
      <Input  v-model="condition" style="width: 50%;float: left;" >
      <span slot="prepend">查询条件</span>
      <Button @click="search" slot="append" type="primary"><Icon type="search"></Icon></Button>
      </Input>
      <span style="float: right"><Button type="primary" style="margin-right: 10px" @click="add"> <Icon type="plus"></Icon>新增</Button><Button @click="batchDelete" type="error"> <Icon type="close"></Icon>删除</Button></span>
      </div>
      <Table border stripe  height="400"  :columns="tableInfo.columns" :data="tableInfo.data" @on-selection-change="selectChange"></Table>
      <div style="text-align: center;margin-top: 10px;">
      <Page :total="page.total"  :page-size="page.pageSize" :current="page.current" size="small"
            @on-page-size-change="pageSizeChange" @on-change="pageing"
              show-total show-elevator ></Page>
      </div>
    </Card>
  </div>
</template>

<script>
  export default {
    props:['tableInfo'],
  data () {
    return {
      condition:'',
      page:{
        current:1,
        total:100,
        pageSize:5
      },

    }
  },
    methods:{
      add(){
        this.tableInfo.functions.add();
      },
      batchDelete(){
         if( this.tableInfo.selection.nameList.length==0){
           this.$Message.info("请先选择");
           return
         }
        this.tableInfo.functions.batchDelete();
      },
      //  翻页
      pageing(p){
        this.page.current = p;
        this.update();
      },
      pageSizeChange(p){
        this.page.pageSize = p;
        this.update();
      },
      update(){
        var _this = this;
        var postData={
          condition:_this.condition,
          index:_this.page.current,
          pageSize:_this.page.pageSize
        };
        _this.tableInfo.functions.query('query',postData).then(function (data) {
          _this.tableInfo.data = data.list;
          _this.page.total= data.total;
        },function (err) {

        })
      },
      search(){
        this.page.current=1;
        this.update()
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
