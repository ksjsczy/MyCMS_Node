const categoryService = require('../service/category.service')

class CategoryController {
  async create(ctx, next) {
    //1.获取创建商品分类的信息
    const categoryInfo = ctx.request.body

    //2.注册商品分类
    await categoryService.createCategory(categoryInfo)

    ctx.body = {
      data: '创建商品分类成功~'
    }
  }

  async remove(ctx, next) {
    //1.获取需要删除的商品分类id
    const { id } = ctx.params

    //2.删除商品分类
    await categoryService.removeCategory(id)

    ctx.body = {
      data: '删除商品分类成功~'
    }
  }

  async edit(ctx, next) {
    //1.获取需要修改的商品分类id
    const { id } = ctx.params

    //2.获取修改内容
    const editInfo = ctx.request.body

    //3.修改商品分类
    await categoryService.editCategory(id, editInfo)

    ctx.body = {
      data: '修改商品分类成功~'
    }
  }

  async searchCategory(ctx, next) {
    //1.获取需要查找的商品分类id
    const { id } = ctx.params

    //2.查询商品分类
    const result = await categoryService.searchCategory(id)
    ctx.body = {
      data: result
    }
  }

  async searchCategoryList(ctx, next) {
    //1.获取查询的offset和limit
    // const { offset, size } = ctx.request.body

    //2.查询商品分类列表
    const listResult = await categoryService.searchCategoryList(ctx.request.body)
    const { totalCount } = listResult
    ctx.body = {
      data: {
        list: listResult,
        totalCount
      }
    }
  }
}

module.exports = new CategoryController()
