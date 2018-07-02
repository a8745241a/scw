<template>
  <div>
    <Row>
      <Col span="4">
        <Affix :offset-top="60">
        <div style="padding: 10px;">
          <Menu @on-select="select" accordion style="margin: 0 auto">
            <div @click="goIndex" style="text-align: left;padding: 15px 20px 15px 23px;cursor: pointer">
              <Icon type="clock"></Icon>
              控制面板
            </div>
            <Submenu v-for="menu in menus" v-if="menu.pid==0"  :name="menu.url">
              <template slot="title">
                <Icon :type="menu.icon"></Icon>
                {{menu.name}}  <Badge style="margin-left: 10px" :count="menuCount(menu.id)"></Badge>
              </template>
              <MenuItem v-for="subMenu in menus" :name="subMenu.url" v-if="subMenu.pid==menu.id"> <Icon :type="subMenu.icon"></Icon>{{subMenu.name}}</MenuItem>

            </Submenu>

          </Menu>
          </div>
        </Affix>
      </Col>
      <Col span="20" style="padding:10px">
        <transition name="fade">
        <router-view class= "router"/>
        </transition>
      </Col>

    </Row>
  </div>
</template>

<script>
  import {ajaxUtil} from "../../js/ajaxUtils";

  export default {
  name: 'controlPanel',
  data () {
    return {
          menus:[]
    }
  },
    methods:{
      menuCount(pid){
        var count=0;
         this.menus.forEach(function (e) {
            if(e.pid == pid){
                count++
            }
         });
        return count
      },
      select(e){
        console.log(e);
        this.$router.push({name:e});
        console.log(this)
      },
      goIndex(){
        this.$router.push({name:"panelIndex"});
        console.log("goindex")
      }
    },
    mounted(){
    var _this = this;
      ajaxUtil.getMenus().then(function (data) {

        _this.menus=data;
      })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
