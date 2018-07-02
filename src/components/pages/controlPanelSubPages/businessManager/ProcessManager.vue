<template>
  <div>
    <tableView ref='tableView' :tableInfo="tableInfo"></tableView>
    <Modal title="显示图片" v-model="details.visible">
      <img :src="details.src" v-if="details.visible" style="width: 100%">
    </Modal>
  </div>
</template>

<script>
  import {ajaxUtil} from "../../../../js/ajaxUtils";
  import tableView from "../../../components/tableView2"

  export default {
    data () {
      return {
        roleInfo:{
          show:false,
          id:6
        },
        details:{
          visible:false,
          src:''
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
            // {
            //   type: 'selection',
            //   width: 60,
            //   align: 'center'
            // },
            {
              title: '流程名称',
              align:'center',
              key: 'name',
            },
            {
              title: '流程版本',
              align:'center',
              key: 'version'

            },
            {
              title: '任务名称',
              align:'center',
              key: 'resourceName'

            },
            {
              title: '申请会员',
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
                        this.view(params);
                      }
                    }
                  }, [h("Icon",{props:{
                      type:"eye"
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
            query:ajaxUtil.processtAjax
          }
        }
      }
    },
    methods:{
      // batchDeleteUser(){
      //   var _this= this
      //   this.$Modal.confirm({
      //     title: '删除用户',
      //     content: `<p>确定删除用户:${_this.tableInfo.selection.nameList}?</p>`,
      //     onOk: () => {
      //       // this.$Message.info(e.row);
      //       var list= _this.tableInfo.selection.idList;
      //       _this.deleteUser(list);
      //
      //     },
      //     onCancel: () => {
      //       // this.$Message.info('Clicked cancel');
      //     }
      //   });
      //
      // },
      view(params){
        console.log(params);
        this.details.visible=true;
        this.details.src=ajaxUtil.prefix+"/backstage/flow/images?pid="+params.row.id;
      },
      confirmDeleteUser(e){
        var _this= this;
        this.$Modal.confirm({
          title: '删除用户',
          content: `<p>确定删除流程:${e.row.name}?</p>`,
          onOk: () => {
            // this.$Message.info(e.row);
           var arg= {
             id:e.row.deploymentId
           };
            _this.deleteUser(arg);
          },
          onCancel: () => {
            // this.$Message.info('Clicked cancel');
          }
        });
      },
      deleteUser(list){
        var _this= this;
        ajaxUtil.processtAjax('delete',list).then((data)=>{
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
