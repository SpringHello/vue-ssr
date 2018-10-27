/**
 * Created by yunrui001 on 2018-07-14.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/'
Vue.use(Vuex)

export default function createStore() {
  return new Vuex.Store({
    state: {
      demoData: {},
    },
    actions: {
      // home页面demo数据
      demoData({commit}){
        // 会向Express发送请求
        return axios.get('api/getDemoData').then(response => {
          // 请求数据设置到state中
          if (response.status == 200) {
            commit('setDemoData', response.data)
          }
        }, response => {
          // 异常情况处理
          console.log(response)
        })
      },
    },
    mutations: {
      setDemoData (state, demoData) {
        state.demoData = demoData
      },
    }
  })
}
