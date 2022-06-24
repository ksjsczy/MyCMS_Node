const goodsService = require('../service/goods.service')
const errorTypes = require('../constants/error-types')

const checkGoodsExistence = async (ctx, next) => {
  //获取商品信息名称
  const { name } = ctx.request.body
  //通过商品信息名称去数据库中查询商品信息
  const goodsResult = await goodsService.getGoodsByName(name)
  const goods = goodsResult[0]
  if (goods) {
    //如果查询到了商品信息，说明商品信息名已存在
    const error = new Error(errorTypes.GOODS_ALREADY_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}

module.exports = {
  checkGoodsExistence
}
