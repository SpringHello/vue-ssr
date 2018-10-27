<template>
  <div>
    我是home页面
    <h1>{{demoData.title}}</h1>
    <p>{{demoData.desc}}</p>
    <p>{{demoData.content}}</p>
  </div>
</template>

<script>
  export default {
    name: 'home',
    asyncData ({store, route}) {
      // 触发 action 后，会返回 Promise
      return store.dispatch('demoData')
    },
    data () {
      return {}
    },
    methods: {},
    computed: {
      // 计算属性返回vuex数据
      demoData(){
        return this.$store.state.demoData
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/less" lang="less">

</style>
