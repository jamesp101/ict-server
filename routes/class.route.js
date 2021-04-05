
const router = require('express').Router()
const classController = require('../controller/class.controller')

const classes = new classController()

router.get('/', async (req, res) => {

    const data = await classes.select()
    res.send(data)
})

router.get('/:id', async (req, res) => {
    const params = req.params
    const data = await classes.select({ _id: params.id })
    res.send(data)
})

router.get('/search', async (req, res) => {
    const params = req.query

    // TODO: add a search functionality
})


router.post('/', async (req, res) => {
    const data = req.body

    const ins = await classes.insert(data)
    res.send(ins)
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const data = req.body
    console.log(req.body)
    try {
        const persons = await classes.update({ _id: id }, data)
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
        const del = await classes.delete(id)
        res.send(200)
    }
    catch{
        res.send(404).send('Not found')
    }
})



module.exports = router
