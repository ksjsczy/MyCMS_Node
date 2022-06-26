const pool = require('../app/database')
class CategoryService {
  async getCategoryByName(name) {
    const statement = `SELECT * FROM category WHERE name = ?;`
    const result = await pool.execute(statement, [name])
    return result[0]
  }

  async createCategory(categoryInfo) {
    const statement = `INSERT INTO category (name )
VALUES (?); `
    const { name } = categoryInfo
    try {
      await pool.execute(statement, [name])
    } catch (error) {
      console.log(error);
    }
  }

  async removeCategory(id) {
    const statement = `DELETE FROM category WHERE id = ?;`
    await pool.execute(statement, [id])
  }

  async editCategory(id, editInfo) {
    let statement = ''
    for (const key in editInfo) {
      statement = `UPDATE category SET ${key} = ? WHERE id = ?;`
      await pool.execute(statement, [editInfo[key], id])
    }
  }

  async searchCategory(id) {
    const statement = `SELECT * FROM category WHERE id = ?;`
    const result = await pool.execute(statement, [id])
    return result[0][0]
  }

  async searchCategoryList(requestParams) {
    const searchColumns = ['name', 'createAt']
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
    let { name, createAt, offset, size: limit } = requestParams
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

    const statement = `SELECT * FROM category  WHERE name LIKE ? AND createAt BETWEEN ? AND ? LIMIT ?, ?;`
    const result = await pool.execute(statement, [name, createAt[0], createAt[1], offset + '', limit + ''])

    const statement2 = `SELECT COUNT(*) FROM category  WHERE name LIKE ? AND createAt BETWEEN ? AND ?;`
    const length = await pool.execute(statement2, [name, createAt[0], createAt[1]])
    result[0].totalCount = length[0].pop()['COUNT(*)']
    return result[0]
  }
}

module.exports = new CategoryService()
