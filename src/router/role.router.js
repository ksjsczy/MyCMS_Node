const Router = require('@koa/router')

const { create, remove, edit, searchRole, searchRoleList, searchRoleMenuList } = require('../controller/role.controller')
const { checkRoleExistence } = require('../middleware/role.middleware')
const { verifyAuth, verifyPermission } = require('../middleware/login.middleware')

const roleRouter = new Router({ prefix: '/role' })
//1.创建角色
roleRouter.post('/', verifyAuth, verifyPermission, checkRoleExistence, create)
//2.删除角色
roleRouter.delete('/:id', verifyAuth, verifyPermission, remove)
//3.修改角色
roleRouter.patch('/:id', verifyAuth, verifyPermission, edit)
//4.查询某个角色
roleRouter.get('/:id', verifyAuth, verifyPermission, searchRole)
//5.查询角色列表
roleRouter.post('/list', verifyAuth, verifyPermission, searchRoleList)
//6.查询角色菜单树
roleRouter.get('/:id/menu', verifyAuth, searchRoleMenuList)

module.exports = roleRouter
