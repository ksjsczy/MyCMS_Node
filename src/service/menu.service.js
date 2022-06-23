const pool = require('../app/database')
class MenuService {
  async getMenuByName(name) {
    const statement = `SELECT * FROM menu WHERE name = ?;`
    const result = await pool.execute(statement, [name])
    return result[0]
  }

  async createMenu(menuInfo) {
    const statement = `INSERT INTO menu (name, type, url, parentId, permission )
VALUES (?,?,?,?,?); `
    const { name, type, url, parentId, permission } = menuInfo
    try {
      await pool.execute(statement, [name, type, url, parentId, permission])
    } catch (error) {
      console.log(error);
    }
  }

  async removeMenu(id) {
    const statement = `DELETE FROM menu WHERE id = ?;`
    await pool.execute(statement, [id])
  }

  async editMenu(id, editInfo) {
    let statement = ''
    for (const key in editInfo) {
      statement = `UPDATE menu SET ${key} = ? WHERE id = ?;`
      await pool.execute(statement, [editInfo[key], id])
    }
  }

  async searchMenu(id) {
    const statement = `SELECT * FROM menu WHERE id = ?;`
    const result = await pool.execute(statement, [id])
    return result[0][0]
  }

  async searchMenuList() {
    const statement = `SELECT * FROM menu;`
    const result = await pool.execute(statement, [])
    return result[0]
  }
}

module.exports = new MenuService()