const Router = require('@koa/router')

const { create, remove, edit, searchGoods, searchGoodsList } = require('../controller/goods.controller')
const { checkGoodsExistence } = require('../middleware/goods.middleware')
const { verifyAuth, verifyPermission } = require('../middleware/login.middleware')

const goodsRouter = new Router({ prefix: '/goods' })
//1.创建商品信息
goodsRouter.post('/', verifyAuth, verifyPermission, checkGoodsExistence, create)
//2.删除商品信息
goodsRouter.delete('/:id', verifyAuth, verifyPermission, remove)
//3.修改商品信息
goodsRouter.patch('/:id', verifyAuth, verifyPermission, edit)
//4.查询某个商品信息
goodsRouter.get('/:id', verifyAuth, verifyPermission, searchGoods)
//5.查询商品信息列表
goodsRouter.post('/list', verifyAuth, verifyPermission, searchGoodsList)

module.exports = goodsRouter
