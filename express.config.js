const express = require('express')
const bodyParser = require('body-parser')

require('dotenv').config()

const app = express()


app.use(bodyParser.json())


app.use('/', require('./routes/index.route'))
app.use('/accont', require('./routes/account.route'))
app.use('/auth', require('./routes/auth.route'))
app.use('/class', require('./routes/class.route'))
app.use('/person', require('./routes/person.route'))
app.use('/post', require('./routes/post.route'))



module.exports = {
    PORT: process.env.PORT,
    app: app
}
