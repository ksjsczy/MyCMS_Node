const goodsService = require('../service/goods.service')

class GoodsController {
  async create(ctx, next) {
    //1.获取创建商品信息的信息
    const goodsInfo = ctx.request.body

    //2.注册商品信息
    await goodsService.createGoods(goodsInfo)

    ctx.body = {
      data: '创建商品信息成功~'
    }
  }

  async remove(ctx, next) {
    //1.获取需要删除的商品信息id
    const { id } = ctx.params

    //2.删除商品信息
    await goodsService.removeGoods(id)

    ctx.body = {
      data: '删除商品信息成功~'
    }
  }

  async edit(ctx, next) {
    //1.获取需要修改的商品信息id
    const { id } = ctx.params

    //2.获取修改内容
    const editInfo = ctx.request.body

    //3.修改商品信息
    await goodsService.editGoods(id, editInfo)

    ctx.body = {
      data: '修改商品信息成功~'
    }
  }

  async searchGoods(ctx, next) {
    //1.获取需要查找的商品信息id
    const { id } = ctx.params

    //2.查询商品信息
    const result = await goodsService.searchGoods(id)
    ctx.body = {
      data: result
    }
  }

  async searchGoodsList(ctx, next) {
    //1.获取查询的offset和limit
    // const { offset, size } = ctx.request.body

    //2.查询商品信息列表
    const listResult = await goodsService.searchGoodsList(ctx.request.body)
    const { totalCount } = listResult
    ctx.body = {
      data: {
        list: listResult,
        totalCount
      }
    }
  }
}

module.exports = new GoodsController()
