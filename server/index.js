require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { resolve } = require('path')
const routes = require('./routes.js').default

const PORT = process.env.PORT || 8080

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', routes)

if (process.env.NODE_ENV === 'development') {
    const webpack = require('webpack')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const webpackConfig = require('../webpack/index.babel.js').default
    const compiler = webpack(webpackConfig)

    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath
    }))
    app.use(webpackHotMiddleware(compiler))

    app.get('*', (req, res, next) => {
        compiler.outputFileSystem.readFile(resolve(__dirname, '..', 'dist', 'index.html'), (err, result) => {
            if (err) {
                return next(err)
            }
            res.set('content-type', 'text/html')
            res.send(result)
            res.end()
        })
    })
} else {
    app.use(express.static(resolve(__dirname, '..', 'dist')))

    app.get('*', (req, res) => {
        res.sendFile(resolve(__dirname, '..', 'dist', 'index.html'))
    })
}

app.listen(PORT, function () {
    // eslint-disable-next-line no-console
    console.log(`Listening on port ${PORT}...`)
})
