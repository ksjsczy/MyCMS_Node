const pool = require('../app/database')
class DepartmentService {
  async getDepartmentByName(name) {
    const statement = `SELECT * FROM department WHERE name = ?;`
    const result = await pool.execute(statement, [name])
    return result[0]
  }

  async createDepartment(departmentInfo) {
    const statement = `INSERT INTO department (name, parentId, leader )
                                  VALUES (?,?,?);		`
    const { name, parentId, leader } = departmentInfo
    try {
      await pool.execute(statement, [name, parentId, leader])
    } catch (error) {
      console.log(error);
    }
  }

  async removeDepartment(id) {
    const statement = `DELETE FROM department WHERE id = ?;`
    await pool.execute(statement, [id])
  }

  async editDepartment(id, editInfo) {
    let statement = ''
    for (const key in editInfo) {
      statement = `UPDATE department SET ${key} = ? WHERE id = ?;`
      await pool.execute(statement, [editInfo[key], id])
    }
  }

  async searchDepartment(id) {
    const statement = `SELECT * FROM department WHERE id = ?;`
    const result = await pool.execute(statement, [id])
    return result[0][0]
  }

  async searchDepartmentList(offset, limit) {
    if (!offset || !limit) {
      const statement = `SELECT * FROM department;`
      const result = await pool.execute(statement, [])
      return result[0]
    } else {
      const statement = `SELECT * FROM department LIMIT ?, ?;`
      const result = await pool.execute(statement, [offset + '', limit + ''])
      return result[0]
    }
  }

  async getDepartmentLength() {
    const statement = `SELECT COUNT(*) FROM department;`
    const length = await pool.execute(statement, [])
    return length[0].pop()['COUNT(*)']
  }
}

module.exports = new DepartmentService()