
const router = require('express').Router()
const accountController = require('../controller/class.controller')

const account = new accountController()
const express_jwt = require('express-jwt')


require('dotenv').config()


const jwt = express_jwt({ secret: process.env.SECRET_LEVEL1, algorithms: ['HS256'] })


router.get('/', jwt, async (req, res) => {

    const data = await account.select()
    res.send(data)
})

router.get('/:id', jwt, async (req, res) => {

    const params = req.params
    const data = await account.select({ _id: params.id })
    res.send(data)
})

router.get('/search', jwt, async (req, res) => {
    const params = req.query

    // TODO: add a search functionality
})


router.post('/', jwt, async (req, res) => {
    if (req.user.access == 1) { res.send(401).send('Unauthorized Access') }
    const data = req.body
    const ins = await account.insert(data)
    res.send(ins)
})

router.put('/:id', jwt, async (req, res) => {
    if (req.user.access == 1) { res.send(401).send('Unauthorized Access') }
    const id = req.params.id
    const data = req.body
    console.log(req.body)
    try {
        const persons = await account.update({ _id: id }, data)
        res.send(persons)
    } catch{
        res.send(404).send('Not Found')
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
