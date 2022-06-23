const usersService = require('../service/users.service')

class UsersController {
  async create(ctx, next) {
    //1.获取创建用户的信息
    const userInfo = ctx.request.body

    //2.注册用户
    await usersService.createUser(userInfo)

    ctx.body = {
      data: '创建用户成功~'
    }
  }

  async remove(ctx, next) {
    //1.获取需要删除的用户id
    const { id } = ctx.params

    //2.删除用户
    await usersService.removeUser(id)

    ctx.body = {
      data: '删除用户成功~'
    }
  }

  async edit(ctx, next) {
    //1.获取需要修改的用户id
    const { id } = ctx.params

    //2.获取修改内容
    const editInfo = ctx.request.body

    //3.修改用户
    await usersService.editUser(id, editInfo)

    ctx.body = {
      data: '修改用户成功~'
    }
  }

  async searchUser(ctx, next) {
    //1.获取需要查找的用户id
    const { id } = ctx.params

    //2.查询用户
    const result = await usersService.searchUser(id)
    ctx.body = {
      data: result
    }
  }

  async searchUserList(ctx, next) {
    //1.获取查询的offset和limit
    const { offset, size } = ctx.request.body

    //2.查询用户列表
    const listResult = await usersService.searchUserList(offset, size)
    const totalCount = listResult.length
    ctx.body = {
      data: {
        list: listResult,
        totalCount
      }
    }
  }
}

module.exports = new UsersController()