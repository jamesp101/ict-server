

const accountModel = require('../models/account.model')

const controller = require('./base.controller')

module.exports = class AccountController extends controller {

    constructor() {
        super(accountModel.model)
    }



}
