
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
        [{
            path: 'comments.user',
            model: 'Account',
            select: ['person'],
            populate: {
                path: 'person',
                model: 'Persons',
                select: ['lastname', 'firstname']
            }
        },
        {
            path: 'postedBy',
            select: ['person'],
            populate: {
                path: 'person',
                model: 'Persons',
                select: ['lastname', 'firstname']
            }
        },
        ]
    )
    res.json(data)
})
router.get('/:id/comments', async (req, res) => {

    const params = req.params
    const data = await post.getcomment({ _id: params.id },
        ['comments'],
        {
            path: 'comments.user',
            select: ['person', '_id'],
            populate: {
                path: 'person',
                model: 'Persons',
                select: ['lastname', 'firstname']
            }
        })
    res.send(data)
})
router.post('/:id/comments', async (req, res) => {
    // if (req.user.access == 1) { res.send(401).send('Unauthorized Access') }
    const params = req.params
    const body = req.body
    console.log('Body', body)
    try {
        const data = await post.pushComment(params.id, body)
        console.log(data)
        res.status(200).send('Comment added')
    } catch (e) {
        console.log(e)
        res.status(404).send('Cannot add comment')
    }

})
router.put('/:id/comments', async (req, res) => {
    // if (req.user.access == 1) { res.send(401).send('Unauthorized Access') }
    const params = req.params
    const body = req.body
    console.log('Body', body)
    try {
        const data = await post.updateComment(params.id, req.body.commentId, req.body.title)
        console.log(data)
        res.status(200).send('Comment added')
    } catch (e) {
        console.log(e)
        res.status(404).send('Cannot add comment')
    }

})

router.delete('/:id/comments/:commentId', async (req, res) => {
    // if (req.user.access == 1) { res.send(401).send('Unauthorized Access') }
    const params = req.params
    try {
        const data = await post.deleteComment(params.id, params.commentId)
        console.log(data)
        res.status(200).send('Comment delete')
    } catch (e) {
        console.log(e)
        res.status(404).send('Cannot delete comment')
    }
})
router.get('/:id', async (req, res) => {

    const params = req.params
    const data = await post.select({ _id: params.id },
        {},
        {
            path: 'comments.user',
            select: [
                'firstname',
                'lastname']
        })
    res.send(data)
})

router.get('/search', jwt, async (req, res) => {
    const params = req.query

    // TODO: add a search functionality
})


router.post('/', async (req, res) => {
    // if (req.user.access == 1) { res.send(401).send('Unauthorized Access') }
    const data = req.body
    console.log(data)
    const ins = await post.insert(data)
    res.send(ins)
})

router.put('/:id', async (req, res) => {
    // if (req.user.access == 1) { res.send(401).send('Unauthorized Access') }
    const id = req.params.id
    const data = req.body
    console.log(req.body)
    try {
        const persons = await post.update({ _id: id }, data)
        res.status(200).send('Updated.')
    } catch {
        res.status(404).send('Not Found')
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        const del = await post.delete(id)
        res.send(200)
    }
    catch {
        res.status(404).send('Not found')
    }
})



module.exports = router
