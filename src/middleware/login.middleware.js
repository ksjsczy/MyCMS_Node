const errorTypes = require('../constants/error-types')
const usersService = require('../service/users.service')
const md5password = require('../utils/password-handle')
const jwt = require('jsonwebtoken')
const { PUBLIC_KEY } = require('../app/config')

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
  ctx.user = user
  await next()
}

const verifyAuth = async (ctx, next) => {
  //1.获取token
  const authorization = ctx.headers.authorization
  if (!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION)
    return ctx.app.emit('error', error, ctx)
  }
  const token = authorization.slice(7)

  //2.验证token，拿到(id/name/iat/exp)
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })
    ctx.user = result;
    await next();
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION)
    return ctx.app.emit('error', error, ctx)
  }
}

module.exports = {
  verifyLogin,
  verifyAuth
}