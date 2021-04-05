const connection = require('../database.config')

const mongoose = connection.getConnection()
const schema = require('mongoose')

const classSchema = new schema.Schema({
    teacher: {
        type: schema.Schema.Types.ObjectId,
        ref: 'Person',
    },
    schedule: [],
    students: [],
    yearLevel: 'String',
    schoolYear: 'String',
    semester: 'String',
    section: 'String'
})

const Class = mongoose.model('Class', classSchema)

module.exports = { model: Class, schema: classSchema }
