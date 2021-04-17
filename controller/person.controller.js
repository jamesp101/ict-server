
const personModel = require('../models/person.model')

const controller = require('./base.controller')

module.exports = class PersonController extends controller {

    constructor() {
        super(personModel.model)
    }
    async not_activated() {
        console.log("h")
        return await this.Model.aggregate(
            [{
                $lookup: {
                    from: 'accounts',
                    localField: '_id',
                    foreignField: 'person',
                    as: 'account'
                }
            }, {
                $unwind: {
                    path: '$account',
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $match: {
                    account: null
                }
            }])

    }

}
