<template>
  <div>
    <tableView ref='tableView' :tableInfo="tableInfo"></tableView>
    <editUser @update="update" :registInfo="editInfo"></editUser>
    <distribution ref="distribution" :roleInfo="roleInfo"></distribution>
  </div>
</template>

<script>
  import {ajaxUtil} from "../../../../js/ajaxUtils";
  import tableView from "../../../components/tableView"
  import  editUser from "../../../components/editUser"
  import distribution from "../../../components/distribution"

  export default {
    data () {
      return {
        roleInfo:{
          show:false,
          id:6
        },
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
            name:"username",
            idList:[],
            nameList:[]
          },
          data:[],
          columns: [
            {
              type: 'index',
              width: 60,
              align: 'center'
            },
            // {
            //   title: '#',
            //   align:'center',
            //   width: 60,
            //   key: 'id'
            // },
            {
              type: 'selection',
              width: 60,
              align: 'center'
            },
            {
              title: '账号',
              align:'center',
              key: 'loginacct'

            },
            {
              title: '名称',
              align:'center',
              key: 'username'

            },
            {
              title: '邮箱地址',
              align:'center',
              key: 'email'

            },
            {
              title: '创建时间',
              align:'center',
              key: 'createtime'

            }
            ,
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
                        this.allot(params);
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
            query:ajaxUtil.bUserAjax,
            add:this.addUser,
            batchDelete:this.batchDeleteUser
          }
        }
      }
    },
    methods:{
      allot(param){
        console.log(param.row.id);
        this.roleInfo.id=param.row.id;
        this.$refs.distribution.$emit("update");
        this.roleInfo.show=true;
      },
      addUser(){
        this.editInfo.mode="addUser";
        this.editInfo.show=true;
      },
      editUser(param){
        console.log(param);
        this.editInfo.mode="editUser";
        this.editInfo.show=true;
        this.editInfo.data.id=param.row.id;
        this.editInfo.data.email=param.row.email;
        this.editInfo.data.userName=param.row.loginacct;
        this.editInfo.data.nickName=param.row.username;
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
          content: `<p>确定删除用户:${e.row.username}?</p>`,
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
        ajaxUtil.bUserAjax('delete',list).then((data)=>{

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
      tableView,editUser,distribution
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
