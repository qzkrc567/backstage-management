<template>
  <div>
    <NavBar></NavBar>
  </div>
</template>

<script>
  import NavBar from './navbar.vue'
  export default {
    components:{
      NavBar
    },
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
