const router = require('express').Router()


router.get('/', (req, res) => {
    res.json({
        orders: 'orders',
        account: '/account',
        auth: '/auth',
        class: '/class',
        person: '/person',
        post: '/route',
        user: '/user',
    })
})

router.post('/', (req, res) => {
})


module.exports = router
