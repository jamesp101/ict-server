
const postModel = require('../models/post.model')
const controller = require('./base.controller')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class PostController extends controller {

    constructor() {
        super(postModel.model)
    }
    async select(query = {}, field = {}, populate = "") {
        const model = this.Model
        if (populate.length == 0) {
            return model.find(query, field)
        }
        else {
            return model.find(query, field).populate(populate).sort({ 'postedDate': -1 })

        }
    }
    async getcomment(query = {}, field = {}, populate = "") {
        const model = this.Model
        if (populate.length == 0) {
            return model.find(query, field)
        }
        else {
            return model.find(query, field).populate(populate)

        }
    }
    async pushComment(id, data) {
        const model = this.Model
        console.log("ID", id)
        data.user = ObjectId(data?.user)
        return await model.updateOne(
            { _id: id },
            {
                $push: { comments: data }
            },
        )
    }
    async updateComment(postId, commentId, title) {
        console.log(postId, commentId, title)
        const model = this.Model
        return await model.updateOne(
            { "comments._id": commentId },
            {
                $set: {
                    "comments.$.title": title
                }
            }
        )
    }
    async deleteComment(postId, commentId, ) {
        const model = this.Model
        return await model.updateOne(
            { _id: postId },
            {
                $pull: {
                    'comments': { _id: commentId }
                }
            }
        )
    }
    async createComment(postId, commentId, ) {
        const model = this.Model
        return await model.updateOne(
            { _id: postId },
            {
                $pull: {
                    'comments': { _id: commentId }
                }
            }
        )
    }


}
