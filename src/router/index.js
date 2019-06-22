import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Order from '@/components/order'
import OrderDetail from '@/components/orderDetail'
import RuleImport from '@/components/ruleImport'
import AccountInfo from '@/components/accountInfo'

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
          path:'/ruleImport',
          component: RuleImport
      },
      {
          path:'/accountInfo',
          component: AccountInfo
      }
  ]
})
