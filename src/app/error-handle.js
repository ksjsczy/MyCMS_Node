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
    default:
      status = 404
      body = 'NOT FOUND!'
  }
  ctx.status = status
  ctx.body = body
}

module.exports = errorHandler