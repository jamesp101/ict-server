
const postModel = require('../models/products.model')
const controller = require('./base.controller')

module.exports = class PostController extends controller {

    constructor() {
        super(postModel.model)
    }

}
