const categoryService = require('../service/category.service')
const errorTypes = require('../constants/error-types')

const checkCategoryExistence = async (ctx, next) => {
  //获取商品分类名称
  const { name } = ctx.request.body
  //通过商品分类名称去数据库中查询商品分类
  const categoryResult = await categoryService.getCategoryByName(name)
  const category = categoryResult[0]
  if (category) {
    //如果查询到了商品分类，说明商品分类名已存在
    const error = new Error(errorTypes.CATEGORY_ALREADY_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}

module.exports = {
  checkCategoryExistence
}
