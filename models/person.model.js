
const connection = require('../database.config')

const mongoose = connection.getConnection()
const schema = require('mongoose')

const userSchema = new schema.Schema({
    lastname: 'String',
    firstname: 'String',
    birthdate: 'Date',
    gender: 'String',
    address: {
        street:
        {
            type: 'String',
            default: ""
        },
        barangay:
        {
            type: 'String',
            default: ""
        },
        city:
        {
            type: 'String',
            default: ""
        },
        province:
        {
            type: 'String',
            default: ""
        },
    },
    createdAt: {
        type: 'Date',
        default: Date.now()
    }
})

const person = mongoose.model('Persons', userSchema)




module.exports = { model: person, schema: userSchema }
