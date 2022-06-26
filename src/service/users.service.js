const pool = require('../app/database')
const md5password = require('../utils/password-handle')
const userColumns = []

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
    const statement = ` SELECT users.id, users.name, users.realname, users.cellphone, users.status, users.createAt, users.updateAt, 
                            JSON_OBJECT('id',role.id,'name',role.name,'intro',role.intro,'createAt',role.createAt,'updateAt',role.updateAt) as role,
                            JSON_OBJECT('id',department.id,'name',department.name,'parentId',department.parentId,'createAt',department.createAt,'updateAt',department.updateAt,'leader',department.leader) as department
                        FROM users LEFT JOIN department ON users.departmentId = department.id 
                                   LEFT JOIN role ON users.roleId = role.id
                        WHERE users.id=?;`
    const result = await pool.execute(statement, [id])
    return result[0][0]
  }

  async searchUserList(requestParams) {
    const searchColumns = ['id', 'name', 'realname', 'cellphone', 'status', 'createAt']
    //处理搜索关键字
    for (const key of searchColumns) {
      if (requestParams[key] !== undefined && requestParams[key] !== null) {
        //如果不是空值
        requestParams[key] = '%' + requestParams[key] + '%'
      } else {
        //如果是空值
        requestParams[key] = '%'
      }
    }
    //拿到请求的参数
    let { id, name, realname, cellphone, status, createAt, offset, size: limit } = requestParams
    if (createAt.length <= 2) {
      //如果没有选择创建的开始和结束时间，手动设置开始和结束时间
      createAt = ['0000-01-01', '9999-01-01']
    } else {
      // 对开始和结束的时间进行处理
      createAt = createAt.replace(/%/g, "").split(',')
    }
    //对offset和limit为空值的处理
    if (!offset) offset = 0
    if (!limit && limit !== 0) limit = 1000

    const statement = `SELECT * FROM users  WHERE id LIKE ? AND name LIKE ? AND realname LIKE ? AND cellphone LIKE ? AND status LIKE ? AND createAt BETWEEN ? AND ? LIMIT ?, ?;`
    const result = await pool.execute(statement, [id, name, realname, cellphone, status, createAt[0], createAt[1], offset + '', limit + ''])

    const statement2 = `SELECT COUNT(*) FROM users  WHERE id LIKE ? AND name LIKE ? AND realname LIKE ? AND cellphone LIKE ? AND status LIKE ? AND createAt BETWEEN ? AND ?;`
    const length = await pool.execute(statement2, [id, name, realname, cellphone, status, createAt[0], createAt[1]])
    result[0].totalCount = length[0].pop()['COUNT(*)']
    return result[0]
  }
}

module.exports = new UsersService()