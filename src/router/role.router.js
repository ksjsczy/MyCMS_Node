const Router = require('@koa/router')

const { create, remove, edit, searchRole, searchRoleList, searchRoleMenuList } = require('../controller/role.controller')
const { checkRoleExistence } = require('../middleware/role.middleware')
const { verifyAuth } = require('../middleware/login.middleware')

const roleRouter = new Router({ prefix: '/role' })
//1.创建角色
roleRouter.post('/', verifyAuth, checkRoleExistence, create)
//2.删除角色
roleRouter.delete('/:id', verifyAuth, remove)
//3.修改角色
roleRouter.patch('/:id', verifyAuth, edit)
//4.查询某个角色
roleRouter.get('/:id', verifyAuth, searchRole)
//5.查询角色列表
roleRouter.post('/list', verifyAuth, searchRoleList)
//6.查询角色菜单树
roleRouter.get('/:id/menu', verifyAuth, searchRoleMenuList)

module.exports = roleRouter
