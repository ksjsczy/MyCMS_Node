const roleService = require('../service/role.service')
const errorTypes = require('../constants/error-types')

const checkRoleExistence = async (ctx, next) => {
  //获取角色名称
  const { name } = ctx.request.body
  //通过角色名称去数据库中查询角色
  const roleResult = await roleService.getRoleByName(name)
  const role = roleResult[0]
  if (role) {
    //如果查询到了角色，说明角色名已存在
    const error = new Error(errorTypes.ROLE_ALREADY_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}

module.exports = {
  checkRoleExistence
}
