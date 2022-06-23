const menuService = require('../service/menu.service')
const errorTypes = require('../constants/error-types')

const checkMenuExistence = async (ctx, next) => {
  //获取菜单名称
  const { name } = ctx.request.body
  //通过菜单名称去数据库中查询菜单
  const menuResult = await menuService.getMenuByName(name)
  const menu = menuResult[0]
  if (menu) {
    //如果查询到了菜单，说明菜单名已存在
    const error = new Error(errorTypes.MENU_ALREADY_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}

module.exports = {
  checkMenuExistence
}
