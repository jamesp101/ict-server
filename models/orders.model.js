const connection = require('../database.config')

const mongoose = connection.getConnection()
const schema = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')


const orderSchema = new schema.Schema({
    order: 'String',
    orderDate: { type: 'String' },
    deliveryDate: { type: 'String', },
    newOrderDate: {
        type: 'Date',
        default: Date.now()
    },
    newDeliverDate: {
        type: 'Date',
        default: Date.now
    },
    customer: 'String',
    routeName: 'String',
    routeCode: 'String',
    netAmount: 'String',
    total: 'Number',
    status: 'String',
    account: {
        type: schema.Schema.Types.ObjectId,
        ref: 'Account'
    },
    products: [{
        productId: {
            type: schema.Schema.Types.ObjectId,
            ref: 'Account'
        },
        qty: 'Number'

    }]



})

orderSchema.plugin(mongoosePaginate)

const person = mongoose.model('Order', orderSchema)

module.exports = { model: person, schema: orderSchema }
