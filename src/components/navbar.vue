<template>
  <div id="wrapper">
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="brand">
        <router-link :to="{path:'/'}"><img src="../../static/img/logo-dark.png" alt="Klorofil Logo" class="img-responsive logo"></router-link>
      </div>
      <div class="container-fluid">
        <div class="navbar-btn">
          <button type="button" class="btn-toggle-fullwidth"><i class="lnr lnr-arrow-left-circle"></i></button>
        </div>
        <div id="navbar-menu">
          <ul class="nav navbar-nav navbar-right">
            <li class="dropdown">
              <a href="#" class="dropdown-toggle icon-menu" data-toggle="dropdown">
                <i class="lnr lnr-alarm"></i>
                <span class="badge bg-danger">5</span>
              </a>
              <ul class="dropdown-menu notifications">
                <li><a href="#" class="notification-item"><span class="dot bg-warning"></span>System space is almost full</a></li>
                <li><a href="#" class="notification-item"><span class="dot bg-danger"></span>You have 9 unfinished tasks</a></li>
                <li><a href="#" class="notification-item"><span class="dot bg-success"></span>Monthly report is available</a></li>
                <li><a href="#" class="notification-item"><span class="dot bg-warning"></span>Weekly meeting in 1 hour</a></li>
                <li><a href="#" class="notification-item"><span class="dot bg-success"></span>Your request has been approved</a></li>
                <li><a href="#" class="more">See all notifications</a></li>
              </ul>
            </li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown"><img src="../../static/img/user.png" class="img-circle" alt="Avatar"> <span>Samuel</span> <i class="icon-submenu lnr lnr-chevron-down"></i></a>
              <ul class="dropdown-menu">
                <li @click="info"><a><i class="lnr lnr-cog"></i> <span>个人资料</span></a></li>
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
            <li><router-link :to="{path:'/'}" class="active"><i class="lnr lnr-home"></i> <span>首页</span></router-link></li>
            <li>
              <a href="#subPages" data-toggle="collapse" class="collapsed"><i class="lnr lnr-file-empty"></i> <span>订单管理</span> <i class="icon-submenu lnr lnr-chevron-left"></i></a>
              <div id="subPages" class="collapse ">
                <ul class="nav">
                  <li><router-link :to="{path:'/'}" class="">正常订单</router-link></li>
                  <li><router-link :to="{path:'/'}" class="">异常订单</router-link></li>
                  <li><router-link :to="{path:'/'}" class="">历史订单</router-link></li>
                </ul>
              </div>
            </li>
            <li><router-link :to="{path:'/'}" class=""><i class="lnr lnr-user"></i> <span>员工管理</span></router-link></li>
            <li><router-link :to="{path:'/'}" class=""><i class="lnr lnr-text-format"></i> <span>对账信息</span></router-link></li>
            <li><router-link :to="{path:'/'}" class=""><i class="lnr lnr-linearicons"></i> <span>规则导入</span></router-link></li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods:{
      logout(){
        console.log("logout")
      },
      info(){
        console.log("info")
      }
    }
  }
</script>

<style scoped>
</style>
