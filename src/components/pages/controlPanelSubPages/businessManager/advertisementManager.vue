<template>
  <div>
    <tableView ref='tableView' :tableInfo="tableInfo"></tableView>
  </div>
</template>

<script>
  import {ajaxUtil} from "../../../../js/ajaxUtils";
  import tableView from "../../../components/tableView"

  export default {
  data () {
    return {
      editInfo:{
        show:false,
        mode:"",
        data:{
          authCode:"",
          src:"",
          id:"",
          userName:"",
          password:"",
          checkPasswrod:"",
          email:"",
          nickName :""
        }
      },
      tableInfo:{
        selection:{
          id:"id",
          name:"name",
          idList:[],
          nameList:[]
        },
        data:[],
        columns: [

          {
            title: 'id',
            align:'center',
            width: 60,
            key: 'id'
          },
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '广告描述',
            align:'center',
            key: 'name'

          },
          {
            title: '状态',
            align:'center',
            key: 'status'

          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button',{
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      // this.change(params.index)
                    }
                  }
                }, [h("Icon",{props:{
                    type:"android-checkmark-circle"
                  }},"")
                ]),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.editUser(params)
                    }
                  }
                }, [h("Icon",{props:{
                    type:"edit"
                  }},"")
                ]),
                h('Button', {
                  props: {
                    type: 'error',
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.confirmDeleteUser(params)
                    }
                  }
                }, [h("Icon",{props:{
                    type:"close"
                  }},"")
                ])
              ]);
            }
          }
        ],
        functions:{
          query:ajaxUtil.adverAjax,
          add:this.addUser,
          batchDelete:this.batchDeleteUser
        }
      }
    }
  },
    methods:{
      addUser(){
        this.$Modal.confirm({
            render: (h) => {
              return [h("h1",
                {
                  attrs:{
                    slot:"prepend"
                  }
                },"角色名"),h('Input', {
                props: {
                  value:this.value,
                  autofocus: true,
                  placeholder: 'Please enter your name...'
                },
                on: {
                  input: (val) => {
                    this.value = val;
                  }
                }
              },)]
            },
           onOk: () => {
              var _this = this;
              if (this.value != ""&&this.value != null) {
                var  postData={
                name:this.value
              };
                ajaxUtil.adverAjax('add',postData).then(function (data) {
                  _this.$Message.info(data.message);
                  _this.value="";
                  _this.update();
                })

              }else {
                _this.$Message.error("角色名不能为空");
              }

          }
        })
      },
      editUser(param){
        this.$Modal.confirm({
          render: (h) => {
            return [h("h1",
              {
                attrs:{
                  slot:"prepend"
                }
              },"角色名"),h('Input', {
              props: {
                value: param.row.name,
                autofocus: true,
                placeholder: 'Please enter your name...'
              },
              on: {
                input: (val) => {
                  this.value = val;
                }
              }
            },)]
          },
          onOk: () => {
            var _this = this;
            if (this.value != ""&&this.value != null) {
              var  postData={
                id:param.row.id,
                name:this.value
              };
              ajaxUtil.adverAjax('update',postData).then(function (data) {
                _this.$Message.info(data.message);
                _this.value="";
                _this.update();
              })
            }else {
              _this.$Message.error("角色名不能为空");
              this.value = "";
            }
          },
          onCancel:()=>{
            this.value = "";
          }
        })
      },
      batchDeleteUser(){
        var _this= this;
        this.$Modal.confirm({
          title: '删除用户',
          content: `<p>确定删除用户:${_this.tableInfo.selection.nameList}?</p>`,
          onOk: () => {
            // this.$Message.info(e.row);
            var list= _this.tableInfo.selection.idList;
            _this.deleteUser(list);

          },
          onCancel: () => {
            // this.$Message.info('Clicked cancel');
          }
        });
      },
      confirmDeleteUser(e){
        var _this= this;
        this.$Modal.confirm({
          title: '删除用户',
          content: `<p>确定删除用户:${e.row.name}?</p>`,
          onOk: () => {
            // this.$Message.info(e.row);
            var list= [e.row.id];
            _this.deleteUser(list);
          },
          onCancel: () => {
            // this.$Message.info('Clicked cancel');
          }
        });
      },
      deleteUser(list){
        var _this= this;
        ajaxUtil.adverAjax('delete',list).then((data)=>{
          if (data.resultCode==0){
          _this.$Message.success(data.message);
          }else {
            _this.$Message.error(data.message);
          }
            _this.update();
        });
      },
      update(){
        this.$refs.tableView.$emit("update");
      }
    },
    mounted(){
    // console.log(this.$children[0].$emit("update"))

    },
  components:{
    tableView
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
