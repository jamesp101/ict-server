

const connection = require('../database.config')

const mongoose = connection.getConnection()
const schema = require('mongoose')



const accountSchema = new schema.Schema({
    person: {
        type: schema.Schema.Types.ObjectId,
        ref: 'Person'
    },
    username: 'String',
    password: 'String',
    accountType: 'String',
    createdOn: { type: 'Date', default: Date.now },
    access: {
        type: 'String'
    },
    contact: {
        phone: 'String',
        telephone: 'String',
        email: 'String'
    }
})



const Account = mongoose.model('Account', accountSchema)

module.exports = { model: Account, schema: accountSchema }
