<template>
  <Modal
    v-model="permissionInfo.show"
    title="分配角色"
    :ok-text="okText"
    @on-ok="ok"
    @on-cancel="cancel" class="registModel">
    <Tree ref="tree" :data="data"  show-checkbox @on-select-change="onSelect" @on-check-change="onCheck" style="width: 50%"  ></Tree>
  </Modal>
</template>
<script>
  import {ajaxUtil} from "../../js/ajaxUtils";
  import {utils} from "../../js/utils";

  export default {
    props:['permissionInfo'],
    data(){
       return{
         okText:"完成",
         data: [],
         selectedId:[]
       }
    },
    methods:{
      ok(){
        var postData={
          "roleId":this.permissionInfo.id,
          "perIds":this.selectedId
        };
        ajaxUtil.permissionAjax("updateRolePermission",postData);

      },
      cancel(){
        console.log(this.selectedId);
      },
      parenRender (h, { root, node, data }) {
        return h('span', {
          style: {
            display: 'inline-block',
            width: 'auto'
          },
          on:{

          }
        }, [
          h('span', [
            h('Icon', {
              props: {
                type: data.metaData.icon
              },
              style: {
                marginRight: '8px'

              }
            }),
            h('span',{
              style:{
                cursor:"pointer",
                marginRight:'16 px'
              }
            }, data.metaData.name)
          ])
        ]);
      },
      childRender (h, { root, node, data }) {
        return h('span', {
          style: {
            display: 'inline-block',
            width: 'auto'
          },
          on:{
          }
        }, [
          h('span', [
            h('Icon', {
              props: {
                type: data.metaData.icon
              },
              style: {
                marginRight: '8px'
              }
            }),
            h('span',{
                style:{
                  cursor:"pointer"
                }
              },
              data.metaData.name)
          ])
        ]);
      },
      onCheck(data){
        var arry=[];
        data.forEach(function (e) {
          arry.push(e.metaData.id);
          if(e.metaData.pid>0){
            arry.push(e.metaData.pid);
          }
        });
        // console.log(data);
        this.selectedId=utils.removeDuplicatedItem(arry);
      },
      onSelect(data){
        // console.log(data);
      },

      update(){
        var _this=this;
        ajaxUtil.permissionAjax('query').then(function (data) {
          var parents= [];
          var childs=[];
          var childrens=[];
          var modelP=[];

          data.forEach(function (ele) {
            if(ele.pid==0){
              modelP.push(ele);
              var  parent= {
                expand: true,
                checked:false,
                render:_this.parenRender,
                id:ele.id,
                metaData:ele,
                children:[]
              };
              data.forEach(function (e) {
                if (e.pid == ele.id){
                  var  child= {
                    display:"none",
                    expand: true,
                    checked:false,
                    render:_this.childRender,
                    metaData:e,
                    id:e.id
                  };
                  parent.children.push(child);
                }
              });
              childrens.push(parent);
            }
          });
          _this.data=childrens;
          // _this.data.forEach(function (ele) {
          //   ele.children.forEach(function (ele) {
          //     ele.checked=true;
          //   })
          // })
          // _this.model.parents=modelP;
          _this.getSelectedPer();
        },function (err) {

        })
      },
      getSelectedPer(){
        var _this=this;
        var postData={
          id:this.permissionInfo.id
        };
        ajaxUtil.permissionAjax("queryById",postData).then(function (data) {
            if (data.length>0) {
              data.forEach(function (ele) {
                  if (ele.pid>0) {
                    _this.data.forEach(function (e) {
                      e.children.forEach(function (e2) {
                          if (e2.id==ele.id){
                            e2.checked=true;
                          }
                      })
                    })
                  }
              })
            }

        })
      }
    },
    mounted(){
      var _this=this;
      // this.update();

      _this.$on("update",function () {
        _this.update();
      })
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
