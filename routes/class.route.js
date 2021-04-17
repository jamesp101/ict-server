
const router = require('express').Router()
const classController = require('../controller/class.controller')

const classes = new classController()

router.get('/', async (req, res) => {
    const params = req.query
    console.log("search params", params)
    const data = await classes.select(params, {},
        [{
            path: 'teacher',
            select: 'person',
            populate: {
                path: 'person',
                model: 'Persons',
                select: ['lastname', 'firstname']
            }
        },
        {

            path: 'students',
            select: 'person',
            populate: {
                path: 'person',
                model: 'Persons',
                select: ['lastname', 'firstname']
            }
        }

        ]
    );

    res.send(data)
})

router.get('/:id', async (req, res) => {
    const params = req.params
    const data = await classes.select(
        { _id: params.id },
        {},
        [{
            path: 'students',
            select: '-password',
            populate: {
                path: 'person',
                model: 'Persons',
            },


        }, {
            path: 'teacher',
            populate: {
                path: 'person',
                model: 'Persons',
            },

        }]
    )
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

router.post('/update_students/:id', async (req, res) => {
    const data = req.body
    const id = req.params.id
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
    } catch (e) {
        res.status(404).send('Not Found')
    }
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
