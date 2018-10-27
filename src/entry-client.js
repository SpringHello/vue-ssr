/**
 * Created by yunrui001 on 2018-07-13.
 */
import createApp from './createApp'
import 'promise-polyfill/src/polyfill'
var {app, router, store} = createApp()

// 客户端渲染不用发送ajax请求页面数据
// 服务端会把页面数据设置到window对象的__INITIAL_STATE__变量中
// 直接使用vuex store对象的replaceState获取数据
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)

    // 我们只关心非预渲染的组件
    // 所以我们对比它们，找出两个匹配列表的差异组件
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })

    if (!activated.length) {
      return next()
    }

    // 这里如果有加载指示器(loading indicator)，就触发
    Promise.all(activated.map(c => {
      // 服务端只会设置首页数据到__INITIAL_STATE__
      // 所以页面切换时会调用异步加载数据。
      if (c.asyncData) {
        return c.asyncData({store, route: to})
      }
    })).then(() => {
      next()
    }).catch(next)
  })
  app.$mount('#app')
})

