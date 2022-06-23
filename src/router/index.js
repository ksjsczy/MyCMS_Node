const useRouter = (app) => {
  const fs = require('fs')
  fs.readdirSync(__dirname).forEach(file => {
    if (file !== 'index.js') {
      const router = require('./' + file)
      app.use(router.routes())
      app.use(router.allowedMethods())
    }
  })
}

module.exports = useRouter

