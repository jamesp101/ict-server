const mongoose = require('mongoose')

require('dotenv').config()

mongoose.connect(process.env.CONNECTION_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })


module.exports = {
    testConnection: () => {
        mongoose.connection.on('error',
            console.error.bind(console, `connection: error`)
        )
        mongoose.connection.once('open', () => {
            console.log(`Database is connected`)
        })
    },
    getConnection: () => mongoose.connection
}
