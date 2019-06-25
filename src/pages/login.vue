<template>
    <div style="background: #17233d; position: fixed; height:100%;width: 100%;">
        <div class="box-login">
            <div class="box-title">
                <div>
                    <Icon type="md-car"/>
                </div>
                慧聪物流管理系统登录
            </div>
            <div class="box-body">
                <div class="box-body-head">登录</div>
                <div class="box-body-main">
                    <Input v-model="username" prefix="md-person" placeholder="请输入账号" clearable size="large"/>
                    <Input v-model="password" type="password" prefix="md-lock" placeholder="请输入密码" clearable size="large"/>
                    <Button class="btn-purple" size="large" shape="circle" @click="login">登录</Button>
                    <div class="box-body-foot">忘记密码请联系管理员</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      if (this.username === '' || this.password === '') {
        this.$Message.warning('username or password cannot be null')
      } else {
        this.$http.post('https://www.easy-mock.com/mock/5d063c2b19efbf55ebd39b4f/logistics/login',
          {
            username: this.username,
            password: this.password
          })
          .then((response) => {
            if (response.body.data === 'success') {
              this.$Message.success('success')
              setTimeout(() => {
                this.$router.push('/')
              }, 1000)
            } else {
              this.$Message.error('fail')
            }
          }).catch(response => {
            console.log(response)
          })
      }
    }
  }
}
</script>

<style scoped>
    .box-login{
        width: 310px;
        height: 420px;
        position: absolute;
        left: 38%;
        top: 200px;
        text-align: center;
        font-weight: lighter;
    }
    .box-title{
        color: #FFFFFF;
        padding: 10px;
    }
    .box-body{
        width: 290px;
        height: 340px;
        margin: 10px;
        padding: 10px;
        border-radius: 8px;
        background-color: #FFFFFF;
        box-shadow: 2px 2px 20px #9ea7b4;
    }
    .box-body-head{
        font-size: x-large;
        margin: 15px;
        padding: 10px;
    }
    .box-body-main{
        margin: 10px;
    }
    .box-body-foot{
        color: #9ea7b4;
        padding: 5px;
        font-size: small;
    }
    .box-body-main >>>.ivu-input-wrapper{
        margin: 10px 0 10px 0;
        width:95%;
    }
    .box-body-main>>>.ivu-input{
        border-top: 0;
        border-left: 0;
        border-right: 0;
        border-bottom: #9ea7b4 1px solid;
        border-radius: 0;
    }
    .box-body-main>>>.ivu-input:focus{
        box-shadow: 0 0 0 ;
        border-bottom:#9137F3 1px solid;
    }

    .btn-purple{
        background-color: #9137F3;
        color: #FFFFFF;
        width:90%;
        padding: 10px;
        margin-top: 30px;
    }
</style>
