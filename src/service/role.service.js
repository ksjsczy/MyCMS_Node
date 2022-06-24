const pool = require('../app/database')
const menuService = require('./menu.service')
class RoleService {
  async getRoleByName(name) {
    const statement = `SELECT * FROM role WHERE name = ?;`
    const result = await pool.execute(statement, [name])
    return result[0]
  }

  async createRole(roleInfo) {
    const statement = `INSERT INTO role (name, parentId, leader )
VALUES (?,?,?); `
    const { name, parentId, leader } = roleInfo
    try {
      await pool.execute(statement, [name, parentId, leader])
    } catch (error) {
      console.log(error);
    }
  }

  async removeRole(id) {
    const statement = `DELETE FROM role WHERE id = ?;`
    await pool.execute(statement, [id])
  }

  async editRole(id, editInfo) {
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

  async searchRoleList(offset, limit) {
    let result
    if (!offset || !limit) {
      const statement = `SELECT * FROM role;`
      result = await pool.execute(statement, [])
    } else {
      const statement = `SELECT * FROM role LIMIT ?, ?;`
      result = await pool.execute(statement, [offset + '', limit + ''])
    }
    const roleResult = result[0]
    for (const role of roleResult) {
      role.menuList = await menuService.mapIdToMenu(role.menuList)
    }
    return roleResult
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
