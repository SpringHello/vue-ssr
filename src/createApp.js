/**
 * Created by yunrui001 on 2018-07-13.
 */
import Vue from 'vue'
import Main from './Main'
import createRouter from './router'
import createStore from './vuex'

export default function createApp() {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    render: h => h(Main)
  })
  return {app, router, store}
}
