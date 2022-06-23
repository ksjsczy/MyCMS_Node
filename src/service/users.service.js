const pool = require('../app/database')
const md5password = require('../utils/password-handle')
class UsersService {
  async getUserByName(name) {
    const statement = `SELECT * FROM users WHERE name = ?;`
    const result = await pool.execute(statement, [name])
    return result[0]
  }

  async createUser(userInfo) {
    const statement = `INSERT INTO users (name, realname, cellphone, departmentId, roleId, password )
                                  VALUES (?,?,?,?,?,?);		`
    const { name, realname, cellphone, departmentId, roleId, password } = userInfo
    await pool.execute(statement, [name, realname, cellphone, departmentId, roleId, md5password(password)])
  }

  async removeUser(id) {
    const statement = `DELETE FROM users WHERE id = ?;`
    await pool.execute(statement, [id])
  }

  async editUser(id, editInfo) {
    let statement = ''
    for (const key in editInfo) {
      statement = `UPDATE users SET ${key} = ? WHERE id = ?;`
      await pool.execute(statement, [key !== 'password' ? editInfo[key] : md5password(editInfo[key]), id])
    }
  }

  async searchUser(id) {
    const statement = `SELECT * FROM users WHERE id = ?;`
    const result = await pool.execute(statement, [id])
    return result[0][0]
  }

  async searchUserList(offset, limit) {
    const statement = `SELECT * FROM users LIMIT ?, ?;`
    const result = await pool.execute(statement, [offset + '', limit + ''])
    return result[0]
  }
}

module.exports = new UsersService()