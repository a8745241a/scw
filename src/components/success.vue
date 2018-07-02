<template>
  <div class="index">
    <h1>邮箱修改成功</h1>
      <Button @click="back">点击此处回到首页</Button>
  </div>
</template>

<script>

  export default {
  name: 'index',
  data () {
    return {
    }
  },
    methods:{
      back(){
        this.$router.push({name:"index"})
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .index{
    text-align: center;
    height: 500px;
    h1{
      margin-top: 200px;
    }
    .demo-carousel{
      cursor: pointer;
      img{
        width: 100%;
        height: 500px;
      }
    }

  }
a {
  color: #42b983;
}
</style>
