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
    const statement = ` SELECT users.id, users.name, users.realname, users.cellphone, users.enable, users.createAt, users.updateAt, 
                            JSON_OBJECT('id',role.id,'name',role.name,'intro',role.intro,'createAt',role.createAt,'updateAt',role.updateAt) as role,
                            JSON_OBJECT('id',department.id,'name',department.name,'parentId',department.parentId,'createAt',department.createAt,'updateAt',department.updateAt,'leader',department.leader) as department
                        FROM users LEFT JOIN department ON users.departmentId = department.id 
                                   LEFT JOIN role ON users.roleId = role.id
                        WHERE users.id=1;`
    const result = await pool.execute(statement, [id])
    return result[0][0]
  }

  async searchUserList(offset, limit) {
    if (!offset || !limit) {
      const statement = `SELECT * FROM users;`
      const result = await pool.execute(statement, [])
      return result[0]
    } else {
      const statement = `SELECT * FROM users LIMIT ?, ?;`
      const result = await pool.execute(statement, [offset + '', limit + ''])
      return result[0]
    }
  }

  async getUsersLength() {
    const statement = `SELECT COUNT(*) FROM users;`
    const length = await pool.execute(statement, [])
    return length[0].pop()['COUNT(*)']
  }
}

module.exports = new UsersService()