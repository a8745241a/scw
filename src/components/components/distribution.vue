<template>
    <Modal
      v-model="roleInfo.show"
      title="分配角色"
      @on-ok="ok"
      ok-text="完成"
      @on-cancel="cancel" class="registModel" >
          <Transfer

            :data="data2"
            :target-keys="targetKeys2"
            filterable
            :filter-method="filterMethod"
            :titles="titles"
            @on-change="handleChange2"
            @on-selected-change="handleChange"></Transfer>
    </Modal>
</template>

<script>

  import {ajaxUtil} from "../../js/ajaxUtils";

  export default {
    props:['roleInfo'],
    data () {
      return {
        data2: [],
        targetKeys2: [],
        titles:['未分配角色','已分配角色']
      }
    },
    methods: {
      ok(){

      },
      cancel(){

      },
      getMockData (callback) {
        var mockData = [];
        ajaxUtil.roleAjax("queryAll",{}).then(function (data) {
          console.log(data);
          if(data){
            data.forEach(function (ele) {
              var a={
                key: ele.id,
                label: ele.name,
                description: '角色名'
              };
              mockData.push(a);
            })
          }
          callback(mockData) ;
        })
      },
      getTargetKeys (callback) {
        var _this = this;
        ajaxUtil.roleAjax("queryByUserId",{id:_this.roleInfo.id}).then(function (data) {
          callback (data);
        })

      },
      handleChange(sourceSelectedKeys,targetSelectedKeys){
        console.log(sourceSelectedKeys);
        console.log(targetSelectedKeys);
      },
      handleChange2 (targetKeys, direction, moveKeys) {
        var _this= this;
        var postData = {
          userId:_this.roleInfo.id,
          roleIds:moveKeys
        };
        if (direction=="right") {
        ajaxUtil.roleAjax("distributeRole",postData).then(function (data) {
          _this.targetKeys2=targetKeys;
        });
        } else {
          ajaxUtil.roleAjax("deleteDistributedRole",postData).then(function (data) {
            _this.targetKeys2=targetKeys;
          });
        }
        console.log(targetKeys);
        console.log(direction);
        console.log(moveKeys);
      },
      filterMethod (data, query) {
        return data.label.indexOf(query) > -1;
      }
    },
    mounted(){
      var _this=this;
      _this.$on("update",function () {
        this.getMockData (function (data) {
          _this.data2=data;
          _this.getTargetKeys(function (data) {
            _this.targetKeys2=data;
          });
        })
      })
    }
  }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
