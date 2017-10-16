const express = require('express')
const app = express()
const { resolve } = require('path')
require('dotenv').config()
const { PP } = require('./config.js')

const PORT = process.env.PORT || 3005

app.use(express.static('./dist'))

app.all(`${PP}*`, (req, res) => {
    res.sendFile(resolve(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, function () {
    // eslint-disable-next-line no-console
    console.log(`Listening on port ${PORT}...`)
})