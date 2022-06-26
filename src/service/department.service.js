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

  async searchDepartmentList(requestParams) {
    const searchColumns = ['name', 'leader', 'createAt']
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
    let { name, leader, createAt, offset, size: limit } = requestParams
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

    const statement = `SELECT * FROM department  WHERE name LIKE ? AND leader LIKE ? AND createAt BETWEEN ? AND ? LIMIT ?, ?;`
    const result = await pool.execute(statement, [name, leader, createAt[0], createAt[1], offset + '', limit + ''])

    const statement2 = `SELECT COUNT(*) FROM department  WHERE name LIKE ? AND leader LIKE ? AND createAt BETWEEN ? AND ?;`
    const length = await pool.execute(statement2, [name, leader, createAt[0], createAt[1]])
    result[0].totalCount = length[0].pop()['COUNT(*)']
    return result[0]
  }
}

module.exports = new DepartmentService()