const express = require('express')
const app = express()
const { resolve } = require('path')
require('dotenv').config()

const PORT = process.env.PORT || 3005

app.use(express.static('./dist'))

app.all('/*', (req, res) => {
    res.sendFile(resolve(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
})
