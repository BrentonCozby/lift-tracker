import express from 'express'
import bodyParser from 'body-parser'
import { resolve } from 'path'
import routes from './routes.js'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static(resolve(__dirname, '..', 'dist', 'client')))

app.use('/', routes)

app.get('*', (req, res) => {
    res.send(`No route handler for ${req.method}: ${req.originalUrl}`)
})

export default app