/* eslint-disable */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import '../static/vendor/bootstrap/css/bootstrap.min.css'
import '../static/vendor/font-awesome/css/font-awesome.min.css'
import '../static/vendor/linearicons/style.css'
import '../static/vendor/chartist/css/chartist-custom.css'
import '../static/css/main.css'
import '../static/css/demo.css'
//import 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700'
import $ from '../static/vendor/jquery/jquery.min.js'
import $$ from "../static/vendor/bootstrap/js/bootstrap.min.js"
import $$$ from "../static/vendor/jquery-slimscroll/jquery-slimscroll.min.js"
import $$$$ from "../static/vendor/jquery-easy-pie-chart/jquery-easypiechart.min.js"
import $$$$$ from "../static/vendor/chartist/js/chartist.min.js"
import $$$$$$ from "../static/scripts/klorofil-common.js"

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
