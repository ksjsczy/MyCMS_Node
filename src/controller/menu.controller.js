const menuService = require('../service/menu.service')

class MenuController {
  async create(ctx, next) {
    //1.获取创建菜单的信息
    const menuInfo = ctx.request.body

    //2.注册菜单
    await menuService.createMenu(menuInfo)

    ctx.body = {
      data: '创建菜单成功~'
    }
  }

  async remove(ctx, next) {
    //1.获取需要删除的菜单id
    const { id } = ctx.params

    //2.删除菜单
    await menuService.removeMenu(id)

    ctx.body = {
      data: '删除菜单成功~'
    }
  }

  async edit(ctx, next) {
    //1.获取需要修改的菜单id
    const { id } = ctx.params

    //2.获取修改内容
    const editInfo = ctx.request.body

    //3.修改菜单
    await menuService.editMenu(id, editInfo)

    ctx.body = {
      data: '修改菜单成功~'
    }
  }

  async searchMenu(ctx, next) {
    //1.获取需要查找的菜单id
    const { id } = ctx.params

    //2.查询菜单
    const result = await menuService.searchMenu(id)
    ctx.body = {
      data: result
    }
  }

  async searchMenuList(ctx, next) {
    //1.查询菜单列表
    const listResult = await menuService.searchMenuList()
    ctx.body = {
      data: {
        list: listResult,
      }
    }
  }
}

module.exports = new MenuController()
