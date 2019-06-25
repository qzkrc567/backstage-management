import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Order from '@/pages/order'
import OrderDetail from '@/pages/orderDetail'
import RuleImport from '@/pages/ruleImport'
import AccountInfo from '@/pages/accountInfo'
import AllWorkers from '@/pages/allWorkers'
import EditWorker from '@/pages/editWorker'
import Login from '@/pages/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: OrderDetail
    },
    {
      path: '/ruleImport',
      component: RuleImport
    },
    {
      path: '/accountInfo',
      component: AccountInfo
    },
    {
      path: '/allWorkers',
      component: AllWorkers
    },
    {
      path: '/editWorker',
      component: EditWorker
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
