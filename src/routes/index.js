const hopDongTikluyRouter = require('./hopDongTikluy')

const route = (app) => {
    app.use(`/hopDongTikLuy`, hopDongTikluyRouter)
}

module.exports = route;