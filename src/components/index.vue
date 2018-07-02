<template>
  <div class="index">
    <Carousel autoplay v-model="value1" arrow="hover" trigger="hover"  loop>
      <CarouselItem v-for="item in carouselItems">
        <div class="demo-carousel"><img :src="item" alt=""></div>
      </CarouselItem>
    </Carousel>
    <div class="hots">
      <Row :gutter="16">
        <Col span="8"  v-for="item in hots" class="hotItem">
          <!--<card >-->
            <img :src="item.iconpath" alt="" style="width: 100%;height: 250px">
            <h1 style="margin-top: 10px">{{item.name}}</h1>
            <p style="font-size: 18px;margin-top: 10px">{{item.remark}}</p>
            <Button style="margin-top: 20px">项目详情</Button>
          <!--</card>-->
        </Col>
      </Row>
    </div>
    <Row style="margin-top: 50px;margin-bottom: 50px" v-for="item in TypeHots">
      <Col span="20" offset="2">
        <div>
          <div style="border-bottom: 2px solid #09c;padding-bottom: 2px" class="clearfix">
            <h1 style="float: left;background-color: #09c;padding-left: 10px;padding-right: 10px;color: white;width: 20%">{{item.typeName}} <small>改变未来</small></h1>
            <h2 style="float: right;padding: 5px;color:#09c;cursor: pointer">更多...</h2>
          </div>
          <Row style="margin-top: 20px">
            <Col span="5" style="margin-left: 2%;margin-right:2%" v-for="pro in item.list">
              <card style="cursor: pointer">
                <img style="width: 100%;height: 150px" :src="pro.iconpath" :alt="pro.name">
                <h2 style="color:#09c;">{{pro.name}}</h2>
                <Row>
                  <Col span="12"><Icon type="pinpoint"></Icon> <span>$ {{pro.money}}</span></Col>
                  <Col span="12"><Icon type="calendar"></Icon> <span style="text-align: right">{{pro.deploydate}}</span></Col>
                </Row>
                <Row>
                  <Col span="24">
                    <Progress :percent="pro.completion" status="active"></Progress>
                  </Col>
                </Row>
                <Row>
                  <Col span="12"><Icon type="person"></Icon><span> {{pro.follower}}</span></Col>
                  <Col span="12" style="text-align: right"><Icon type="ios-star-outline"></Icon></Col>
                </Row>
              </card>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>

  </div>
</template>

<script>
  import {commondata} from "../js/commonData";
  import {ajaxUtil} from "../js/ajaxUtils";

  export default {
  name: 'index',
  data () {
    return {
      carouselItems:commondata.carouselItems.items,
      value1:1,
      hots:[],
      TypeHots:[]
    }
  },
    methods:{
      success(response, file, fileList){
        alert(response);
        console.log("成功");
        console.log(response);
        console.log(file);
        console.log(fileList);
      }
    },
    mounted(){
    var _this= this;
      ajaxUtil.projectAjax("getHots").then(function (data) {
        _this.hots=data.data;
      });
      ajaxUtil.projectAjax("getALlTypeHots").then(function (data) {
        _this.TypeHots=data.data;
      })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .index{
    background-color: white;
    .demo-carousel{
      cursor: pointer;
      img{
        width: 100%;
        height: 500px;
      }
    }
  }
  .hots{
    width: 80%;
    margin: 50px auto;
    .hotItem{
      text-align: center;
    }
  }
a {
  color: #42b983;
}
</style>
