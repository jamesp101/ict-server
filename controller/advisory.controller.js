

const model = require('../models/advisory.model')

const controller = require('./base.controller')

module.exports = class extends controller {

    constructor() {
        super(model.model)
    }

}
