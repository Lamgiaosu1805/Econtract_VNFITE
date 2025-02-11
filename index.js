const express = require('express')
const app = express()
const route = require('./src/routes')
const morgan = require('morgan')
const dotenv = require('dotenv');

dotenv.config();

//use middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

//routing
route(app);

const port = process.env.PORT

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})