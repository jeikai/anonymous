import express from 'express'
const {body, validationResult} = require('express-validator')
const router = express.Router()

router.get('/', (req, res) => {
   res.send('Get users') 
})

router.post('/home', (req, res) => {
    const {email, password} = req.body

    res.send('Post login user') 
 })
 router.post('/register', (req, res) => {
    res.send('register') 
 })

 export default router