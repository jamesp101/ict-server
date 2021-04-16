
const router = require('express').Router()
const accountController = require('../controller/account.controller')

const account = new accountController()
const express_jwt = require('express-jwt')


require('dotenv').config()


const jwt = express_jwt({ secret: process.env.SECRET_LEVEL1, algorithms: ['HS256'] })


router.get('/', async (req, res) => {
    const params = req.query
    const data = await account.select(params, {}, {
        path: 'person',
        model: 'Persons'
    })
    res.send(data)
})

router.get('/:id', async (req, res) => {

    const params = req.params
    const data = await account.select({ _id: params.id },
        ['-password'],
        {
            path: 'person',
            model: 'Persons'
        })
    data['password'] = undefined
    res.send(data)
})

router.get('/search/:search', async (req, res) => {
    const params = req.params
    const query = req.query
    const search = `${params.search}`
    console.log(search)
    const data = await account.select(
        query
        ,

        ['-password'],
        {
            path: 'person',
            model: 'Persons',
            match: {
                lastname: { $regex: search, $options: 'i' }
            }
        },
    )
    data['password'] = undefined
    console.log(data)
    res.send(data)

    // TODO: add a search functionality
})


router.post('/', async (req, res) => {
    // if (req.user.access == 1) { res.send(401).send('Unauthorized Access') }
    const data = req.body
    const ins = await account.insert(data)
    res.send(ins)
})

router.put('/:id', async (req, res) => {
    // if (req.user.access == 1) { res.send(401).send('Unauthorized Access') }
    const id = req.params.id
    const data = req.body
    console.log(req.body)
    try {
        const persons = await account.update({ _id: id }, data)
        res.send(persons)
    } catch{
        res.status(404).send('Not Found')
    }
    res.send(persons)
})

router.delete('/:id', jwt, async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        const del = await account.delete(id)
        res.send(200)
    }
    catch{
        res.send(404).send('Not found')
    }
})



module.exports = router
