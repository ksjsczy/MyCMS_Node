const pool = require('../app/database')

class LoginService {
  async getUserByName(name) {
    const statement = `SELECT * FROM users WHERE name = ?;`
    const result = await pool.execute(statement, [name])
    return result[0]
  }
}

module.exports = new LoginService()