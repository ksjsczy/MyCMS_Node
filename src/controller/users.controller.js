const usersService = require('../service/users.service')

class UsersController {
  async create(ctx, next) {
    //1.获取创建用户的信息
    const userInfo = ctx.request.body

    //2.注册用户
    await usersService.createUser(userInfo)

    ctx.body = {}
    ctx.body.data = '创建用户成功~'
  }

  async remove(ctx, next) {
    //1.获取需要删除的用户id
    const { id } = ctx.params

    //2.删除用户
    await usersService.removeUser(id)

    ctx.body = {}
    ctx.body.data = '删除用户成功~'
  }

  async edit(ctx, next) {
    //1.获取需要修改的用户id
    const { id } = ctx.params

    //2.获取修改内容
    const editInfo = ctx.request.body

    //3.修改用户
    await usersService.editUser(id, editInfo)

    ctx.body = {}
    ctx.body.data = '修改用户成功~'
  }
}

module.exports = new UsersController()