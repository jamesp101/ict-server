const connection = require('../database.config')

const mongoose = connection.getConnection()
const schema = require('mongoose')

const classSchema = new schema.Schema({
    teacher: {
        type: schema.Schema.Types.ObjectId,
        ref: 'Account',
    },
    schedule: [],
    students: [{
        type: schema.Schema.Types.ObjectId,
        ref: 'Account'
    }],
    yearLevel: 'String',
    schoolYear: 'String',
    semester: 'String',
    section: 'String',
    subject: 'String'
})

const Class = mongoose.model('Class', classSchema)

module.exports = { model: Class, schema: classSchema }
