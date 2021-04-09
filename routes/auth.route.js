
const express = require('express')
const accountsController = require('../controller/account.controller')

const accounts = new accountsController()
const jwt = require('jsonwebtoken')
const express_jwt = require('express-jwt')

require('dotenv').config()



const e_jwt = express_jwt({ secret: process.env.SECRET_LEVEL1, algorithms: ['HS256'] })
const router = express.Router()

router.post('/', async (req, res) => {
    const data = req.body

    console.log(req.body)
    //search account from db
    const results = await accounts.select(
        { username: data.username, password: data.password },
        {},
    )

    console.log(results.length)
    // send 404 if username not
    if (results.length < 1) {
        res.json({
            status: 404,
            message: "Username or password not found"
        })
        return
    }
    const result = results[0]
    const token = generateAccessToken(result)
    res.send({
        _id: result.id,
        username: result.username,
        access: result.access,
        token: token
    })
})
router.get('/', e_jwt, async (req, res) => {
    const user = req.user
    console.log(user)
    res.json({ message: user })
})

router.post('/logout', async (req, res) => {
    res.send()
})



function generateAccessToken(data) {
    return jwt.sign(
        {
            id: data._id,
            username: data.username,
            access: data.access
        },
        process.env.SECRET_LEVEL1,
        {
            expiresIn: 60 * 60,
            algorithm: 'HS256'
        })
}


module.exports = router
