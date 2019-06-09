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

<style scoped>

</style>
