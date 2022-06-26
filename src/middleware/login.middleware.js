const errorTypes = require('../constants/error-types')
const usersService = require('../service/users.service')
const menuService = require('../service/menu.service')
const md5password = require('../utils/password-handle')
const jwt = require('jsonwebtoken')
const { PUBLIC_KEY } = require('../app/config')
const roleService = require('../service/role.service')

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

const verifyPermission = async (ctx, next) => {
  //保存用户id
  const { roleId } = ctx.user

  //获取所有的权限列表，并从中查找所发出的http请求对应的权限
  const permissions = await menuService.getMenuPermissions()
  let item
  const str = ctx.request.method + ctx.request.url
  for (item of permissions) {
    const patt = new RegExp(item.permissions)
    if (str.match(patt) !== null) {
      break
    }
  }
  // //找到发出的http请求所对应的权限，查找role中的menuList，看是否有对应的权限
  const menuList = await roleService.searchRoleMenuListIds(roleId)
  // console.log(menuList, item.id);
  if (menuList.split(',').includes(item.id + '')) {
    //如果找到了对应权限.
    await next()
  } else {
    //如果没找到对应权限，说明所登陆的用户没有该权限
    const error = new Error(errorTypes.NO_PERMISSION)
    ctx.app.emit('error', error, ctx)
  }
}
module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
}