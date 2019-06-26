<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
    .content{
        position: absolute;
        left: 260px;
        right: 0;
        bottom: 0;
        top: 80px;
        padding: 0px 40px;
    }
    h2{
        border-left: 5px solid purple;
        padding: 0 0 0 15px!important;
        font-size: 28px!important;
        margin: 24px 0!important;
    }
</style>
