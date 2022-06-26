const Router = require('@koa/router')

const { create, remove, edit, searchCategory, searchCategoryList } = require('../controller/category.controller')
const { checkCategoryExistence } = require('../middleware/category.middleware')
const { verifyAuth, verifyPermission } = require('../middleware/login.middleware')

const categoryRouter = new Router({ prefix: '/category' })
//1.创建商品分类
categoryRouter.post('/', verifyAuth, verifyPermission, checkCategoryExistence, create)
//2.删除商品分类
categoryRouter.delete('/:id', verifyAuth, verifyPermission, remove)
//3.修改商品分类
categoryRouter.patch('/:id', verifyAuth, verifyPermission, edit)
//4.查询某个商品分类
categoryRouter.get('/:id', verifyAuth, verifyPermission, searchCategory)
//5.查询商品分类列表
categoryRouter.post('/list', verifyAuth, verifyPermission, searchCategoryList)

module.exports = categoryRouter
