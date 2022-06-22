const app = require('./app')
const config = require('./app/config')
require('./app/database')
const errorHandler = require('./app/error-handle')
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

const loginRouter = require('./router/login.router')
app.use(loginRouter.routes())
app.use(loginRouter.allowedMethods())
const usersRouter = require('./router/users.router')
app.use(usersRouter.routes())
app.use(usersRouter.allowedMethods())

app.on('error', errorHandler)
app.listen(config.APP_PORT, () => {
  console.log(`服务器在${config.APP_PORT}端口启动成功~`)
})
