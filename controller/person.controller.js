
const personModel = require('../models/person.model')

const controller = require('./base.controller')

module.exports = class PersonController extends controller {

    constructor() {
        super(personModel.model)
    }

}
