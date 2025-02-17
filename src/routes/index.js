const testRouter = require('./test')
const hopDongRouter = require('./hopDong')

const route = (app) => {
    app.use(`/test`, testRouter)
    app.use(`/hopDong`, hopDongRouter)
}

module.exports = route;