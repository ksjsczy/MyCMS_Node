const pool = require('../app/database')
const menuService = require('./menu.service')
class RoleService {
  async getRoleByName(name) {
    const statement = `SELECT * FROM role WHERE name = ?;`
    const result = await pool.execute(statement, [name])
    return result[0]
  }

  async createRole(roleInfo) {
    const statement = `INSERT INTO role (name, intro, menuList )
                                  VALUES (?,?,?); `
    const { name, intro, menuList } = roleInfo
    try {
      await pool.execute(statement, [name, intro, menuList.join(',')])
    } catch (error) {
      console.log(error);
    }
  }

  async removeRole(id) {
    const statement = `DELETE FROM role WHERE id = ?;`
    await pool.execute(statement, [id])
  }

  async editRole(id, editInfo) {
    editInfo.menuList = editInfo.menuList.join(',')
    let statement = ''
    for (const key in editInfo) {
      statement = `UPDATE role SET ${key} = ? WHERE id = ?;`
      await pool.execute(statement, [editInfo[key], id])
    }
  }

  async searchRole(id) {
    const statement = `SELECT * FROM role WHERE id = ?;`
    const result = await pool.execute(statement, [id])
    return result[0][0]
  }

  async searchRoleList(requestParams) {
    const searchColumns = ['name', 'intro', 'createAt']
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
    let { name, intro, createAt, offset, size: limit } = requestParams
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

    const statement = `SELECT * FROM role  WHERE name LIKE ? AND intro LIKE ? AND createAt BETWEEN ? AND ? LIMIT ?, ?;`
    const result = await pool.execute(statement, [name, intro, createAt[0], createAt[1], offset + '', limit + ''])

    const roleResult = result[0]
    for (const role of roleResult) {
      role.menuList = await menuService.mapIdToMenu(role.menuList)
    }

    const statement2 = `SELECT * FROM role  WHERE name LIKE ? AND intro LIKE ? AND createAt BETWEEN ? AND ?;`
    const length = await pool.execute(statement2, [name, intro, createAt[0], createAt[1]])
    roleResult.totalCount = length[0].pop()['COUNT(*)']
    return roleResult
  }

  async searchRoleMenuListIds(id) {
    const result = await this.searchRole(id)
    return result.menuList
  }

  async searchRoleMenuList(id) {
    const result = await this.searchRole(id)
    const menuList = result.menuList
    const menuListResult = await menuService.mapIdToMenu(menuList)
    return menuListResult
  }

  async getRoleLength() {
    const statement = `SELECT COUNT(*) FROM role;`
    const length = await pool.execute(statement, [])
    return length[0].pop()['COUNT(*)']
  }
}

module.exports = new RoleService()
