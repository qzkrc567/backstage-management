<template>
  <div id="wrapper">
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="brand">
        <router-link :to="{path:'/'}"><img src="../../static/img/logo-dark.png" alt="Klorofil Logo" class="img-responsive logo"></router-link>
      </div>
      <div class="container-fluid">
        <div id="navbar-menu">
          <ul class="nav navbar-nav navbar-right">
            <li class="dropdown" style="display: none;">
              <a href="#" class="dropdown-toggle icon-menu" data-toggle="dropdown">
                <i class="lnr lnr-alarm"></i>
                <span class="badge bg-danger">5</span>
              </a>
              <ul class="dropdown-menu notifications">
                <li><a href="#" class="notification-item"><span class="dot bg-warning"></span>有一条异常订单，请尽快处理</a></li>
                <li><a href="#" class="notification-item"><span class="dot bg-danger"></span>有一条异常订单，请尽快处理</a></li>
                <li><a href="#" class="notification-item"><span class="dot bg-success"></span>有一条异常订单，请尽快处理</a></li>
                <li><a href="#" class="notification-item"><span class="dot bg-warning"></span>有一条异常订单，请尽快处理</a></li>
                <li><a href="#" class="notification-item"><span class="dot bg-success"></span>有一条异常订单，请尽快处理</a></li>
              </ul>
            </li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown"><img src="../../static/img/user.png" class="img-circle" alt="Avatar"> <span>{{name}}</span> <i class="icon-submenu lnr lnr-chevron-down"></i></a>
              <ul class="dropdown-menu">
                <li style="display: none" @click="info"><a><i class="lnr lnr-cog"></i> <span>个人资料</span></a></li>
                <li @click="logout"><a><i class="lnr lnr-exit"></i> <span>退出登录</span></a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div id="sidebar-nav" class="sidebar">
      <div class="sidebar-scroll" style="position: relative">
        <nav>
          <ul class="nav">
            <li v-if="role===0||role===1"><router-link :to="{path:'/index'}" class="active"><i class="lnr lnr-home"></i> <span>首页</span></router-link></li>
            <li v-if="role===0||role===1">
              <a href="#subPages" data-toggle="collapse" class="collapsed"><i class="lnr lnr-file-empty"></i> <span>订单管理</span> <i class="icon-submenu lnr lnr-chevron-left"></i></a>
              <div id="subPages" class="collapse ">
                <ul class="nav">
                  <li><router-link :to="{path:'/order', query:{order_type: 'normal'}}" @click.native="refresh"  class="">正常订单</router-link></li>
                  <li><router-link :to="{path:'/order', query:{order_type: 'abnormal'}}" @click.native="refresh" class="">异常订单</router-link></li>
                  <li><router-link :to="{path:'/order', query:{order_type: 'history'}}" @click.native="refresh"  class="">全部订单</router-link></li>
                </ul>
              </div>
            </li>
              <li v-if="role===1">
                  <a href="#subPagesWorker" data-toggle="collapse" class="collapsed"><i class="lnr lnr-user"></i> <span>员工管理</span> <i class="icon-submenu lnr lnr-chevron-left"></i></a>
                  <div id="subPagesWorker" class="collapse ">
                      <ul class="nav">
                          <li><router-link :to="{path:'/allWorkers'}" class="">全部员工</router-link></li>
                          <li><router-link :to="{path:'/editWorker'}"  class="">新建/编辑员工</router-link></li>
                      </ul>
                  </div>
                  <!--                <router-link :to="{path:'/'}" class=""><i class="lnr lnr-user"></i> <span>员工管理</span></router-link>-->
              </li>
            <li v-if="role===1"><router-link :to="{path:'/accountInfo'}" class=""><i class="lnr lnr-text-format"></i> <span>对账信息</span></router-link></li>
            <li v-if="role===0||role===1"><router-link :to="{path:'/ruleImport'}" class=""><i class="lnr lnr-linearicons"></i> <span>规则导入</span></router-link></li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {

  },
  data () {
    return {
      role: parseInt(this.$cookie.get('role')),
      name: this.$cookie.get('name')
    }
  },
  methods: {
    logout () {
      this.$cookie.remove('id')
      this.$cookie.remove('name')
      this.$cookie.remove('role')
      this.$router.push('/')
    },
    info () {
      console.log('info')
    },
    refresh () {
      this.$emit('refresh')
    }
  }
}
</script>

<style scoped>
</style>
