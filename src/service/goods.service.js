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

  async searchGoodsList(offset, limit) {
    if (!offset && !limit) {
      const statement = `SELECT * FROM goods;`
      const result = await pool.execute(statement, [])
      return result[0]
    } else {
      const statement = `SELECT * FROM goods LIMIT ?, ?;`
      const result = await pool.execute(statement, [offset + '', limit + ''])
      return result[0]
    }
  }

  async getGoodsLength() {
    const statement = `SELECT COUNT(*) FROM goods;`
    const length = await pool.execute(statement, [])
    return length[0].pop()['COUNT(*)']
  }
}

module.exports = new GoodsService()
