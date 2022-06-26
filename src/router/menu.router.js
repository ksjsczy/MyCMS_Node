const Router = require('@koa/router')

const { create, remove, edit, searchMenu, searchMenuList } = require('../controller/menu.controller')
const { checkMenuExistence } = require('../middleware/menu.middleware')
const { verifyAuth, verifyPermission } = require('../middleware/login.middleware')

const menuRouter = new Router({ prefix: '/menu' })
//1.创建菜单
menuRouter.post('/', verifyAuth, verifyPermission, checkMenuExistence, create)
//2.删除菜单
menuRouter.delete('/:id', verifyAuth, verifyPermission, remove)
//3.修改菜单
menuRouter.patch('/:id', verifyAuth, verifyPermission, edit)
//4.查询某个菜单
menuRouter.get('/:id', verifyAuth, verifyPermission, searchMenu)
//5.查询菜单列表
menuRouter.post('/list', verifyAuth, verifyPermission, searchMenuList)

module.exports = menuRouter
