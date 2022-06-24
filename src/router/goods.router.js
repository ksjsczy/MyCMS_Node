const Router = require('@koa/router')

const { create, remove, edit, searchGoods, searchGoodsList } = require('../controller/goods.controller')
const { checkGoodsExistence } = require('../middleware/goods.middleware')
const { verifyAuth } = require('../middleware/login.middleware')

const goodsRouter = new Router({ prefix: '/goods' })
//1.创建商品信息
goodsRouter.post('/', verifyAuth, checkGoodsExistence, create)
//2.删除商品信息
goodsRouter.delete('/:id', verifyAuth, remove)
//3.修改商品信息
goodsRouter.patch('/:id', verifyAuth, edit)
//4.查询某个商品信息
goodsRouter.get('/:id', verifyAuth, searchGoods)
//5.查询商品信息列表
goodsRouter.post('/list', verifyAuth, searchGoodsList)

module.exports = goodsRouter
