
const postModel = require('../models/post.model')
const controller = require('./base.controller')

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

}
