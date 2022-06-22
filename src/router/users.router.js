const Router = require('@koa/router')

const { create, remove, edit } = require('../controller/users.controller')
const { checkUserExistence } = require('../middleware/users.middleware')
const { verifyAuth } = require('../middleware/login.middleware')

const usersRouter = new Router({ prefix: '/users' })
usersRouter.post('/', verifyAuth, checkUserExistence, create)
usersRouter.delete('/:id', verifyAuth, remove)
usersRouter.patch('/:id', verifyAuth, edit)
module.exports = usersRouter