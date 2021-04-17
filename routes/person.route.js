const router = require('express').Router()
const personController = require('../controller/person.controller')

const person = new personController()
const express_jwt = require('express-jwt')


require('dotenv').config()


const jwt = express_jwt({ secret: process.env.SECRET_LEVEL1, algorithms: ['HS256'] })


router.get('/', async (req, res) => {

    const data = await person.select()
    res.send(data)
})

router.get('/not_activated/', async (req, res) => {
    console.log('i')
    const data = await person.not_activated()
    console.log(data)
    res.send(data)

    // TODO: add a search functionality
})
router.get('/:id', async (req, res) => {
    const params = req.params
    const data = await person.select({ _id: params.id })
    res.send(data)
})

router.get('/search/:search', async (req, res) => {
    const search = req.params?.search
    const data = await person.select({ lastname: { $regex: search, $options: 'i' } })
    res.send(data)

})


router.post('/', async (req, res) => {
    // if (req.user.access <= 2) { res.send(401).send('Unauthorized Access') }
    const data = req.body
    console.log(data)
    try {
        const ins = await person.insert(data)
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
        const persons = await person.update({ _id: id }, data)
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
        const del = await person.delete(id)
        res.send(200)
    }
    catch{
        res.send(404).send('Not found')
    }
})



module.exports = router
