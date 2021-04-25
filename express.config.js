const express = require('express')
const bodyParser = require('body-parser')

const cors = require('cors')
require('dotenv').config()

const app = express()


app.use(bodyParser.json())
app.use(cors())


app.use('/', require('./routes/index.route'))
app.use('/account', require('./routes/account.route'))
app.use('/auth', require('./routes/auth.route'))
app.use('/class', require('./routes/class.route'))
app.use('/person', require('./routes/person.route'))
app.use('/post', require('./routes/post.route'))
app.use('/orders', require('./routes/orders.route'))
app.use('/products', require('./routes/products.route'))



module.exports = {
    PORT: process.env.PORT,
    app: app
}
