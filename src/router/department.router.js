const Router = require('@koa/router')

const { create, remove, edit, searchDepartment, searchDepartmentList } = require('../controller/department.controller')
const { checkDepartmentExistence } = require('../middleware/department.middleware')
const { verifyAuth, verifyPermission } = require('../middleware/login.middleware')

const departmentRouter = new Router({ prefix: '/department' })
//1.创建部门
departmentRouter.post('/', verifyAuth, verifyPermission, checkDepartmentExistence, create)
//2.删除部门
departmentRouter.delete('/:id', verifyAuth, verifyPermission, remove)
//3.修改部门
departmentRouter.patch('/:id', verifyAuth, verifyPermission, edit)
//4.查询某个部门
departmentRouter.get('/:id', verifyAuth, verifyPermission, searchDepartment)
//5.查询部门列表
departmentRouter.post('/list', verifyAuth, verifyPermission, searchDepartmentList)

module.exports = departmentRouter