const usersService = require('../service/users.service')
const errorTypes = require('../constants/error-types')

const checkUserExistence = async (ctx, next) => {
  //获取用户名
  const { name } = ctx.request.body
  //通过用户名去数据库中查询用户
  const userResult = await usersService.getUserByName(name)
  const user = userResult[0]
  if (user) {
    //如果查询到了用户，说明用户名已存在
    const error = new Error(errorTypes.USERNAME_ALREADY_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}


module.exports = {
  checkUserExistence
}