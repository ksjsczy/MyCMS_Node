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
    default:
      status = 404
      body = 'NOT FOUND!'
  }
  ctx.status = status
  ctx.body = body
}

module.exports = errorHandler