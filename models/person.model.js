
const connection = require('../database.config')

const mongoose = connection.getConnection()
const schema = require('mongoose')

const userSchema = new schema.Schema({
    lastname: 'String',
    firstname: 'String',
    birthdate: 'Date',
    gender: 'String',
    address: {
        street: 'String',
        barangay: 'String',
        city: 'String',
        province: 'String'
    },
    createdAt: {
        type: 'Date',
        default: Date.now()
    }
})

const person = mongoose.model('Persons', userSchema)




module.exports = { model: person, schema: userSchema }
