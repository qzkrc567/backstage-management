<template>
    <div class="box">
        <div v-if="name" class="header">
            <Icon :type="icon" style="vertical-align: baseline;margin-right: 5px"></Icon>{{name}}
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'ContentBox',
  props: [
    'icon',
    'name'
  ]
}
</script>

<style scoped>
    .box{
        width: 100%;
        border: 1px solid #eee;
        background: white;
        border-radius: 3px;
        padding: 20px 25px;
        margin-bottom: 20px;
    }
    .header{
        width: 100%;
        color: #8D99A8;
        padding: 0 0 15px 0;
    }
</style>
