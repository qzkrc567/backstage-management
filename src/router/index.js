import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Order from '@/components/order'

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
    }
  ]
})
