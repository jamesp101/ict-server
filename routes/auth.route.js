
const express = require('express')
const accountsController = require('../controller/account.controller')

const accounts = new accountsController()
const jwt = require('jsonwebtoken')

require('dotenv').config()



const router = express.Router()
router.post('/login', async (req, res) => {
    const data = req.body

    console.log(data)
    //search account from db
    const results = await accounts.select(
        { username: data.username, password: data.password }
    )

    console.log(results)

    // send 404 if username not
    if (results == null || results == undefined || results == {}) {
        res.send(404).send('Username or password not found')
    }
    const token = generateAccessToken(results[0])
    res.send(token)
})

router.post('/logout', async (req, res) => {
    res.send()
})



function generateAccessToken(data) {
    return jwt.sign(
        {
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
