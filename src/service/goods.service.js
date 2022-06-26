const pool = require('../app/database')
class GoodsService {
  async getGoodsByName(name) {
    const statement = `SELECT * FROM goods WHERE name = ?;`
    const result = await pool.execute(statement, [name])
    return result[0]
  }

  async createGoods(goodsInfo) {
    const statement = `INSERT INTO goods (name,oldPrice,newPrice,imgUrl,status)
VALUES (?,?,?,?,?); `
    const { name, oldPrice, newPrice, imgUrl, status } = goodsInfo
    try {
      await pool.execute(statement, [name, oldPrice, newPrice, imgUrl, status])
    } catch (error) {
      console.log(error);
    }
  }

  async removeGoods(id) {
    const statement = `DELETE FROM goods WHERE id = ?;`
    await pool.execute(statement, [id])
  }

  async editGoods(id, editInfo) {
    let statement = ''
    for (const key in editInfo) {
      statement = `UPDATE goods SET ${key} = ? WHERE id = ?;`
      await pool.execute(statement, [editInfo[key], id])
    }
  }

  async searchGoods(id) {
    const statement = `SELECT * FROM goods WHERE id = ?;`
    const result = await pool.execute(statement, [id])
    return result[0][0]
  }

  async searchGoodsList(requestParams) {
    const searchColumns = ['name', 'imgUrl', 'status', 'createAt']
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
    // console.log(requestParams);
    //拿到请求的参数
    let { name, imgUrl, status, createAt, offset, size: limit } = requestParams
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
    console.log(requestParams);
    const statement = `SELECT * FROM goods WHERE name LIKE ? AND imgUrl LIKE ? AND status LIKE ? AND createAt BETWEEN ? AND ? LIMIT ?, ?;`
    const result = await pool.execute(statement, [name, imgUrl, status, createAt[0], createAt[1], offset + '', limit + ''])

    const statement2 = `SELECT COUNT(*) FROM goods WHERE name LIKE ? AND imgUrl LIKE ? AND status LIKE ? AND createAt BETWEEN ? AND ?;`
    const length = await pool.execute(statement2, [name, imgUrl, status, createAt[0], createAt[1]])
    result[0].totalCount = length[0].pop()['COUNT(*)']
    return result[0]
  }
}

module.exports = new GoodsService()
