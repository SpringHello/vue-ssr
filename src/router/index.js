import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home'

Vue.use(Router)

export default function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/home',
        name: Home.name,
        component: Home,
      }
    ]
  })
}
