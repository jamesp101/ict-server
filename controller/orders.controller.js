const model = require('../models/orders.model')

const controller = require('./base.controller')

module.exports = class extends controller {

    constructor() {
        super(model.model)
    }


    async paginate(options = {}, query = {}, ) {
        const model = this.Model
        console.log(query)
        return await model.paginate(query, options)
    }
    async getOrders(id = {}) {
        const model = this.Model
        return await model.aggregate(
            [
                {
                    '$lookup': {
                        'from': 'accounts',
                        'localField': 'account',
                        'foreignField': '_id',
                        'as': 'account'
                    }
                }, {
                    '$unwind': {
                        'path': '$account',
                        'preserveNullAndEmptyArrays': true
                    }
                }, {
                    '$lookup': {
                        'from': 'persons',
                        'localField': 'account.person',
                        'foreignField': '_id',
                        'as': 'account.person'
                    }
                }, {
                    '$unwind': {
                        'path': '$account.person',
                        'preserveNullAndEmptyArrays': true
                    }
                },
                {
                    '$unwind': {
                        'path': '$productInfo',
                        'preserveNullAndEmptyArrays': true
                    }
                },
                {
                    '$lookup': {
                        'from': 'products',
                        'localField': 'products.productId',
                        'foreignField': '_id',
                        'as': 'productInfo'
                    }
                },
                id
            ]

        )

    }

}
