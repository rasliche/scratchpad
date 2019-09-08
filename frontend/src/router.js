import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home'
import Settings from './views/Settings'
import Login from './views/Login'
import Dashboard from './views/Dashboard'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes:[
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: Home
    },
    {
      path: '/login',
      name:'login',
      component: Login
    },
    {
      path: '/settings',
      name:'settings',
      component: Settings
    },
    {
      path: '*',
      redirect:{
        name: 'home'
      }
    }
  ]
})