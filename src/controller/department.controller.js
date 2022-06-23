const departmentService = require('../service/department.service')

class DepartmentController {
  async create(ctx, next) {
    //1.获取创建部门的信息
    const departmentInfo = ctx.request.body

    //2.注册部门
    await departmentService.createDepartment(departmentInfo)

    ctx.body = {
      data: '创建部门成功~'
    }
  }

  async remove(ctx, next) {
    //1.获取需要删除的部门id
    const { id } = ctx.params

    //2.删除部门
    await departmentService.removeDepartment(id)

    ctx.body = {
      data: '删除部门成功~'
    }
  }

  async edit(ctx, next) {
    //1.获取需要修改的部门id
    const { id } = ctx.params

    //2.获取修改内容
    const editInfo = ctx.request.body

    //3.修改部门
    await departmentService.editDepartment(id, editInfo)

    ctx.body = {
      data: '修改部门成功~'
    }
  }

  async searchDepartment(ctx, next) {
    //1.获取需要查找的部门id
    const { id } = ctx.params

    //2.查询部门
    const result = await departmentService.searchDepartment(id)
    ctx.body = {
      data: result
    }
  }

  async searchDepartmentList(ctx, next) {
    //1.获取查询的offset和limit
    const { offset, size } = ctx.request.body

    //2.查询部门列表
    const listResult = await departmentService.searchDepartmentList(offset, size)
    const totalCount = listResult.length
    ctx.body = {
      data: {
        list: listResult,
        totalCount
      }
    }
  }
}

module.exports = new DepartmentController()