const Router = require('@koa/router')
const { verifyLogin } = require('../middleware/login.middleware')
const { login } = require('../controller/login.controller')

const loginRouter = new Router({ prefix: '/login' })
loginRouter.post('/', verifyLogin, login)

module.exports = loginRouter