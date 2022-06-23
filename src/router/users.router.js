const Router = require('@koa/router')

const { create, remove, edit, searchUser, searchUserList } = require('../controller/users.controller')
const { checkUserExistence } = require('../middleware/users.middleware')
const { verifyAuth } = require('../middleware/login.middleware')

const usersRouter = new Router({ prefix: '/users' })
//1.创建用户
usersRouter.post('/', verifyAuth, checkUserExistence, create)
//2.删除用户
usersRouter.delete('/:id', verifyAuth, remove)
//3.修改用户
usersRouter.patch('/:id', verifyAuth, edit)
//4.查询某个用户
usersRouter.get('/:id', verifyAuth, searchUser)
//5.查询用户列表
usersRouter.post('/list', verifyAuth, searchUserList)

module.exports = usersRouter