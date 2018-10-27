/**
 * Created by yunrui001 on 2018-07-13.
 */
var express = require('express')
var bodyParser = require('body-parser')
//var serveStatic = require('serve-static')
var path = require('path')

// Express
var app = express()

// 这里可以使用mysql作为数据库
// var connection = require('./src/mysql').connection

// vue服务端渲染模版页面
const templateHtml = require('fs').readFileSync(path.resolve(__dirname, './index.template.html'), 'utf-8')

const {createBundleRenderer} = require('vue-server-renderer')
// 引用打包好的服务端json文件
const serverBundle = require(`./dist/vue-ssr-server-bundle.json`)
const clientManifest = require(`./dist/vue-ssr-client-manifest.json`)


//==================log4js日志配置====================================================
const log4js = require('log4js');
log4js.configure({
  appenders: {cheese: {type: 'file', filename: 'log/cheese.log'}},
  categories: {default: {appenders: ['cheese'], level: 'info'}}
});
const logger = log4js.getLogger('cheese');
//=====================================================================================


const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false, // 推荐
  template: templateHtml,
  clientManifest // （可选）客户端构建 manifest
})

// 服务端渲染为string
function renderToString(context) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      err ? reject(err) : resolve(html)
    })
  })
}


var app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

/*静态资源缓存策略*/
app.use(express.static(path.join(__dirname, 'dist'), {
  Etag: false,
  lastModified: true
}))


/*dome数据接口*/
app.get('/api/getDemoData', (req, res, next) => {
  // 这是demo接口返回数据
  // 这里也可以改写为从数据库查询获取
  var result = {
    title: '我是demo数据的标题',
    desc: '我是demo数据的描述',
    content: '我是demo数据的正文'
  }
  res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});//设置response编码为utf-8
  res.end(JSON.stringify(result));
})

// 因为使用的是vue-router
// 所以所有页面请求都捕获，交由vue-router实现路由
app.get('*', (req, res) => {
  const context = {url: req.url}
  renderToString(context).then(resopnse => {
    res.send(resopnse)
  }, error => {
    console.log(error)
    if (error.code == 404) {
      res.status(404)
      res.send('404')
    }
  })
})

app.listen(3000)



