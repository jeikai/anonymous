import express from 'express'
import * as dotenv from 'dotenv'
import {userRouter} from './routes/index.js'
dotenv.config() // bắt buộc phải có
// const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

//Middelware: Cho phép đọc body của đối tượng request
app.use(express.json)


app.use('/login', userRouter)


app.get("/api", (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree"] });
})

app.listen(PORT, async() => {
    console.log(`Server start at: ${PORT} `)
})