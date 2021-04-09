

const connection = require('../database.config')

const mongoose = connection.getConnection()
const schema = require('mongoose')



const postSchema = new schema.Schema({
    title: 'String',
    attachments: [],
    postType: 'String',
    class: {
        type: schema.Schema.Types.ObjectId,
        ref: 'Class'
    },
    comments: [{
        user: {
            type: schema.Schema.Types.ObjectId,
            ref: 'Account'
        },
        description: 'String',
        commentDate: { type: 'Date', default: Date.now }
    }],
    postedBy:
    {
        type: schema.Schema.Types.ObjectId,
        ref: 'Account'

    },
    postedDate: { type: 'Date', default: Date.now }
})



const Post = mongoose.model('Post', postSchema)
module.exports = { model: Post, schema: postSchema }
