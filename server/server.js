import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config() // bắt buộc phải có
// const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
app.get("/api", (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree"] });
})

app.listen(PORT, async() => {
    console.log(`Server start at: ${PORT} `)
})