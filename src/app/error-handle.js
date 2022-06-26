const errorTypes = require('../constants/error-types')
const errorHandler = (error, ctx) => {
  let status = 200
  let body = ''
  switch (error.message) {
    case errorTypes.USERNAME_OR_PASSWORD_IS_WRONG:
      status = 404
      body = '用户名或密码错误'
      break
    case errorTypes.USERNAME_DOES_NOT_EXIST:
      status = 404
      body = '用户名不存在'
      break
    case errorTypes.UNAUTHORIZATION:
      status = 404
      body = '无效的token'
      break
    case errorTypes.USERNAME_ALREADY_EXISTS:
      status = 404
      body = '用户名已存在'
      break
    case errorTypes.DEPARTMENT_ALREADY_EXISTS:
      status = 404
      body = '部门已存在'
      break
    case errorTypes.MENU_ALREADY_EXISTS:
      status = 404
      body = '菜单已存在'
      break
    case errorTypes.ROLE_ALREADY_EXISTS:
      status = 404
      body = '角色已存在'
      break
    case errorTypes.GOODS_ALREADY_EXISTS:
      status = 404
      body = '商品信息已存在'
      break
    case errorTypes.CATEGORY_ALREADY_EXISTS:
      status = 404
      body = '商品分类已存在'
      break
    case errorTypes.NO_PERMISSION:
      status = 404
      body = '没有权限'
      break
    default:
      status = 404
      body = 'NOT FOUND!'
  }
  ctx.status = status
  ctx.body = body
}

module.exports = errorHandler