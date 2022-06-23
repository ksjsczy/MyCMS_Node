const app = require('./app')
//使用.env中的参数
const config = require('./app/config')
//连接数据库
require('./app/database')
//错误处理函数
const errorHandler = require('./app/error-handle')
//用于解析post方法的body
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

const cors = require('koa2-cors')
app.use(cors())

//加载路由
const useRouters = require('./router')
useRouters(app)

//监听错误
app.on('error', errorHandler)

//起动服务器
app.listen(config.APP_PORT, () => {
  console.log(`服务器在${config.APP_PORT}端口启动成功~`)
})
