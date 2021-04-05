
const connection = require('../database.config')

const mongoose = connection.getConnection()
const schema = require('mongoose')



const advisorySchema = new schema.Schema({
    teacher: {
        type: schema.Schema.Types.ObjectId,
        ref: 'Person'
    },
    students: [{
        type: schema.Schema.Types.ObjectId,
        ref: 'Person'
    }],
    schoolYear: 'String',
    semester: 'String'
})



const Advisory = mongoose.model('Advisory', advisorySchema)
module.exports = { model: Advisory, schema: advisorySchema }
