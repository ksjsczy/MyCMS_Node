const roleService = require('../service/role.service')

class RoleController {
  async create(ctx, next) {
    //1.获取创建角色的信息
    const roleInfo = ctx.request.body

    //2.注册角色
    await roleService.createRole(roleInfo)

    ctx.body = {
      data: '创建角色成功~'
    }
  }

  async remove(ctx, next) {
    //1.获取需要删除的角色id
    const { id } = ctx.params

    //2.删除角色
    await roleService.removeRole(id)

    ctx.body = {
      data: '删除角色成功~'
    }
  }

  async edit(ctx, next) {
    //1.获取需要修改的角色id
    const { id } = ctx.params

    //2.获取修改内容
    const editInfo = ctx.request.body

    //3.修改角色
    await roleService.editRole(id, editInfo)

    ctx.body = {
      data: '修改角色成功~'
    }
  }

  async searchRole(ctx, next) {
    //1.获取需要查找的角色id
    const { id } = ctx.params

    //2.查询角色
    const result = await roleService.searchRole(id)
    ctx.body = {
      data: result
    }
  }

  async searchRoleList(ctx, next) {
    //1.获取查询的offset和limit
    const { offset, size } = ctx.request.body

    //2.查询角色列表
    const listResult = await roleService.searchRoleList(offset, size)
    const totalCount = listResult.length
    ctx.body = {
      data: {
        list: listResult,
        totalCount
      }
    }
  }

  async searchRoleMenuList(ctx, next) {
    //1.获取需要查询的角色id
    const { id } = ctx.params

    //2.查询角色菜单列表
    const menuResult = await roleService.searchRoleMenuList(id)
    ctx.body = {
      data: menuResult
    }
  }
}

module.exports = new RoleController()
