
const router = require('express').Router()
const orderController = require('../controller/orders.controller')

const order = new orderController()
const express_jwt = require('express-jwt')
const ObjectId = require('mongoose').Types.ObjectId


require('dotenv').config()


const jwt = express_jwt({ secret: process.env.SECRET_LEVEL1, algorithms: ['HS256'] })


router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const option = {
        page: page,
        limit: limit,
        sort: '-_id'
    }
    console.table(req.query)
    const data = await order.paginate(options = option)
    res.send(data)
})

router.get('/account/:id', async (req, res) => {
    const params = req.params


    const match = {
        '$match': {
            'account._id': ObjectId(params.id)

        }
    }
    const data = await order.getOrders(match)
    res.send(data)

})

router.get('/:id', async (req, res) => {
    const params = req.params


    const match = {
        '$match': {
            '_id': ObjectId(params.id)
        }
    }
    const data = await order.getOrders(match)
    res.send(data)
})

router.get('/search/:search', async (req, res) => {
    const search = req.params?.search
    const data = await order.select({ lastname: { $regex: search, $options: 'i' } })
    res.send(data)

})


router.post('/', async (req, res) => {
    // if (req.user.access <= 2) { res.send(401).send('Unauthorized Access') }
    const data = req.body
    try {
        data.account = ObjectId(data.account)

        data.products.forEach(it => {
            it.productId = ObjectId(it.productId)
        })
    } catch{

    }
    console.log(data)
    try {
        const ins = await order.insert(data)
        res.send(ins)
    } catch{
        res.statusCode(400)

    }

})

router.put('/:id', jwt, async (req, res) => {
    if (req.user.access <= 2) { res.sendStatus(401).send('Unauthorized Access') }
    const id = req.params.id
    const data = req.body
    console.log(req.body)
    try {
        const persons = await order.update({ _id: id }, data)
        res.send(persons)
    } catch{
        res.sendStatus(404).send('Not Found')
    }
    res.send(persons)
})

router.delete('/:id', jwt, async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        const del = await order.delete(id)
        res.send(200)
    }
    catch{
        res.send(404).send('Not found')
    }
})



module.exports = router
