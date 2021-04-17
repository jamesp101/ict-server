

const accountModel = require('../models/account.model')

const controller = require('./base.controller')

module.exports = class AccountController extends controller {

    constructor() {
        super(accountModel.model)
    }

    async search(lastname) {
        return await this.Model.aggregate(
            [{
                $lookup: {
                    from: 'persons',
                    localField: 'person',
                    foreignField: '_id',
                    as: 'person'
                }
            }, {
                $unwind: {
                    path: "$person",

                }
            }, {
                $match: {
                    "person.lastname": { $regex: lastname, $options: 'i' }
                }
            }]
        )
    }


}
