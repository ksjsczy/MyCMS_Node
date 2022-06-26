const Router = require('@koa/router')

const { create, remove, edit, searchUser, searchUserList } = require('../controller/users.controller')
const { checkUserExistence } = require('../middleware/users.middleware')
const { verifyAuth, verifyPermission } = require('../middleware/login.middleware')

const usersRouter = new Router({ prefix: '/users' })
//1.创建用户
usersRouter.post('/', verifyAuth, verifyPermission, checkUserExistence, create)
//2.删除用户
usersRouter.delete('/:id', verifyAuth, verifyPermission, remove)
//3.修改用户
usersRouter.patch('/:id', verifyAuth, verifyPermission, verifyPermission, edit)
//4.查询某个用户
usersRouter.get('/:id', verifyAuth, verifyPermission, searchUser)
//5.查询用户列表
usersRouter.post('/list', verifyAuth, verifyPermission, searchUserList)

module.exports = usersRouter