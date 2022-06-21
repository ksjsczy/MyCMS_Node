const errorTypes = require('../constants/error-types')
const usersService = require('../service/users.service')
const md5password = require('../utils/password-handle')

const verifyLogin = async (ctx, next) => {
  //获取登陆时的用户名和密码
  const { name, password } = ctx.request.body

  //判断用户名和密码是否为空（这些在前端已经实现）

  //判断用户名是否存在
  const userResult = await usersService.getUserByName(name)
  const user = userResult[0]
  if (!user) {
    //如果用户不存在
    const error = new Error(errorTypes.USERNAME_DOES_NOT_EXIST)
    return ctx.app.emit('error', error, ctx)
  }

  //判断密码是否正确
  if (md5password(password) !== user.password) {
    //如果密码不正确
    const error = new Error(errorTypes.USERNAME_OR_PASSWORD_IS_WRONG)
    return ctx.app.emit('error', error, ctx)
  }

  //用户名和密码校验通过
  await next()
}

module.exports = {
  verifyLogin
}