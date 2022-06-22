const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../app/config')
class LoginController {
  async login(ctx, next) {
    //获取用户请求传递的参数
    const { id, name } = ctx.user

    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256'
    })

    //返回数据
    ctx.body = {}
    ctx.body.data = {
      id,
      name,
      token
    }
  }
}

module.exports = new LoginController()