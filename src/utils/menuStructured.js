const menuStructured = (menu) => {
  const structuredMenu = []
  let parent, grandParent
  menu.forEach(item => {
    switch (item.type) {
      case 1:
        structuredMenu.push(item)
        break
      case 2:
        grandParent = structuredMenu[structuredMenu.length - 1]
        if (!grandParent.children) grandParent.children = []
        grandParent.children.push(item)
        break
      case 3:
        parent = grandParent.children[grandParent.children.length - 1]
        if (!parent.children) parent.children = []
        parent.children.push(item)
        break
    }
  })
  return structuredMenu
}

module.exports = menuStructured