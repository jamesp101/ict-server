
const router = require('express').Router()
const postController = require('../controller/post.controller')

const post = new postController()
const express_jwt = require('express-jwt')

const ObjectId = require('mongoose').Types.ObjectId

require('dotenv').config()


const jwt = express_jwt({ secret: process.env.SECRET_LEVEL1, algorithms: ['HS256'] })


router.get('/', async (req, res) => {
    const params = req.query
    if ('class' in params) {
        params['class'] = ObjectId(params['class'])
    }
    if ('postedBy' in params) {
        params['postedBy'] = ObjectId(params['postedBy'])
    }
    console.log(params)
    const data = await post.select(
        params,
        {},
        {
            path: 'postedBy',
            select: ['person'],
            populate: {
                path: 'person',
                model: 'Persons',
                select: ['lastname', 'firstname']
            }
        },
    )
    res.json(data)
})

router.get('/search', async (req, res) => {
    const params = req.query

    // TODO: add a search functionality
})


router.get('/:id/comments', async (req, res) => {

    const params = req.params
    const data = await post.select({ _id: params.id },
        {},
        {
            path: 'comments.user',
            model: 'Account',
            select: ['-password', '-createdOn', '-__v'],
            populate: {
                path: 'person',
                model: 'Persons',
                select: ['lastname', 'firstname']
            }

        })
    res.send(data)
})

router.get('/:id', async (req, res) => {

    const params = req.params
    const data = await post.select({ _id: params.id },
        {},
        {
            path: 'comments.user',
            model: 'Account',
            select: [
                'firstname',
                'lastname']
        })
    res.send(data)
})





router.post('/', async (req, res) => {
    // if (req.user.access == 1) { res.send(401).send('Unauthorized Access') }
    const data = req.body
    console.log(data)

    const ins = await post.insert(data)
    res.send(ins)
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const data = req.body
    console.log(req.body)
    try {
        const persons = await post.update({ _id: id }, data)
        res.send(persons)
    } catch{
        res.send(404).send('Not Found')
    }
    res.send(persons)
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        const del = await post.delete(id)
        res.send(200)
    }
    catch{
        res.send(404).send('Not found')
    }
})



module.exports = router
