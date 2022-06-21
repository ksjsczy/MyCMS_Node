const usersService = require('../service/users.service')

class LoginController {
  async login(ctx, next) {
    //获取用户请求传递的参数
    // const { name, password } = ctx.request.body

    //查询数据


    //返回数据
    ctx.body = ctx.request.body
  }
}

module.exports = new LoginController()