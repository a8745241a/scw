<template>
  <div>
    <Card >
      <p style="font-size: 20px" slot="title"><Icon type="ios-keypad"></Icon>权限维护</p>
      <Tree :data="data"  style="width: 50%"  ></Tree>
    </Card>
    <editPermission @update="update" :model="model"></editPermission>
  </div>
</template>

<script>

  import {ajaxUtil} from "../../../../js/ajaxUtils";
  import editPermission from "../../../components/editPermission"
  export default {
  name: 'controlPanel',
    components:{
      editPermission
    },
  data () {
    return {
      data: [
        {
          title: '系统菜单',
          expand: true,
          metaData:{
            pid:-1
          },
          render: (h, { root, node, data }) => {
            return h('span', {
              style: {
                display: 'inline-block',
                width: 'auto'
              }
            }, [
              h('span', [
                h('Icon', {
                  props: {
                    type: 'ios-folder-outline'
                  },
                  style: {
                    marginRight: '8px'

                  }
                }),
                h('span', data.title)
              ]),
              h('span', {
                style: {
                  display: 'inline-block',
                  float: 'right',
                  marginRight: '32px',
                  marginLeft: '32px'
                }
              }, [
                h('Button', {
                  props: Object.assign({}, this.buttonProps, {
                    icon: 'ios-plus-empty',
                    type: 'primary'
                  }),
                  style: {
                    width: '30px'
                  },
                  on: {
                    click: () => { this.append(data) }
                  }
                })
              ])
            ]);
          },
          children: []
        }
      ],
      buttonProps: {
        type: 'ghost',
        size: 'small',
      },
      model:{
        show:false,
        mode:"add",
        parents:[],
        pid:"",
        selectedP:null,
         data:{
           id:null,
           pid:null,
           name:"",
           icon:"",
           url:""
         }
      }
    }
  },
    methods: {
      parenRender (h, { root, node, data }) {
        return h('span', {
          style: {
            display: 'inline-block',
            width: 'auto'
          },
          on:{
            mouseover:(e)=>{
              data.display="inline-block";

            },

            mouseout:(e)=>{
              data.display="none";
            }
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
          ]),
          h('span', {
            style: {
              display: data.display,
              float: 'right',
              marginRight: '32px',
              marginLeft:'32px'
            },
            attrs:{
              class:"btnGroup"
            }
          }, [
            h('Button', {
              props: Object.assign({}, this.buttonProps, {
                icon: 'edit',
              }),

              style: {
                marginRight: '8px'

              },
              on: {
                click: () => {
                  this.edit(data);
                }
              }
            }),
            h('Button', {
              props: Object.assign({}, this.buttonProps, {
                icon: 'ios-plus-empty',
              }),

              style: {


              },
              on: {
                click: () => {
                  this.append(data);
                }
              }
            }),
            h('Button', {
              props: Object.assign({}, this.buttonProps, {
                icon: 'ios-minus-empty'
              }),
              style:{
                display:this.hasChild(data),
                marginLeft:"8px"
              },
              on: {
                click: () => {
                  this.remove(root, node, data)
                }
              }
            })
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
            mouseover:(e)=>{
              data.display="inline-block";

            },
            mouseout:(e)=>{
              data.display="none";
            }
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
          ]),
          h('span', {
            style: {
              display: data.display,
              float: 'right',
              marginRight: '32px',
              marginLeft:'32px'
            }
          }, [h('Button', {
              props: Object.assign({}, this.buttonProps, {
                icon: 'edit',
              }),

              style: {


              },
              on: {
                click: () => {
                this.edit(data);
                }
              }
            }),
            h('Button', {
              props: Object.assign({}, this.buttonProps, {
                icon: 'ios-minus-empty'
              }),
              style:{
                display:data.display,
                marginLeft: '8px'
              },
              on: {
                click: () => {
                  this.remove(root, node, data)
                }
              }
            })
          ])
        ]);
      },
      append (data) {
        this.model.show=true;
        this.model.mode='add';
        this.model.pid = data.metaData.pid;
        if(this.model.pid==0){
          this.model.selectedP=data.metaData.id;
        }
        if (this.model.pid<=-1) {
          this.model.selectedP=0;
        }
      },
      edit(data){
        this.model.show=true;
        this.model.mode='edit';
        this.model.selectedP=data.metaData.pid;
        this.model.data.id=data.metaData.id;
        this.model.data.name=data.metaData.name;
        this.model.data.icon=data.metaData.icon;
        this.model.data.url=data.metaData.url;
        this.model.data.pid=data.metaData.pid;
      },
      remove (root, node, data) {
       console.log();
        this.$Modal.confirm({
          title: '删除用户',
          content: `<p>确定删除权限:${data.metaData.name}?</p>`,
          onOk: () => {
            var _this = this;
            // this.$Message.info(e.row);
            var list= [data.metaData.id];
            ajaxUtil.permissionAjax("delete",list).then(function (data) {

              _this.update();
            })
          },
          onCancel: () => {
            // this.$Message.info('Clicked cancel');
          }
        });
      },
      hasChild(data){

        return data.children.length==0?"inline-block":"none"
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
                display:"none",
                expand: true,
                render:_this.parenRender,
                metaData:ele,
                children:[]
              };
              data.forEach(function (e) {
                if (e.pid == ele.id){
                  var  child= {
                    display:"none",
                    expand: true,
                    render:_this.childRender,
                    metaData:e
                  };
                  parent.children.push(child);
                }
              });
            childrens.push(parent);
            }
          });
          _this.model.parents=modelP;
          _this.data[0].children=childrens;
        },function (err) {

        })
      }
    },
    mounted(){
      this.update();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
