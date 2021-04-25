
const connection = require('../database.config')

const mongoose = connection.getConnection()
const schema = require('mongoose')

const classSchema = new schema.Schema({
    productCode: 'String',
    productName: 'String',
    price: 'Number'
})


const Class = mongoose.model('Products', classSchema)

module.exports = { model: Class, schema: classSchema }
