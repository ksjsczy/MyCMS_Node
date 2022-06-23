const departmentService = require('../service/department.service')
const errorTypes = require('../constants/error-types')

const checkDepartmentExistence = async (ctx, next) => {
  //获取部门名称
  const { name } = ctx.request.body
  //通过部门名称去数据库中查询部门
  const departmentResult = await departmentService.getDepartmentByName(name)
  const department = departmentResult[0]
  if (department) {
    //如果查询到了部门，说明部门名已存在
    const error = new Error(errorTypes.DEPARTMENT_ALREADY_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}


module.exports = {
  checkDepartmentExistence
}